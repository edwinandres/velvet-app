import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const EnsayoCardDetalle = ({urlService, urlRetorno, id, encabezado}) => {

    const [listado, guardarListado] = useState([])
    
    
    useEffect(() => {
        

        const obtenerDatos = async () => {

            const respuesta = await axios.get(urlService+id) 
            
            //console.log(respuesta.data.data)
          
            //crear un array de divs con label(key) y p(value) .Cada div responde a cada uno
            //de los elementos del objeto encontrado
            let lista= []
            for(const [key, value] of Object.entries(respuesta.data.data)){  
                
               if(key === 'estado' || key ==='descripcion')continue;
                
                lista.push(  
                    <div className="col-md-12 mt-2" key={key}>
                        <div className="form-group">
                            <label >{MaysPrimera(key)}</label>
                          
                            <p>{(value===true)?"Si":(value===false)?"No":value}</p>
                        </div>
                    </div>
                )    
            } 
            guardarListado(lista)  
        }
        
        obtenerDatos()  
        
    }, [urlService, urlRetorno, id])  

    //convertir a mayuscula la primera letra del label
    function MaysPrimera(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }  
 
   
   
     return (        
        <div>
            <div className="card card-default">
                <div className="card-header">
                    <h3 className="card-title text-uppercase">{encabezado}</h3>
                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" /></button>
                        <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" /></button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 ml-3">
                        {listado}
                        <Link to={urlRetorno} type='button' className='btn btn-secondary mb-2 '>Regresar</Link>   
                    </div>
                </div>
            </div> 
        </div>      
        
        
     )
}

export default EnsayoCardDetalle

