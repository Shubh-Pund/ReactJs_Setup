import React from 'react'

export default function BasicTextArea({
    name,
    value,
    onChange,
    className,
    placeholder,
    label,
    error, 
  }) {
  return (
    <div className="col-md-6">
    <label>{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
    />
          {error && <p className="text-danger">{error}</p>}

  </div>
  )
}
