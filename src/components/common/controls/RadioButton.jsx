import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function RadioButton(props) {

    
    const {label, name, options, ...rest} = props
    return (
        <div className='form-group'>
            <label className='ml-2'>{label}</label><br></br>
            <Field className='form-control' name={name}{...rest}>
                {
                    ({field}) => {
                       // console.log('Field', field)
                        return options.map(option => {
                            //console.log(`Field ${JSON.stringify(field)}, option ${option.value}`)
                            return (
                                <React.Fragment key ={option.key}>
                                    <input className='m-2'
                                        type ='radio' 
                                        id={option.value} 
                                        {...field} 
                                        value={option.value} 
                                        checked={field.value===option.value}
                                        
                                    />
                                    <label htmlFor={option.value}>{option.key}</label>
                                    
                                </React.Fragment>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
            
        </div>
    )
}

export default RadioButton
