import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from './TextError'

function Select(props) {
    const {label, name, options, ...rest} = props
      //console.log(props, "props del seleeeeeeeeeeeeeeeeeeect")
      
    return (
        
        <div className='form-group'>           
            <label htmlFor={name} >{label}</label>
            <Field className='form-control'  as='select' id={name} name={name} {...rest} >
                <option key={name+name}value=''  >Seleccione un valor...</option>
             {/* {console.log(options)} */}
                {options.filter(row => row.estado.includes('A')).map((option,index) => {                    
                    return(                        
                        <option key={index} value={option[name]}>
                            {/* {console.log(option['name'],'este es el key')} */}
                            {/* {console.log(option.nombre)} */}
                            {/* {option.key} */}
                            {option.nombre || option.valor}
                            {/* {`${option.value} -- ${option.key}`} */}                            
                        </option>
                    )
                })}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Select
