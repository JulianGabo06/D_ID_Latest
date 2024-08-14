// CSS import
// 1. Import the Agents SDK library

import "../style.css";
import * as sdk from "@d-id/client-sdk";
// 2. Paste the `data-agent-id' in the 'agentId' variable
import DID_API from "../api.json";
import video from "../assets/IdleVideo.mp4";
import axios from "axios";
export const DemoClientD_ID = () => {
  if (DID_API.key == "🤫")
    alert("Please put your api key inside ./api.json and restart..");

  const RTCPeerConnection = window.RTCPeerConnection.bind(window);

  let peerConnection: any;
  let streamId: any;
  let sessionId: any;
  let sessionClientAnswer: any;
  let statsIntervalId: any;
  let videoIsPlaying: any;
  let lastBytesReceived: any;
  let agentId: any;
  let chatId: any;

  const videoElement: any = document.getElementById("video-element");
  const msgHistoryElement: any = document.getElementById("msgHistory");
  videoElement.setAttribute("playsinline", "");
  const peerStatusLabel: any = document.getElementById("peer-status-label");
  const iceStatusLabel: any = document.getElementById("ice-status-label");
  const iceGatheringStatusLabel: any = document.getElementById(
    "ice-gathering-status-label"
  );
  const signalingStatusLabel: any = document.getElementById(
    "signaling-status-label"
  );
  const streamingStatusLabel: any = document.getElementById(
    "streaming-status-label"
  );
  const agentIdLabel: any = document.getElementById("agentId-label");
  const chatIdLabel: any = document.getElementById("chatId-label");
  const textArea: any = document.getElementById("textArea");

  // Play the idle video when the page is loaded
  window.onload = () => {
    playIdleVideo();

    if (agentId == "" || agentId == undefined) {
      console.log(
        "Empty 'agentID' and 'chatID' variables\n\n1. Click on the 'Create new Agent with Knowledge' button\n2. Open the Console and wait for the process to complete\n3. Press on the 'Connect' button\n4. Type and send a message to the chat\nNOTE: You can store the created 'agentID' and 'chatId' variables at the bottom of the JS file for future chats"
      );
    } else {
      console.log(
        "You are good to go!\nClick on the 'Connect Button', Then send a new message\nAgent ID: ",
        agentId,
        "\nChat ID: ",
        chatId
      );
      agentIdLabel.innerHTML = agentId;
      chatIdLabel.innerHTML = chatId;
    }
  };
  async function createPeerConnection(offer: any, iceServers: any) {
    if (!peerConnection) {
      peerConnection = new RTCPeerConnection({ iceServers });
      peerConnection.addEventListener(
        "icegatheringstatechange",
        onIceGatheringStateChange,
        true
      );
      peerConnection.addEventListener("icecandidate", onIceCandidate, true);
      peerConnection.addEventListener(
        "iceconnectionstatechange",
        onIceConnectionStateChange,
        true
      );
      peerConnection.addEventListener(
        "connectionstatechange",
        onConnectionStateChange,
        true
      );
      peerConnection.addEventListener(
        "signalingstatechange",
        onSignalingStateChange,
        true
      );
      peerConnection.addEventListener("track", onTrack, true);
    }

    await peerConnection.setRemoteDescription(offer);
    console.log("set remote sdp OK");

    const sessionClientAnswer = await peerConnection.createAnswer();
    console.log("create local sdp OK");

    await peerConnection.setLocalDescription(sessionClientAnswer);
    console.log("set local sdp OK");

    // Data Channel creation (for dispalying the Agent's responses as text)
    let dc = await peerConnection.createDataChannel("JanusDataChannel");
    dc.onopen = () => {
      console.log("datachannel open");
    };

    let decodedMsg: any;
    // Agent Text Responses - Decoding the responses, pasting to the HTML element
    dc.onmessage = (event: any) => {
      let msg = event.data;
      let msgType = "chat/answer:";
      if (msg.includes(msgType)) {
        msg = decodeURIComponent(msg.replace(msgType, ""));
        console.log(msg);
        decodedMsg = msg;
        return decodedMsg;
      }
      if (msg.includes("stream/started")) {
        console.log(msg);
        msgHistoryElement.innerHTML += `<span>${decodedMsg}</span><br><br>`;
      } else {
        console.log(msg);
      }
    };

    dc.onclose = () => {
      console.log("datachannel close");
    };

    return sessionClientAnswer;
  }
  function onIceGatheringStateChange() {
    iceGatheringStatusLabel.innerText = peerConnection.iceGatheringState;
    iceGatheringStatusLabel.className =
      "iceGatheringState-" + peerConnection.iceGatheringState;
  }
  function onIceCandidate(event: any) {
    if (event.candidate) {
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

      // WEBRTC API CALL 3 - Submit network information
      fetch(`${DID_API.url}/clips/streams/${streamId}/ice`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${DID_API.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate,
          sdpMid,
          sdpMLineIndex,
          session_id: sessionId,
        }),
      });
    }
  }
  function onIceConnectionStateChange() {
    iceStatusLabel.innerText = peerConnection.iceConnectionState;
    iceStatusLabel.className =
      "iceConnectionState-" + peerConnection.iceConnectionState;
    if (
      peerConnection.iceConnectionState === "failed" ||
      peerConnection.iceConnectionState === "closed"
    ) {
    }
  }
  function onConnectionStateChange() {
    // not supported in firefox
    peerStatusLabel.innerText = peerConnection.connectionState;
    peerStatusLabel.className =
      "peerConnectionState-" + peerConnection.connectionState;
  }
  function onSignalingStateChange() {
    signalingStatusLabel.innerText = peerConnection.signalingState;
    signalingStatusLabel.className =
      "signalingState-" + peerConnection.signalingState;
  }
  function onVideoStatusChange(videoIsPlaying: any, stream: any) {
    let status;
    if (videoIsPlaying) {
      status = "streaming";

      const remoteStream = stream;
      setVideoElement(remoteStream);
    } else {
      status = "empty";
      playIdleVideo();
    }
    streamingStatusLabel.innerText = status;
    streamingStatusLabel.className = "streamingState-" + status;
  }
  function onTrack(event: any) {
    /**
     * The following code is designed to provide information about wether currently there is data
     * that's being streamed - It does so by periodically looking for changes in total stream data size
     *
     * This information in our case is used in order to show idle video while no video is streaming.
     * To create this idle video use the POST https://api.d-id.com/talks (or clips) endpoint with a silent audio file or a text script with only ssml breaks
     * https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#break-tag
     * for seamless results use `config.fluent: true` and provide the same configuration as the streaming video
     */

    if (!event.track) return;

    statsIntervalId = setInterval(async () => {
      const stats = await peerConnection.getStats(event.track);
      stats.forEach((report: any) => {
        if (report.type === "inbound-rtp" && report.kind === "video") {
          const videoStatusChanged =
            videoIsPlaying !== report.bytesReceived > lastBytesReceived;

          if (videoStatusChanged) {
            videoIsPlaying = report.bytesReceived > lastBytesReceived;
            onVideoStatusChange(videoIsPlaying, event.streams[0]);
          }
          lastBytesReceived = report.bytesReceived;
        }
      });
    }, 500);
  }
  function setVideoElement(stream: any) {
    if (!stream) return;
    // Add Animation Class
    videoElement.classList.add("animated");

    // Removing browsers' autoplay's 'Mute' Requirement
    videoElement.muted = false;

    videoElement.srcObject = stream;
    videoElement.loop = false;

    // Remove Animation Class after it's completed
    setTimeout(() => {
      videoElement.classList.remove("animated");
    }, 1000);
  }
  function playIdleVideo() {
    // Add Animation Class
    videoElement.classList.toggle("animated");

    videoElement.srcObject = undefined;
    videoElement.src = video;
    videoElement.loop = true;

    // Remove Animation Class after it's completed
    setTimeout(() => {
      videoElement.classList.remove("animated");
    }, 1000);
  }
  function stopAllStreams() {
    if (videoElement.srcObject) {
      console.log("stopping video streams");
      videoElement.srcObject.getTracks().forEach((track: any) => track.stop());
      videoElement.srcObject = null;
    }
  }
  function closePC(pc = peerConnection) {
    if (!pc) return;
    console.log("stopping peer connection");
    pc.close();
    pc.removeEventListener(
      "icegatheringstatechange",
      onIceGatheringStateChange,
      true
    );
    pc.removeEventListener("icecandidate", onIceCandidate, true);
    pc.removeEventListener(
      "iceconnectionstatechange",
      onIceConnectionStateChange,
      true
    );
    pc.removeEventListener(
      "connectionstatechange",
      onConnectionStateChange,
      true
    );
    pc.removeEventListener(
      "signalingstatechange",
      onSignalingStateChange,
      true
    );
    pc.removeEventListener("track", onTrack, true);
    clearInterval(statsIntervalId);
    iceGatheringStatusLabel.innerText = "";
    signalingStatusLabel.innerText = "";
    iceStatusLabel.innerText = "";
    peerStatusLabel.innerText = "";
    console.log("stopped peer connection");
    if (pc === peerConnection) {
      peerConnection = null;
    }
  }
  const maxRetryCount = 3;
  const maxDelaySec = 4;
  async function fetchWithRetries(url: any, options: any, retries = 1) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (retries <= maxRetryCount) {
        const delay =
          Math.min(Math.pow(2, retries) / 4 + Math.random(), maxDelaySec) *
          1000;

        await new Promise((resolve) => setTimeout(resolve, delay));

        console.log(
          `Request failed, retrying ${retries}/${maxRetryCount}. Error ${err}`
        );
        return fetchWithRetries(url, options, retries + 1);
      } else {
        throw new Error(`Max retries exceeded. error: ${err}`);
      }
    }
  }

  const connectButton: any = document.getElementById("connect-button");

  const ConectRTC = async () => {
    if (agentId == "" || agentId === undefined) {
      return alert(
        "1. Click on the 'Create new Agent with Knowledge' button\n2. Open the Console and wait for the process to complete\n3. Press on the 'Connect' button\n4. Type and send a message to the chat\nNOTE: You can store the created 'agentID' and 'chatId' variables at the bottom of the JS file for future chats"
      );
    }

    if (peerConnection && peerConnection.connectionState === "connected") {
      return;
    }

    // WEBRTC API CALL 1 - Create a new stream
    const sessionResponse = await fetchWithRetries(
      // `${DID_API.url}/${DID_API.service}/streams`,
      `${DID_API.url}/clips/streams`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${DID_API.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          presenter_id: `amy-Aq6OmGZnMt`,
          driver_id: `Vcq0R4a8F0`,
        }),
      }
    );

    console.log(sessionResponse);

    const {
      id: newStreamId,
      offer,
      ice_servers: iceServers,
      session_id: newSessionId,
    } = await sessionResponse.json();
    streamId = newStreamId;
    sessionId = newSessionId;
    try {
      sessionClientAnswer = await createPeerConnection(offer, iceServers);
    } catch (e) {
      console.log("error during streaming setup", e);

      return;
    }

    // WEBRTC API CALL 2 - Start a stream
    const sdpResponse = await fetch(
      `${DID_API.url}/clips/streams/${streamId}/sdp`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${DID_API.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: sessionClientAnswer,
          session_id: sessionId,
        }),
      }
    );
  };

  const startButton: any = document.getElementById("start-button");
  startButton.onclick = async () => {
    // connectionState not supported in firefox

    if (
      peerConnection?.signalingState === "stable" ||
      peerConnection?.iceConnectionState === "connected"
    ) {
      // Pasting the user's message to the Chat History element
      msgHistoryElement.innerHTML += `<span style='opacity:0.5'><u>User:</u> ${textArea.value}</span><br>`;

      // Storing the Text Area value
      let txtAreaValue: any = textArea.value;

      // Clearing the text-box element
      textArea.value = "";

      // Agents Overview - Step 3: Send a Message to a Chat session - Send a message to a Chat
      const playResponse = await fetch(
        `${DID_API.url}/agents/${agentId}/chat/${chatId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Basic ${DID_API.key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatMode: "Functional",
            streamId: streamId,
            sessionId: sessionId,
            messages: [
              {
                role: "user",
                content: txtAreaValue,
                created_at: new Date().toString(),
              },
            ],
          }),
        }
      );
      const playResponseData = await playResponse.json();
      if (
        playResponse.status === 200 &&
        playResponseData.chatMode === "TextOnly"
      ) {
        console.log("User is out of credit, API only return text messages");
        msgHistoryElement.innerHTML += `<span style='opacity:0.5'> ${playResponseData.result}</span><br>`;
      }
    }
  };

  const destroyButton: any = document.getElementById("destroy-button");
  destroyButton.onclick = async () => {
    await fetch(`${DID_API.url}/${DID_API.service}/streams/${streamId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${DID_API.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id: sessionId }),
    });

    stopAllStreams();
    closePC();
  };

  // Agents API Workflow
  async function agentsAPIworkflow() {
    axios.defaults.baseURL = `${DID_API.url}`;
    axios.defaults.headers.common["Authorization"] = `Basic ${DID_API.key}`;
    axios.defaults.headers.common["content-type"] = "application/json";
    agentIdLabel.innerHTML = `<span style='color:orange'>Processing...<style='color:orange'>`;
    chatIdLabel.innerHTML = `<span style='color:orange'>Processing...<style='color:orange'>`;

    // Establecer el agentId al ID del avatar que quieres utilizar
    agentId = "agt_rS6oQ11f";

    // Agents Overview - Step 2: Create a new Chat session with the Agent
    // https://docs.d-id.com/reference/agents-overview#%EF%B8%8F-step-2-create-a-new-chat-session-with-the-agent
    const agent = await axios.get(`/agents/${agentId}`);
    console.log(agent);

    const createChat = await axios.post(`/agents/${agentId}/chat`);
    console.log("Create Chat: ", createChat.data);
    let chatId = createChat.data.id;
    console.log("Chat ID: " + chatId);

    // Actualizar las etiquetas HTML con el agentId y chatId
    agentIdLabel.innerHTML = agentId;
    chatIdLabel.innerHTML = chatId;

    console.log(
      "Using existing Agent with ID agt_rS6oQ11f - DONE!\n Press on the 'Connect' button to proceed."
    );

    ConectRTC();

    return { agentId: agentId, chatId: chatId };
  }

  const agentsButton: any = document.getElementById("agents-button");
  agentsButton.onclick = async () => {
    try {
      const agentsIds = ({} = await agentsAPIworkflow());
      console.log(agentsIds);
      agentId = agentsIds.agentId;
      chatId = agentsIds.chatId;
      return;
    } catch (err: any) {
      agentIdLabel.innerHTML = `<span style='color:red'>Failed</span>`;
      chatIdLabel.innerHTML = `<span style='color:red'>Failed</span>`;
      throw new Error(err);
    }
  };

  // Paste Your Created Agent and Chat IDs Here:
  agentId = "";
  chatId = "";
};
