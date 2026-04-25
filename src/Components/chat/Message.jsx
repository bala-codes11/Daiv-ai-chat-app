import { FiEdit } from "react-icons/fi";

function Message({ text, sender, onEdit }) {
  const isUser = sender === "user";

  return (
    <div className={`message ${sender}`}>
      <div className="bubble">

        <p className="message-text">{text}</p>

        {isUser && (
          <div className="actions">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              title="Edit message"
            >
              <FiEdit />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Message;