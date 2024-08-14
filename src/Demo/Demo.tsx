import { useLayoutEffect } from "react";
import "../style.css";
import { DemoClientD_ID } from "./demo";

function Demo() {
  useLayoutEffect(() => {
    DemoClientD_ID();
  }, []);

  return (
    <>
      <div id="content">
        <div className="container">
          <div id="video-wrapper">
            <div>
              <video
                id="video-element"
                width="400"
                height="400"
                src=""
                loop
                muted={true}
                autoPlay
                className="animated"
              ></video>
            </div>
          </div>
          <div
            id="status"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              Connect: <label id="ice-status-label">Disconected</label>
            </div>
            <div>
              <h3>Press the Init Talk button and then the Mic button</h3>

              <div style={{ display: "none" }}>
                <h4>Agent Status</h4>
                Agent ID: <label id="agentId-label"></label>
                <br />
                Chat ID: <label id="chatId-label"></label>
                <br />
                <br />
                <h4>WebRTC Connection Status</h4>
                ICE gathering status:{" "}
                <label id="ice-gathering-status-label"></label>
                <br />
                ICE status: <label id="ice-status-label"></label>
                <br />
                Peer connection status: <label id="peer-status-label"></label>
                <br />
                Signaling status: <label id="signaling-status-label"></label>
                <br />
                Streaming status: <label id="streaming-status-label"></label>
                <br />
                <br />
              </div>

              <div id="buttons">
                <button id="agents-button" type="button">
                  Init Talk
                </button>
                <button id="micButton">&#127908; </button>
                <div style={{ display: "none" }}>
                  <br />
                  <br />
                  <button id="connect-button" type="button">
                    Connect
                  </button>
                  <button id="destroy-button" type="button">
                    Destroy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <textarea id="textArea" style={{ display: "none" }}></textarea>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                id="start-button"
                type="button"
                style={{ display: "None" }}
              >
                Send
              </button>
              <div id="micContainer">
                <p id="micStatus" style={{ display: "none" }}>
                  Microphone disabled
                </p>
              </div>
            </div>
          </div>
          <div className="chat">
            <h4 id="margin">Chat History</h4>
            <div
              id="msgHistory"
              style={{ height: "300px", overflowY: "auto" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
