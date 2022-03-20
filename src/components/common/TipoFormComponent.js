import React, { Fragment } from 'react'
//import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom'
//import '../../../../public/dist/css/adminlte.min.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

class TipoFormComponent extends React.Component{    

    state = {
        item:{
            nombre:'',
            descripcion:'',
            estado:'A'
        },
        error:false,
    }
   
    handleChange = e => {        
        this.setState({
            item:{
                ...this.state.item,
                [e.target.name]:e.target.value
            }
        })
    }

    //guardar informacion
    submitItem = async (e) => {
        e.preventDefault();
    
        //validar
        if (this.state.item.nombre.trim() === "" || this.state.item.descripcion.trim() === "") {
          //this.setState({error:true});
          //log
          toast.error("Todos los campos son requeridos")
          return;
        }
    
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.item)
            }
            /*let res = await fetch('https://192.168.1.60/serviciosSistemaInformacion/base/marca/', config)*/
            let res = await fetch(this.props.url, config)
            let json =  await res.json()
            // console.log(res)
            // console.log(json);
            toast.success("Guardado exitoso")
            this.props.history.push(this.props.urlRetorno)
            //return <Redirect to='/prueba/' />
        } catch (error) {
            if(error){
                toast.error("Problemas con el servidor, Intentelo mas tarde")
            }
            
        }
      };

    render(){
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
                    <form onSubmit={this.submitItem} >
                        {this.state.error 
                            ? (<label className="mensajeError">Todos los campos son requeridos</label>) 
                            : null
                        }
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="nombreInput">Nombre</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="nombreInput" 
                                            placeholder="Nombre" 
                                            name='nombre'
                                            onChange={this.handleChange}
                                            value={this.state.nombre}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea 
                                            className="form-control" 
                                            rows={3} placeholder="Ingrese la descripción..." 
                                            defaultValue={""} 
                                            name='descripcion'
                                            onChange={this.handleChange}
                                            value={this.state.descripcion}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Estado</label>
                                        <select 
                                            defaultValue={this.state.estado}
                                            className="form-control" 
                                            name="estado" 
                                            value={this.state.estado} 
                                            onChange={this.handleChange}
                                            //defaultValue={"A"} 
                                        >
                                            <option value="A">Activo</option>  
                                            <option value="I">Inactivo</option>                
                                        </select>
                                        

                                        {/* <ListaDeEstados
                                            estado={this.state.item.estado}
                                            item={this.state.item}
                                            handleChange={this.handleChange}
                                        /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                    <div className="form-group">
                                        <div className="col-md-3">
                                            <button
                                                className="btn btn-md  btn-secondary row-md-3"
                                                type="submit"
                                            >Guardar</button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </form>
                    <div className="card-footer">
                        Visite el <a href="https://select2.github.io/">diccionario de términos</a> si desea ampliar la información.
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(TipoFormComponent);
