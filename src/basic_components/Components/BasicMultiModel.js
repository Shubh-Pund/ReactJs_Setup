import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function BasicMultiModel({
  formFields,
  onChange,
  rowClassName = 'form-row',
  inputClassName = 'form-control',
  containerClassName = 'container',
  buttonClassName = 'btn btn-primary',
  heading,
}) {
  const [rows, setRows] = useState([{}]);

  // Handle adding a new row
  const handleAddRow = () => {
    setRows([...rows, {}]);
  };

  // Handle removing a row
  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    if (onChange) onChange(updatedRows); // Notify parent component of change
  };

  // Handle field change
  const handleFieldChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [field]: value,
    };
    setRows(updatedRows);
    if (onChange) onChange(updatedRows); // Notify parent component of change
  };

  // Handle file input change and create a base64 string preview
  const handleFileChange = (index, field, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedRows = [...rows];
      updatedRows[index] = {
        ...updatedRows[index],
        [field]: reader.result, // Store the base64 string
      };
      setRows(updatedRows);
      if (onChange) onChange(updatedRows); // Notify parent component of change
    };

    if (file) {
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  // Check if any row contains a file
  const hasFileInput = formFields.some((field) => field.type === 'file');

  return (
    <div className={`${containerClassName} mt-4`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{heading}</h3>
        <button
          type="button"
          onClick={handleAddRow}
          className={`${buttonClassName} btn-sm`}
        >
          Add Row
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              {formFields.map((field, index) => (
                <th key={index} className="text-center">
                  {field.label}
                </th>
              ))}
              {hasFileInput && <th className="text-center">Image Preview</th>}
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={rowClassName}>
                {formFields.map((field, fieldIndex) => (
                  <td key={fieldIndex} className="text-center">
                    {field.type === 'file' ? (
                      <>
                        <input
                          type="file"
                          id={`${field.name}-${index}`}
                          name={field.name}
                          className={`${field.customInputClass || inputClassName}`}
                          onChange={(e) =>
                            handleFileChange(index, field.name, e.target.files[0])
                          }
                          required={field.required || false}
                        />
                      </>
                    ) : (
                      <input
                        type={field.type}
                        id={`${field.name}-${index}`}
                        name={field.name}
                        value={row[field.name] || ''}
                        className={`${field.customInputClass || inputClassName}`}
                        onChange={(e) =>
                          handleFieldChange(index, field.name, e.target.value)
                        }
                        placeholder={field.placeholder || ''}
                        required={field.required || false}
                      />
                    )}
                  </td>
                ))}
                {hasFileInput && (
                  <td className="text-center">
                    {row[formFields.find((field) => field.type === 'file')?.name] && (
                      <img
                        src={row[formFields.find((field) => field.type === 'file')?.name]}
                        alt="Preview"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    )}
                  </td>
                )}
                <td className="text-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

