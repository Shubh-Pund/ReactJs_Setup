import React from 'react'

export default function CustomForm({ children, onSubmit }) {
    return (
        <form className="form-group" onSubmit={onSubmit}>
          {children}
        </form>
      );
}
  