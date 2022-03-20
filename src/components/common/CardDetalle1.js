import React from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'

class CardDetalle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        item:{
            nombre:'',
            descripcion:'',
            estado:'A'
        },
        data:{}
    };
  }

  componentDidMount(){
    //console.log(url);
    //this.consultarData(this.props.url)    
    this.consultarData(this.props.url+this.props.id)

  }

  consultarData = async (url) =>{

    axios.get(url)
        .then(response => {      
          //console.log(response.data.data, "ESTE ES EL RESPONSE")          
            // Obtenemos los datos   
            this.setState({
                item:{
                    ...this.state.item,
                    nombre : response.data.nombre,
                    descripcion: response.data.descripcion,
                    estado:response.data.estado                  
                },
                data: response.data.data
            })
            
        })
        .catch(e => {
            // Capturamos los errores
            
        })
}


  render() {

   //console.log( "Esto es consultar data ", this.props)

    return (
      <div className="card card-default">
        <div className="card-header">
          <h3 className="card-title text-uppercase">{this.props.encabezado}</h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus" />
            </button>
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="nombreInput">Nombre</label>
                <p>{this.state.item.nombre}</p>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label>Descripción</label>
                <p>{this.state.item.descripcion}</p>
              </div>
            </div>


            <div className="col-md-3">
              <div className="form-group">
                <label>Estado</label>

                <p>{this.state.item.estado}</p>

                {/* <ListaDeEstados
                                            estado={this.state.item.estado}
                                            item={this.state.item}
                                            handleChange={this.handleChange}
                                        /> */}
              </div>
            </div>


            <div className="col-md-12">
              <div className="form-group">
                <Link to={this.props.urlRetorno} 
                    className="btn btn-md  btn-secondary row-md-3" 
                    data-toggle="tooltip"                 
                >Regresar</Link>

                
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default CardDetalle;
