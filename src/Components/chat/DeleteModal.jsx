function DeleteModal({ title, description, onClose, onDelete }) {
  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>{title}</h3>
        <p>{description}</p>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="delete" onClick={onDelete}>
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteModal;