import { useState, useEffect } from "react";
import Sidebar from "./Components/Layout/Sidebar";
import ChatWindow from "./Components/chat/ChatWindow";
import "./index.css";

function App() {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChatId, setActiveChatId] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const [engine, setEngine] = useState("Neural Nexus");

 useEffect(() => {
  if (chats.length > 0 && !activeChatId) {
    setActiveChatId(chats[0].id);
  }
}, [chats, activeChatId]);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        setChats={setChats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <ChatWindow
        chats={chats}
        activeChatId={activeChatId}
        setChats={setChats}
        setIsOpen={setIsOpen}
        engine={engine}
        setEngine={setEngine}
      />
    </div>
  );
}

export default App;