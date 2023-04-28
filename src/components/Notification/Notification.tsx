import React from "react";
import "./Notification.scss";

interface Props {
  type: "error";
  text: string;
  onClick: () => void;
}

export const Notification: React.FC<Props> = ({ type, text, onClick }) => {
  return (
    <div className="notification" onClick={onClick}>
      <h3>{type}</h3>
      <p>{text}</p>
    </div>
  );
};
