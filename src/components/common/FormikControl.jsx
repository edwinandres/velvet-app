import React from 'react'
import { HuePicker } from 'react-color'
import CheckboxGroup from '../common/controls/CheckboxGroup'
import DatePicker from '../common/controls/DatePicker'
import Input from '../common/controls/Input'
import RadioButton from '../common/controls/RadioButton'
import Select from '../common/controls/Select'
import TextArea from '../common/controls/TextArea'
import ColorPicker from '../common/controls/ColorPicker'
import './FormikControl.css'

function FormikControl(props) {
    const {control, ...rest} = props
    
    switch (control) {
        case 'input': return <Input {...rest} />
        case 'textarea': return <TextArea {...rest} />
        case 'select': return <Select {...rest} />
        case 'radio': return <RadioButton {...rest} />
        case 'checkbox': return <CheckboxGroup {...rest} />
        case 'date': return <DatePicker {...rest} />
        case 'color2': return <HuePicker {...rest}/>
        case 'color': return <ColorPicker {...rest}/>
        
        default:return null        
    }
   
}

export default FormikControl
