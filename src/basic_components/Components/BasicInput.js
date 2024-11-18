import React, { useState } from "react";

export default function BasicInput({ 
  type,
  label,
  name,
  value = "",  // Set default value to an empty string to avoid `undefined` errors
  onChange,
  length,
  className,
  placeholder,
  error,
  validate,
  style = { padding: "10px" },
  labelStyle = { fontWeight: "bold" },
  prefix,  // Prefix prop (array or single value)
  postfix,  // Postfix prop
  divClassName = "col-md-6",  // Default class for the div
  disabled
}) {
    const [selectedPrefix, setSelectedPrefix] = useState(
      Array.isArray(prefix) ? prefix[0] : prefix
    ); // Default to the first value if prefix is an array

    const defaultStyle = "form-control"; // Default class for input
    value = value.toString();
    
    // Strip the prefix and postfix from the actual value when passing to the input field
    const displayValue =  value ? value?.replace(selectedPrefix || "", "").replace(postfix || "", "") : null;

    const handleInputChange = (e) => {
      let newValue = e.target.value;
      // Append the selected prefix and postfix to the user input
      if (selectedPrefix) {
        newValue = selectedPrefix + newValue;
      }
      if (postfix) {
        newValue = newValue + postfix;
      }
      // Call the parent onChange with the updated value
      onChange({ target: { name, value: newValue } });
    };

    const handlePrefixChange = (e) => {
      setSelectedPrefix(e.target.value); // Update selected prefix
    };

  return (
    <div>
      <label style={{labelStyle, marginTop: "10px"}}>{label}</label>
      <div className={divClassName} style={{ display: "flex", alignItems: "center" }}>
        {Array.isArray(prefix) ? (
          <select
            value={selectedPrefix}
            onChange={handlePrefixChange}
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRight: "none",
              borderRadius: "4px 0 0 4px",
            }}  
          >
            {prefix.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        ) : (
          prefix && (
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
          )
        )}
        <input
          type={type}
          name={name}
          value={displayValue} // Display the input without the prefix or postfix
          onChange={handleInputChange}
          maxLength={length}
          className={`${defaultStyle} ${className}`} // Combine default and custom class names
          placeholder={placeholder}
          required={validate?.required?.value || false}
          disabled={disabled ? disabled : false}
          style={{
            ...style,
            borderRadius: prefix ? (postfix ? "0" : "0 4px 4px 0") : (postfix ? "4px 0 0 4px" : "4px"), // Adjust border radius for both prefix and postfix
          }} // Apply inline styles to input
        />
        {postfix && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderLeft: "none",
              borderRadius: "0 4px 4px 0",
            }}
          >
            {postfix}
          </div>
        )}
      </div>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}
