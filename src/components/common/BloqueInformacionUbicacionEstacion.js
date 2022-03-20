import React from 'react'
import FormikControl from './FormikControl'

const BloqueInformacionUbicacionEstacion = ({registrarUbicacion, errors, handleBlur, handleChangeCoordenadas,valoresUbicacion,departamentos, municipios, corregimientos, comunas, barrios, veredas}) => {
    

    let styles ={
        fontWeight:"bold",
        color:"#dc3545"
    }  
    //console.log(valoresUbicacion, "desde el ultimo bloque")
    return (
        <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card-header"><strong>DETALLE DE LA UBICACION</strong></div>
         
            <div className='card-body row'>
            
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
              
                <FormikControl
                    control='select'
                    label='Departamento'
                    name='idDepartamento'
                    options={departamentos}
                    value={valoresUbicacion.idDepartamento}
                    selected={valoresUbicacion.idDepartamento}
                    onChange={handleChangeCoordenadas}
                />
            </div>

           

          
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <FormikControl
                    control='select'
                    label='Municipio'
                    name='idMunicipio'
                    options={municipios}
                    value={valoresUbicacion.idMunicipio}
                    selected={valoresUbicacion.idMunicipio}
                    onChange={handleChangeCoordenadas}
                />
            </div>
            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <FormikControl
                    control='select'
                    label='Corregimiento'
                    name='idCorregimiento'
                    options={corregimientos}
                    value={valoresUbicacion.idCorregimiento}
                    selected={valoresUbicacion.idCorregimiento}
                    onChange={handleChangeCoordenadas}
                />
            </div> */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <FormikControl
                    control='select'
                    label='Barrio'
                    name='idBarrio'
                    options={barrios}
                    value={valoresUbicacion.idBarrio}
                    selected={valoresUbicacion.idBarrio}
                    onChange={handleChangeCoordenadas}
                />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <FormikControl
                    control='select'
                    label='Vereda'
                    name='idVereda'
                    options={veredas}
                    value={valoresUbicacion.idVereda}
                    selected={valoresUbicacion.idVereda}
                    onChange={handleChangeCoordenadas}
                />
            </div>

            

           

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <div className='form-group'>
                    <label>Altitud</label>
                    <input
                        className="form-control"
                        type="number"
                        name="altitud"
                        onChange={handleChangeCoordenadas}
                        value={valoresUbicacion.altitud}
                        onBlur={handleBlur}
                    />
                    {errors.altitud && <p style={styles}>{errors.altitud}</p>}
                </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <div className='form-group'>
                    <label>Nombre</label>
                    <input
                        className='form-control'
                        type='text'
                        name='nombre'
                        id='nombre'
                        onChange={handleChangeCoordenadas}
                        value={valoresUbicacion.nombre}
                        onBlur={handleBlur}
                    />
                    {errors.nombre && <p style={styles}>{errors.nombre}</p>}

                </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <div className='form-group'>
                    <label>Direccion</label>
                    <input
                        className='form-control'
                        type='text'
                        name='direccion'
                        //id='direccion'                     
                        onChange={handleChangeCoordenadas}
                        value={valoresUbicacion.direccion || ''}
                    />

                </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >                
                <input
                    className="btn btn-md  btn-secondary row-md-20 btn-block col-lg-6"
                    type="button"
                    onClick={registrarUbicacion}
                    value="Actualizar ubicación"
                />               
            </div>
        </div>
        </div>
    )
}

export default BloqueInformacionUbicacionEstacion
