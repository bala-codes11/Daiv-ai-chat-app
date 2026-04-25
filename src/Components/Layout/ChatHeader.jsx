import { useState, useRef, useEffect } from "react";

function ChatHeader({ setIsOpen, engine, setEngine }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const engines = [
    { name: "Neural Nexus", desc: "Quantum Core v3.8" },
    { name: "Cerebral Prime", desc: "Advanced Reasoning v2.1" },
    { name: "Synapse Ultra", desc: "Creative Engine v4.0" },
    { name: "Logic Core", desc: "Fast Response v1.5" }
  ];

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="chat-header">
      <div className="header-left">

        <button
          className="menu-btn"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        <div className="engine-dropdown" ref={dropdownRef}>

          <button
            onClick={() => setOpen(prev => !prev)}
            className="engine-btn"
          >
            ⚡ {engine}
          </button>

          {open && (
            <div className="engine-menu">
              <p className="menu-title">Select AI Engine</p>

              {engines.map((e) => (
                <div
                  key={e.name}
                  className={`engine-item ${
                    engine === e.name ? "active-engine" : ""
                  }`}
                  onClick={() => {
                    setEngine(e.name);
                    setOpen(false);
                  }}
                >
                  <strong>{e.name}</strong>
                  <span>{e.desc}</span>
                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ChatHeader;