import React from "react";
import { toast } from "react-toastify";
import "./ConfirmationToast.css";

const ConfirmationToast = ({ message, onConfirm, closeToast }) => {
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
          Ok
        </button>
      </div>
    </div>
  );
};

export const showNormalToast = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <ConfirmationToast
        message={message}
        onConfirm={onConfirm}
        closeToast={closeToast}
      />
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: "center-toast",
      hideProgressBar: true,
      onClose: () => {
        onConfirm(); 
      },
    }
  );
};

// export const showNormalToast = (message, onConfirm) => {
//     toast(
//         ({ closeToast }) => (
//             <ConfirmationToast
//                 message={message}
//                 onConfirm={onConfirm}
//                 closeToast={closeToast}
//             />
//         ),
//         {
//             position: "top-center",
//             autoClose: false,
//             closeOnClick: false,
//             draggable: false,
//             className: "center-toast", // Apply custom class for centering
//             hideProgressBar: true, //
//         }
//     );
// };

export default showNormalToast;
