import { useState } from "react";
import ChatHeader from "../Layout/ChatHeader";
import Message from "./Message";
import InputBox from "./InputBox";
import EditModal from "./EditModal";

function ChatWindow({
  chats,
  activeChatId,
  setChats,
  setIsOpen,
  engine,
  setEngine
}) {

  const currentChat = chats.find(c => c.id === activeChatId);
  const hasMessages = currentChat && currentChat.messages.length > 0;

  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

 
const addMessage = (text, sender) => {
  setChats(prevChats =>
    prevChats.map(chat => {
      if (chat.id === activeChatId) {

        let newMsgs = [...chat.messages];

        if (sender === "user") {
          // add user + AI together
          newMsgs.push({
            id: Date.now(),
            text,
            sender: "user"
          });

          newMsgs.push({
            id: Date.now() + 1,
            text: `Response from ${engine}...`,
            sender: "ai"
          });

        } else {
          newMsgs.push({
            id: Date.now(),
            text,
            sender
          });
        }

        return {
          ...chat,
          title: chat.title === "Untitled" ? text : chat.title,
          messages: newMsgs
        };
      }
      return chat;
    })
  );
};

  
  const handleEditOpen = (i) => {
    if (currentChat.messages[i].sender !== "user") return;
    setEditIndex(i);
    setEditValue(currentChat.messages[i].text);
  };

 
  const handleEditSave = () => {
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id === activeChatId) {

          let msgs = [...chat.messages];

          // update edited message
          msgs[editIndex] = {
            ...msgs[editIndex],
            text: editValue
          };

          // remove next AI response
          if (msgs[editIndex + 1] && msgs[editIndex + 1].sender === "ai") {
            msgs.splice(editIndex + 1, 1);
          }

          return { ...chat, messages: msgs };
        }
        return chat;
      })
    );

    setEditIndex(null);

    // regenerate AI response
    setTimeout(() => {
      addMessage(`Response from ${engine}...`, "ai");
    }, 500);
  };

  if (!currentChat) return <div className="chat-container" />;

  return (
    <div className="chat-container">

      
      <ChatHeader
        setIsOpen={setIsOpen}
        engine={engine}
        setEngine={setEngine}
      />

      {!hasMessages ? (
        <div className="empty-state">
  <div className="logo">⚡</div>

  <h1>
    <span className="brand-green">Daiv</span>AI
  </h1>

  <p>Ask me anything. I'm here to help.</p>

  <div className="suggestions">
    {["Code Help","Explanations","Creative Writing","Problem Solving"]
      .map((t,i)=>(
        <div key={i} className="card" onClick={()=> addMessage(t, "user")}>
          <h4>{t}</h4>
          <span>Try this prompt</span>
        </div>
    ))}
  </div>
</div>
      ) : (
        <div className="messages">
          {currentChat.messages.map((m,i)=>(
            <Message
              key={m.id}
              text={m.text}
              sender={m.sender}
              onEdit={() => handleEditOpen(i)}
            />
          ))}
        </div>
      )}

     
      <div className="input-area">
        <InputBox
          addMessage={addMessage}
          engine={engine}
        />
      </div>

     
      {editIndex !== null && (
        <EditModal
          value={editValue}
          setValue={setEditValue}
          onClose={() => setEditIndex(null)}
          onSave={handleEditSave}
        />
      )}

    </div>
  );
}

export default ChatWindow;