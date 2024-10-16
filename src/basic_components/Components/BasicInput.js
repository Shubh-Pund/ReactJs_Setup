import React from "react";

export default function BasicInput({ 
  type,
  label,
  name,
  value,
  onChange,
  length,
  className,
  placeholder,
  error,
  validate,
  style = { padding: "10px" },
  labelStyle = { fontWeight: "bold" },
  prefix // Add prefix prop here
}) {
    const defaultStyle = "form-control"; // Default class for input
    const handleInputChange = (e) => {
      let newValue = e.target.value;
      // If there's a prefix, ensure the user input doesn't modify it
      if (prefix) {
        // Prevent editing the prefix part
        if (!newValue.startsWith(prefix)) {
          newValue = prefix + newValue.replace(prefix, "");
        }
      }
      // Call the parent onChange with the updated value
      onChange({ target: { name, value: newValue } });
    };

  return (
    <div className="col-md-6">
      <label style={{labelStyle, marginTop: "10px"}}>{label}</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        {prefix && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRight: "none",
              borderRadius: "4px 0 0 4px",
            }}
          >
            {prefix}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          maxLength={length}
          className={`${defaultStyle} ${className}`} // Combine default and custom class names
          placeholder={placeholder}
          required={validate?.required?.value || false}
          style={{
            ...style,
            borderRadius: prefix ? "0 4px 4px 0" : "4px", // Adjust border radius when prefix is present
          }} // Apply inline styles to input
        />
      </div>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}
