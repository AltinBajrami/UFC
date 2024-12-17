import React from 'react'

const FormRow = ({ name, type, labelText, defaultValue, onChange }) => {
    return (
        <div className="form-row" >
            <label htmlFor={name} className='form-label'>{labelText || name}</label>
            <input type={type} name={name} id={name} onChange={onChange} required defaultValue={defaultValue} className="form-input" />
        </div>
    )
}

export default FormRow