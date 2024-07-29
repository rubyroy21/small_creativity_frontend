import React, { useState, useEffect } from "react";
import "./styles/letter.css"; // Assuming you have corresponding CSS
import Message from "./Message";

const OpeningLetter = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  const handleEnvelopeClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };
  return (
    <div className={`letter ${isOpen ? "letter--open" : ""}`}>
      <div className="envelope" onClick={handleEnvelopeClick}>
        <div className="envelope-flap"></div>
        <div className="envelope-paper"></div>
        <div className="envelope-detail"></div>
      </div>
      <div className="paper">
        <div className="paper-content">
          <div className="paper-close" onClick={handleCloseClick}>
            x
          </div>
          <Message />
        </div>
      </div>
    </div>
  );
};

export default OpeningLetter;
