import React from 'react';
import './AlertModal.scss';

export default function AlertModal(props) {
  const { modalData, onSecondaryButtonClick, onPrimaryButtonClick } = props;
  const { bodyText, buttons } = modalData;

  return (
    <div className="alert-modal-container">
      <div className="alert-modal">
        <div className="alert-header">
          {/* <FontAwesomeIcon icon={faExclamationCircle} size="2x" /> */}
        </div>
        <div className="alert-body">
          <h2>{bodyText.title}</h2>
          <p>{bodyText}</p>
        </div>
        <div className="alert-footer">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={button.color === "danger" ? "right-button" : "left-button"}
              onClick={button.action === "cancel" ? onSecondaryButtonClick : onPrimaryButtonClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
