import { Badge } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const Detalle = (props) => {

    const [listado, guardarListado] = useState([])
    
    
    useEffect(() => {
        

        const obtenerDatos = async () => {

            //crear un array de divs con label(key) y p(value) .Cada div responde a cada uno
            //de los elementos del objeto encontrado
            let lista= []
            for(const [key, value] of Object.entries(props.detalle)){  
                
              // if(key === 'estado' || key ==='descripcion')continue;
                
                lista.push(  
                    <div className="row " key={key} style={{'backgroundColor':'white'}}>
                        <div className="col-4 col-md-4 col-sm-3">
                        
                            <label >{MaysPrimera(key)}</label>
                          
                            <p>{value}</p>
                        </div>
                    </div>
                )    
            } 
            guardarListado(lista)  
            //console.log(listado)
        }
        
        obtenerDatos()  
        
    }, [props.detalle])  


    function MaysPrimera(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }  
 

    //console.log(`este es el listado ${JSON.stringify(listado)}`)
    //console.log("PROPS EN CARD DETALLE", props.detalle)
    //componente();
    return (
        <div className="card card-default">
        <div className="card-header">
          <h3 className="card-title text-uppercase">{props.encabezado}</h3>
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

           
              {listado}
          
            </div>

          


            <div className="col-md-12">
              <div className="form-group">
                <Link to={props.urlRetorno} 
                    className="btn btn-md  btn-secondary row-md-3" 
                    data-toggle="tooltip"                 
                >Regresar</Link>

                
              </div>
            </div>

          </div>
        </div>
      </div>
    )
}

export default Detalle
