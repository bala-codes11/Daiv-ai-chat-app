    import { useState, useEffect } from "react";
    import DeleteModal from "../chat/DeleteModal";

    function Sidebar({
    chats,
    setChats,
    activeChatId,
    setActiveChatId,
    isOpen,
    setIsOpen
    }) {

    const [deleteChatId, setDeleteChatId] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

   
    useEffect(() => {
        const closeMenu = () => setOpenMenuId(null);
        window.addEventListener("click", closeMenu);
        return () => window.removeEventListener("click", closeMenu);
    }, []);

    const handleNewChat = () => {
        const newChat = {
        id: Date.now(),
        title: "Untitled",
        messages: []
        };

        setChats(prev => [...prev, newChat]);
        setActiveChatId(newChat.id);
    };

    
    const handleDeleteChat = () => {
        const updated = chats.filter(c => c.id !== deleteChatId);

        if (deleteChatId === activeChatId) {
        if (updated.length > 0) {
            setActiveChatId(updated[updated.length - 1].id);
        } else {
            setActiveChatId(null);
        }
        }

        setChats(updated);
        setDeleteChatId(null);
        setOpenMenuId(null);
    };

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

        {/* HEADER */}
        <div className="sidebar-top">
            <h2>
            <span className="brand-green">Daiv</span>AI
            </h2>
            <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            >
            ✕
            </button>
        </div>

        {/* NEW CHAT */}
        <button
            className="new-chat-btn"
            onClick={handleNewChat}
        >
            + New Chat
        </button>

        {/* CHAT LIST */}
        <div className="chat-list">
            {chats
            .filter(chat => chat.messages.length > 0)   /* 🔥 FIX */
            .map(chat => (
            <div
                key={chat.id}
                className={`chat-item ${
                chat.id === activeChatId ? "active" : ""
                }`}
            >

                <div
                className="chat-title"
                onClick={() => setActiveChatId(chat.id)}
                >
                {chat.title}
                </div>

                {/* MENU */}
            <div className="chat-actions">
    <span
        className="dots"
        onClick={(e) => {
        e.stopPropagation();
        setOpenMenuId(prev => prev === chat.id ? null : chat.id);
        }}
    >
        ⋯
    </span>

    {openMenuId === chat.id && (
        <div
        className="floating-menu"
        onClick={(e) => e.stopPropagation()}
        >
        <button
            className="delete-item"
            onClick={() => setDeleteChatId(chat.id)}
        >
            🗑 Delete
        </button>
        </div>
    )}
    </div>

            </div>
            ))}
        </div>

        
        <div className="sidebar-footer">
            <div className="user-info">
            <div className="avatar">U</div>
            <div>
                <p className="username">User</p>
                <p className="email">user@gmail.com</p>
            </div>
            </div>
        </div>

       
        {deleteChatId && (
            <DeleteModal
            title="Delete Chat?"
            description="This chat will be permanently deleted."
            onClose={() => setDeleteChatId(null)}
            onDelete={handleDeleteChat}
            />
        )}

        </div>
    );
    }

    export default Sidebar;