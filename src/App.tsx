import { useState, useEffect } from "react";
import logo from "./logo.svg";
import { io, Socket } from "socket.io-client";
import "./App.css";

const socket: Socket = io("http://localhost:8000"); // connect to backend socket server


function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== '')  {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    // socket.emit("hello from the client", 5, "6", { 7: Uint8Array.from([8]) });
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>

        <input
            type={"text"}
            placeholder="Room Number"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
          <hr/>
          <input
            type={"text"}
            placeholder="write message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>send message</button>
          <h1>Message: </h1>
          {messageReceived}
        </div>
      </header>
    </div>
  );
}

export default App;
