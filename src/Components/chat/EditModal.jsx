function EditModal({ value, setValue, onClose, onSave }) {
  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h3>Edit Message</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="save" onClick={onSave}>
            Save
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditModal;