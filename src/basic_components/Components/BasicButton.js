import React from 'react'

export default function BasicButton({
    label = 'Button', // Default label if none is provided
    type = 'button', // Button type (submit, button, reset)
    className = '',  // Additional class names for styling
    onClick,         // Click event handler
    disabled = false, // To disable the button
  }) {
  return (
    <button
      type={type}
      className={`btn ${className}`} // Customizable class, with base "btn"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
