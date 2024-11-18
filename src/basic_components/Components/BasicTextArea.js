import React from 'react'

export default function BasicTextArea({
  name,
  value,
  onChange,
  className,
  placeholder,
  label,
  error,
  rows,
  cols,
  divClassName = "col-md-6",  // Default class for the div
}) {
  return (
    <div className={divClassName}>
      <label>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        rows={rows}       // Passed rows prop
        cols={cols}       // Passed cols prop
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  )
}
