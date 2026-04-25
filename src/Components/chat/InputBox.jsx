import { useState } from "react";
import { FiPaperclip, FiMic, FiSend } from "react-icons/fi";

function InputBox({ addMessage, engine }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

   
    addMessage(trimmed, "user");

    setInput("");
  };

  return (
    <div className="input-wrapper">

      <div className="input-box">

        <FiPaperclip className="icon" />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${engine}...`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <FiMic className="icon" />

        <FiSend
          className={`icon send ${!input.trim() ? "disabled" : ""}`}
          onClick={handleSend}
        />

      </div>

      <p className="helper-text">
        Press Enter to send, Shift+Enter for new line
      </p>

    </div>
  );
}

export default InputBox;