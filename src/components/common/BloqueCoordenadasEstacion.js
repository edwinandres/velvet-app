import React from 'react'
/**
 * 
 * @param {*} param0 = variados arreglos con informacion de ubicaciones
 * @returns componente fisico para digitar latitud y longitud y realizar busqueda desde otro componente
 */
const BloqueCoordenadasEstacion = ({ consultarUbicacion ,errors, handleBlur, handleChangeCoordenadas ,valoresUbicacion, departamentos, municipios, corregimientos, comunas, barrios, veredas}) => {

    let styles ={
        fontWeight:"bold",
        color:"#dc3545"
    }  

    
    return (
        <div>
            
            <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card-header"><strong>UBICACION DE LA ESTACION</strong></div>
            <div className="card-body" id="">
                <label>Latitud</label>
                <input
                    className="form-control"
                    type="number"
                    id="latitud"
                    name="latitud"
                    value={valoresUbicacion.latitud || ''}
                    onChange={handleChangeCoordenadas}
                    onBlur={handleBlur}
                />
                  {errors.latitud && <p style={styles}>{errors.latitud}</p>}
                
                <label>Longitud</label>
                <input
                    className="form-control"
                    type="number"
                    id="longitud"
                    name="longitud"
                     value={valoresUbicacion.longitud || ''}
                    onChange={handleChangeCoordenadas}
                    onBlur={handleBlur}
                />
                  {errors.longitud && <p style={styles}>{errors.longitud}</p>}
                  
                
                <div className="row mt-3 ">
                    <div className='col-sm-3' >
                        <input
                            className="btn btn-md  btn-secondary row-md-20 btn-block"
                            type="button"
                            onClick={consultarUbicacion}
                            value="Consultar ubicación"
                        />
                    </div>
                </div>

                

            </div>

        </div>
        </div>
    )
}

export default BloqueCoordenadasEstacion
