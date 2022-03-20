import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { ErrorMessage } from 'formik'
import TextError from './TextError'
import GithubPicker from 'react-color'



function ColorPicker(props) {
    
    const { label, name, color, onChangeComplete, ...rest } = props
    return (
        <div className='form-group'>
            <label htmlFor={name}>{label}</label><br></br>
            {/* <Field className='form-control' name={name} color={color} onChangeComplete={onChangeComplete} {...rest}> */}
            
            <GithubPicker
                                                color = {color}
                                                {...rest}
                                                onChangeComplete={onChangeComplete}
                                                //onChangeComplete={(color) => mostrarColor(color.hex)}
                                            /> 
              
            {/* </Field> */}
            <ErrorMessage name={name} component={TextError}  />
            
            
        </div>
    )
}

export default ColorPicker
