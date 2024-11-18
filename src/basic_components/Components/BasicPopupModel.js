// import React, { useState } from 'react';
// import './PopupModel.css';

// export default function BasicPopupModel({ isVisible, title, children, onClose, buttons = [], redirectModel }) {
//     const [closing, setClosing] = useState(false);

//     const handleClose = () => {
//       setClosing(true);
//       setTimeout(() => {
//         onClose();
//         setClosing(false); // Reset state for future opens
//       }, 300); // Same as the animation time
//     };
  
//     if (!isVisible && !closing) return null; // Don't render if not visible and not in closing state
  
//     return (
//       <div className={`modal-overlay ${closing ? 'fade-out' : ''}`} redirectModel={redirectModel}>
//         <div className={`custom-alert ${closing ? 'slide-out' : ''}`}>
//           <div className="modal-header">
//             <h4>{title}</h4>
//             <button className="modal-close-btn" onClick={handleClose}>✕</button>
//           </div>
//           <div className="modal-body">
//             {children}
//           </div>
//           <div className="modal-footer">
//             {buttons.map((button, index) => (
//               <button
//                 key={index}
//                 className={button.className}
//                 onClick={button.onClick}
//               >
//                 {button.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './PopupModel.css';

export default function BasicPopupModel({ isVisible, title, children, onClose, buttons = [], redirectModel, redirectPath }) {
    const [closing, setClosing] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleClose = () => {
      setClosing(true);
      setTimeout(() => {
        onClose();
        setClosing(false); // Reset state for future opens
      }, 300); // Same as the animation time
    };

    // Check if the modal should redirect
    if (redirectModel === true && redirectPath) {
        navigate(redirectPath); // Navigate to the specified path
        return null; // Prevent the modal from rendering
    }

    if (!isVisible && !closing) return null; // Don't render if not visible and not in closing state

    return (
      <div className={`modal-overlay ${closing ? 'fade-out' : ''}`}>
        <div className={`custom-alert ${closing ? 'slide-out' : ''}`}>
          <div className="modal-header">
            <h4>{title}</h4>
            <button className="modal-close-btn" onClick={handleClose}>✕</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={button.className}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
}
