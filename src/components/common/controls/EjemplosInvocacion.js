import React, {useEffect, useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../common/FormikControl'
import  { axiosPost, axiosPut, axiosGet } from '../../common/AxiosCrud'
import { withRouter } from 'react-router'
 



function FormularioGarantia(props) { 

    const dropdownOptions = [
        { key:'Seleccione el color', value:'' },
        { key: 'Amarillo', value:'Amarillo' },
        { key:'Azul', value:'Azul' },
        { key: 'Rojo', value:'Rojo' },
        { key: 'Verde', value:'Verde' },
        { key: 'Naranja', value:'Naranja' }

    ]

    //opciones para los radio button
    const options = [
        { key:'Si', value: "true" },
        { key: 'No', value: "false" }
    ]
    
    const [valoresIniciales, guardarValoresIniciales] = useState({'idTiempoGarantia':'','nombre':'','fechaInicio':'','esVigente':'','enProceso':'','detalle':''})    
    

    //cargar valores iniciales para registros con id(edicion)
    useEffect(() => {
        if(props.id){
            const  cargarValoresIniciales = async () => {           
                const data = await axiosGet(props.urlService + props.id, props.history, props.urlRetorno, props.id)             
                guardarValoresIniciales(data)  
            }  
            cargarValoresIniciales()  
        }            
    }, [props.urlService, props.history, props.urlRetorno, props.id])

  
    
    //reglas de validacion para los campos
    const validationSchema = Yup.object({
        idTiempoGarantia:Yup.number().required('Es requerido'),
        nombre: Yup.string().required("Es requerido"),
        fechaInicio: Yup.date().required('Es requerido'),
        esVigente: Yup.string().required('Es requerido'),
        enProceso: Yup.string().required('Es requerido'),
        latitud: Yup.number().test('is-decimal','Se requiere decimal', value =>(value + '').match(/^-?\d*\.{1}\d*$/)),            
    })


    //enviar informacion a la DB
    const onSubmit = (values,{setFieldError}) => {

        if(props.id){             
            axiosPut(props.urlService, values, setFieldError, props.urlRetorno, props.history)              
        }else{    
            axiosPost(props.urlService, values, setFieldError, props.urlRetorno, props.history)  
        }
    }
    
    return (  
          

        <Formik
        
            enableReinitialize
            initialValues={valoresIniciales}            
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            
        >
            {
                formik => {                    
                    return (
                        <div className="card card-default">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">{props.encabezado}</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" /></button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" /></button>
                                </div>
                            </div>
                            
                            <div className="card-body">                    
                                
                                <Form className='col-md-12'>
                                    <div className="row " >
                                    
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >                                        
                                            <FormikControl
                                                control='input'
                                                type='number'
                                                label='Id tiempo garantia'
                                                name='idTiempoGarantia'
                                                placeholder='Id del tiempo de Garantia...'
                                            />                                                    
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >                                        
                                            <FormikControl
                                                control='input'
                                                type='text'
                                                label='Nombre'
                                                name='nombre'
                                                placeholder='Nombre del Garantia...'
                                            />                                                    
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                                            <FormikControl
                                                control='date'
                                                label='Fecha inicio'
                                                name='fechaInicio'
                                            />     
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >                                        
                                            <FormikControl
                                                control='select'
                                                label='Color'
                                                name='color'
                                                options={dropdownOptions}
                                                selected={valoresIniciales.color}
                                                placeholder='Descripcion opcional...'
                                            />                                                  
                                        </div>  
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                                            <FormikControl
                                                control='radio'
                                                label='Vigente'
                                                name='esVigente'
                                                options={options}
                                                value={String(options.value)}
                                                checked={options.value}
                                            />
                                        </div>
                                        
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                                            <FormikControl
                                                control='radio'
                                                label='En proceso'
                                                name='enProceso'
                                                options={options}
                                                value={String(options.value)}
                                                checked={options.value}
                                            />
                                        </div>
                                        
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" >                                    
                                            <FormikControl
                                                control='textarea'                                       
                                                label='Detalle'
                                                name='detalle'
                                                placeholder='Detalle opcional...'
                                            />
                                        </div>
                                        
                                    </div>
                                    <div className="row">                                            
                                        <div className='col-sm-3' >
                                            <button 
                                                className="btn btn-md  btn-secondary row-md-20 btn-block" 
                                                type='submit' 
                                                disabled={!formik.isValid} 
                                            >Ingresar</button>
                                        </div>                                            
                                    </div>
                                </Form> 
                                               
                            </div>
                        </div>   
                    )
                }
            }
            
        </Formik>        
        
    )
}

export default withRouter(FormularioGarantia)