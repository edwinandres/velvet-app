import React, {useEffect, useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../common/FormikControl'
import  { axiosPost, axiosPut, axiosGet } from '../../common/AxiosCrud'
import { withRouter } from 'react-router'
 



function FormularioProveedor(props) { 
    
    const [valoresIniciales, guardarValoresIniciales] = useState({'nombre':'','telefono':'','direccion':''})    
    

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
        nombre: Yup.string().required("Es requerido"),
        //nombreCorto: Yup.string().required("Es requerido"),
        telefono: Yup.string().required("Es requerido"),
        direccion: Yup.string().required("Es requerido"),       
                
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
                                                type='text'
                                                label='Nombre'
                                                name='nombre'
                                                placeholder='Nombre del Proveedor...'
                                            />                                                    
                                        </div>
                                       
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >                                        
                                            <FormikControl
                                                control='input'
                                                type='text'
                                                label='Telefono'
                                                name='telefono'
                                                placeholder='Telefono del Proveedor...'
                                            />
                                        </div>      
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                                            <FormikControl
                                                control='input'
                                                type='text'
                                                label='Direccion'
                                                name='direccion'
                                                placeholder='Direccion del Proveedor...'
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

export default withRouter(FormularioProveedor)