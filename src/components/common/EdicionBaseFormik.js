import React, { Fragment } from 'react'
import { withRouter} from 'react-router-dom'
//import { ToastContainer } from 'react-toastr';
import { toast } from 'react-toastify';
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from "formik";



class EdicionBaseFormik extends React.Component {

    state={
        item:{
            nombre:'',
            descripcion:'',
            estado:'',
        },
        error:false,
        exito:false,
    }

    componentDidMount(){
        
        const   data  =   this.consultarData(this.props.url+this.props.match.params.id)
       
        
        
    }


    //actualizar state cada vez que cambie algo en el formulario
    handleChange = (nombre, valor) => {          
        this.setState({
            item:{
                ...this.state.item,
                //[e.target.name]:e.target.value
                [nombre]:valor
            }
        })
    }


    //guardar informacion
    submitItem = async (e) => {
        //e.preventDefault();
    
        //validar
        if (this.state.item.nombre.trim() === "" || this.state.item.descripcion.trim() === "") {
            this.setState({
                error:true
            });
            toast.error("Todos los campos son requeridos")
          return;
        }

        const{nombreId} = this.props
    
        //realizar peticion json
        try {
            //console.log(this.props.params);
            let config = {
                method: 'PUT',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // [nombreId]: this.props.match.params.id,   
                    [nombreId]: this.props.id,         
                    nombre: this.state.item.nombre,
                    descripcion: this.state.item.descripcion,
                    estado: this.state.item.estado
                })
            }
            
            let res = await fetch(this.props.url, config)
            let json =  await res.json() 
            toast.success("Actualizacion exitosa")            
            this.props.history.push(this.props.urlRetorno)
        } catch (error) {
            if(error){
                toast.error("No se que pasa aqui")
            }
            
        }  

        
        
        
    
    };  

    consultarData = async (url) =>{

        await axios.get(url)
            .then(response => {                
                // Obtenemos los datos                
                this.setState({
                    item:response.data
                    
                    // item:{
                        
                    //     ...this.state.item,
                    //     nombre : response.data.nombre,
                    //     descripcion: response.data.descripcion,
                    //     estado:response.data.estado                  
                    // }
                })
                return response.data
                
            })
            .catch(e => {
                // Capturamos los errores
            })
    }
    

    render() {

       
        const {nombre, descripcion } = this.state.item;
        
        return (
        
            <Fragment>
                    <div className="card card-default">
                        <div className="card-header">
                            <h3 className="card-title text-uppercase">{this.props.encabezado}</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" /></button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" /></button>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-lg-12">
                            <Formik
                            //onChange={(e, formik) => this.handleChange(e)}
                                //onChange = { this.handleChange }
                                initialValues={{ nombre:{nombre}, descripcion:{descripcion} }}
                                validate={values => {
                                    //this.handleChange()
                                    let errors = {};
                                    if (values.nombre === "") {
                                        errors.nombre = "El nombre es requerido";
                                    } else if (values.nombre.length < 3) {
                                        errors.nombre = "El nombre debe contener 3 letras como minimo";
                                    }
                                    if (values.descripcion === "") {
                                        errors.descripcion = "La descripcion es requerida";
                                    } else if (values.descripcion.length < 10) {
                                        errors.descripcion = "Se requieren por lo menos 10 caracteres";
                                    }
                                    // if (values.password === "") {
                                    //     errors.password = "Password is required";
                                    // } else if (values.password.length < 3) {
                                    //     errors.password = "Password must be 3 characters at minimum";
                                    // }
                                    return errors;
                                }}
                                onSubmit={({ setSubmitting }) => {

                                    this.submitItem();
                                    setSubmitting(false);
                                }}
                            >
                            {({ touched, errors, isSubmitting }) => (
                                <Form
                                onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                                //onSubmit={(e) => this.submitItem(e)}
                                
                                >
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="form-group">
                                                    <label htmlFor="nombre">Nombre</label>
                                                    <Field
                                                        type="text"
                                                        name="nombre"
                                                        placeholder="Ingrese el nombre"
                                                        
                                                        //onChange={Formik.validate}
                                                        value={this.state.item.nombre}
                                                        className={`form-control ${touched.nombre && errors.nombre ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="nombre"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="descripcion">Descripcion</label>
                                                    <Field as="textarea"
                                                        type="text"
                                                        name="descripcion"
                                                        placeholder="Descripcion...."
                                                        //onChange={this.handleChange}
                                                        value={this.state.item.descripcion}
                                                        className={`form-control ${touched.descripcion && errors.descripcion ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="descripcion"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                {/* <div className="form-group">
                                                    <label htmlFor="estado">Estado</label>
                                                    <Field
                                                        as="select"
                                                        defaultValue={this.state.estado}                                         
                                                        name="estado" 
                                                        value={this.state.item.estado} 
                                                        onChange={this.handleChange} 
                                                        className={`form-control ${touched.estado && errors.estado ? "is-invalid" : ""}`}
                                                    >
                                                        <option value="A">Activo</option>  
                                                        <option value="I">Inactivo</option> 
                                                    </Field>
                                                    <ErrorMessage
                                                        component="div"
                                                        name="estado"
                                                        className="invalid-feedback"
                                                    />
                                                </div> */}
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col-md-12">
                                                            <button
                                                                className="btn btn-md  btn-secondary row-md-20 btn-block"
                                                                type="submit"
                                                                disabled={isSubmitting}
                                                            >Guardar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                


                                                





                                        </div>
                                    </div>
                                </div>
                
                                
                
                                    {/* <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? this.submitItem : "Submit"}
                                    </button> */}
                                </Form>
                            )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
      }
}

export default withRouter(EdicionBaseFormik);
