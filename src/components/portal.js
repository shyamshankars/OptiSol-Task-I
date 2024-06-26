// ModalPortal.js
import React from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          Close Modal
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") // Portal target element in index.html
  );
};

export default ModalPortal;
