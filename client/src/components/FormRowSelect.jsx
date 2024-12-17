import React from 'react';

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = '',
  onChange,
}) => {
  return (
    <div className="form-row">
      <label
        htmlFor={name}
        className="form-label"
      >
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        className="form-select"
        defaultValue={defaultValue}
      >
        {Object.values(list).map(item => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
