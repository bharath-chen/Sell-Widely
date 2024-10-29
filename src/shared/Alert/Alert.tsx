import React from "react";
import ButtonClose from "../../shared/ButtonClose/ButtonClose";

export interface AlertProps {
  containerClassName?: string;
  type?: "default" | "warning" | "info" | "success" | "error";
  children?: React.ReactNode;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  children = "Alert Text",
  containerClassName = "",
  type = "default",
  onClose,
}) => {
  let classes = containerClassName;
  switch (type) {
    case "default":
      classes += " text-black bg-neutral-900";
      break;
    case "info":
      classes += " bg-status-info text-status-info";
      break;
    case "success":
      classes += " bg-status-success text-status-success";
      break;
    case "error":
      classes += " bg-status-error text-status-error";
      break;
    case "warning":
      classes += " bg-status-warning text-status-warning";
      break;
    default:
      break;
  }

  return (
    <div
      className={`ttnc-alert relative flex items-center text-paragraph-base px-6 pt-4 pb-3 rounded-lg ${classes}`}
    >
      <i className="pe-7s-info text-2xl mr-2"></i>
      {children}
      <ButtonClose onClick={onClose} className="absolute top-4 right-6" />
    </div>
  );
};
