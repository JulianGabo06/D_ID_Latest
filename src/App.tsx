import { useLayoutEffect } from "react";
import "./style.css";
import { HelperClientD_ID } from "./helper";

function App() {
  useLayoutEffect(() => {
    HelperClientD_ID();
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
                muted
                autoPlay
                className="animated"
              ></video>
            </div>
          </div>
          <div id="status">
            <div>
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
              <div id="buttons">
                <button id="agents-button" type="button">
                  Create new Agent with Knowledge
                </button>
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
            <h3>Type your message here:</h3>
            <textarea id="textArea"></textarea>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button id="start-button" type="button">
                Send
              </button>
              <button id="micButton" style={{ display: "none" }}>
                Mic
              </button>
            </div>
          </div>
          <div className="chat">
            <h4 id="margin">Chat History</h4>
            <div id="msgHistory"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
