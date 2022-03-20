import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input(props) {
    // console.log("ENTRA POR AQUI", props)
    const {label, name, ...rest} = props
    return (
       
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <Field className='form-control' id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={TextError} />
            
            
        </div>
        
        
    )
}

export default Input
