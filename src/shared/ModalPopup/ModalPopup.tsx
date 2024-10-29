import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { hideModal } from "../../features/modal/modalSlice";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import classNames from "classnames";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";

const ModalPopup: React.FC = () => {
  const dispatch = useDispatch();
  const { isVisible, type, message } = useSelector(
    (state: RootState) => state.modal
  );

  const handleClose = () => {
    dispatch(hideModal());
  };

  if (!isVisible) return null;

  const icon = {
    success: <FaCheckCircle className="text-green-500 w-10 h-10" />,
    error: <FaExclamationCircle className="text-red-500 w-10 h-10" />,
    info: <FaInfoCircle className="text-blue-500 w-10 h-10" />,
  };

  const modalStyles = classNames(
    "fixed inset-0 z-50 flex items-center justify-center",
    "bg-black bg-opacity-50 backdrop-blur-sm"
  );

  const modalContentStyles = classNames(
    "bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center space-y-4",
    {
      "border-l-4 border-green-500": type === "success",
      "border-l-4 border-red-500": type === "error",
      "border-l-4 border-blue-500": type === "info",
    }
  );

  return (
    <div className={modalStyles}>
      <div className={modalContentStyles}>
        <div className="flex justify-center">{icon[type]}</div>
        <h3 className="text-xl font-semibold capitalize">{type}</h3>
        <p className="text-gray-600">{message}</p>
        <ButtonPrimary onClick={handleClose}>Close</ButtonPrimary>
      </div>
    </div>
  );
};

export default ModalPopup;
