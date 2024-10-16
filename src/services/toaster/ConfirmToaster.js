import React from "react";
import { toast } from "react-toastify";
import "./ConfirmationToast.css";

const ConfirmationToast = ({
  message,
  onConfirm,
  onCancel,
  closeToast,

}) => {
  return (
    <div className="custom-toast">
      <p style={{ color: "black" }}>{message}</p>
      <div className="toast-buttons">
        <button
          className="confirm-button"
          onClick={() => {
            onConfirm();
            closeToast();
          }}>
          Confirm
        </button>
        <button
          className="cancel-button"
          onClick={() => {
            onCancel();
            closeToast();
          }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export const showConfirmationToast = (
  message,
  onConfirm,
  onCancel,
  onClose
) => {
  toast(
    ({ closeToast }) => {
      const handleClose = () => {
        onClose();
        closeToast();
      };

      return (
        <ConfirmationToast
          message={message}
          onConfirm={onConfirm}
          onCancel={onCancel}
          closeToast={handleClose}
        />
      );
    },
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: "center-toast",
      hideProgressBar: true,
      onClose: onClose,
    }
  );
};
// export const showConfirmationToast = (
//   message,
//   onConfirm,
//   onCancel,
//   onClose
// ) => {
//   toast(
//     ({ closeToast }) => {
//       const handleClose = () => {
//         onClose();
//         closeToast();
//       };

//       return (
//         <ConfirmationToast
//           message={message}
//           onConfirm={onConfirm}
//           onCancel={onCancel}
//           closeToast={handleClose}
//         />
//       );
//     },
//     {
//       position: "top-center",
//       autoClose: false,
//       closeOnClick: false,
//       draggable: false,
//       className: "center-toast",
//       hideProgressBar: true,
//       onClose: onClose,
//     }
//   );
// };

export default ConfirmationToast;
