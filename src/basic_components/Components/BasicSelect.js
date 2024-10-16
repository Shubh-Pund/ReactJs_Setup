import React from 'react'

export default function BasicSelect({name,
    options,
    value,
    onChange,
    className,
    label,
    error}) {
  return (
    <div className="col-sm-6 col-md-6 col-lg-6">
      <label>{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${className}`}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-danger">{error}</p>}
    </div>
  )
}
