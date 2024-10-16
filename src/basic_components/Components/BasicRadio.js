import React from 'react'

export default function BasicRadio({ label, name, options, value, onChange, className }) {
  return (
    <div className="col-sm-6 col-md-6 col-lg-6">
      <label>{label}</label> {/* Main label */}
      <div>
        {options.map((option, index) => (
          <div key={index} className="form-check form-check-inline my-3">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              className="form-check-input"
            />
            <label className="form-check-label">{option}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
