import React from 'react';

export default function BasicSelect({
  name,
  options,
  value,
  onChange,
  className,
  label,
  labelStyle = { fontWeight: "bold" },
  error,
  style = { padding: "10px" },
  divClassName = "col-md-6",
  disabled
}) {
  return (
    <div className={divClassName}>
      <label style={{labelStyle, marginTop: "10px"}}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${className}`}
        disabled={disabled}
        style={{
          ...style,
        }}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          // Adjusted to handle options as objects with value and label properties
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}
