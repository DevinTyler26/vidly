import React from 'react';

const Input = ({ name, label, value, onChange, type, error }) => {
  return ( 
    <div className="form-group">
      <label htmlFor={name}>{ label }</label>
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
   );
}
 
export default Input;