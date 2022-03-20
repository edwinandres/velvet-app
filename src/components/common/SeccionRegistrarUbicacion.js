import React, { useState, useEffect } from 'react'
import FormikControl from '../../components/common/FormikControl'

import validationsForm from '../../components/common/ValidationForms'
import { axiosPostIndividual, axiosPutIndividual } from './AxiosCrud'



const SeccionRegistrarUbicacion = ({ setErrorsCoord, consultarUbicacion, errorsCoord, handBlur, actualizarCoordenadas, coordenadas, ubicacionCompleta, ubicacionEstacion, setValoresIniciales, valoresIniciales, departamentos, municipios, barrios, corregimientos, veredas }) => {

    let styles = {
        fontWeight: "bold",
        color: "#dc3545"
    }
    //console.log(ubicacionCompleta)
    //console.log(ubicacionEstacion[0].ubicacion.vereda.corregimiento.municipio.departamento.idDepartamento, "desde el ")
    // console.log(ubicacionEstacion[0].ubicacion.barrio.comuna.municipio.departamento.idDepartamento, "desde el ")

    // const [valoresUbicacion, setValoresUbicacion] = useState({
    //     'idUbicacion': ubicacionEstacion[0].ubicacion.idUbicacion,
    //     'nombre': ubicacionEstacion[0].ubicacion.nombre,
    //     'altitud': ubicacionEstacion[0].ubicacion.altitud,
    //     //'barrio': ubicacionEstacion[0].ubicacion.barrio.nombre || '',
    //     'direccion': ubicacionEstacion[0].ubicacion.direccion,
    //     'latitud': '',
    //     'longitud': '',
    //     'idBarrio': ubicacionEstacion[0].ubicacion.idBarrio,
    //     'idbarrio': ubicacionEstacion[0].ubicacion.idBarrio,
    //     'idComuna': '',
    //     'vereda': '',
    //     'idVereda': ubicacionEstacion[0].ubicacion.idVereda,
    //    // 'idDepartamento':ubicacionEstacion[0].ubicacion.vereda.corregimiento.municipio.departamento.idDepartamento || ubicacionEstacion[0].ubicacion.barrio.comuna.municipio.departamento.idDepartamento,

    // })
    const [errors, setErrors] = useState([])
    const [valoresUbicacion, setValoresUbicacion] = useState({

        'latitud': coordenadas.latitud,
        'longitud': coordenadas.longitud,
        'idUbicacion': ubicacionCompleta ? ubicacionCompleta.idUbicacion : '',
        'nombre': ubicacionCompleta ? ubicacionCompleta.nombre : '',
        'altitud': ubicacionCompleta ? ubicacionCompleta.altitud : '',
        // //'barrio': ubicacionEstacion[0].ubicacion.barrio.nombre || '',
        'direccion': ubicacionCompleta ? ubicacionCompleta.direccion : '',
        // 'latitud': '',
        // 'longitud': '',
        'idBarrio': ubicacionCompleta ? ubicacionCompleta.idBarrio : '',
        // 'idbarrio': ubicacionCompleta.idBarrio,
        // 'idComuna': '',
        // 'vereda': '',
        'idVereda': ubicacionCompleta ? ubicacionCompleta.idVereda : '',

        'idCorregimiento': !ubicacionCompleta
            ? ''
            : ubicacionCompleta.vereda
                ? ubicacionCompleta.vereda.corregimiento.idCorregimiento
                : '',

        'idMunicipio': !ubicacionCompleta
            ? ''
            : ubicacionCompleta.barrio
                ? ubicacionCompleta.barrio.comuna.municipio.idMunicipio
                : ubicacionCompleta.vereda.corregimiento.municipio.idMunicipio,


        'idDepartamento': !ubicacionCompleta
            ? ''
            : ubicacionCompleta.vereda
                ? ubicacionCompleta.vereda.corregimiento.municipio.departamento.idDepartamento
                : ubicacionCompleta.barrio.comuna.municipio.departamento.idDepartamento,
        //'idDepartamento':16


    })
    const resetearValoresUbicacion = () => {

        //console.log("en que momento pasa por aqui")
        setValoresUbicacion({
            'idUbicacion': '',
            'nombre': '',
            'altitud': '',
            'barrio': '',
            'direccion': '',
            'latitud': '',
            'longitud': '',
            'idBarrio': '',
            'idComuna': '',
            'vereda': '',
            'idVereda': '',
            'idDepartamento': '',
            'idMunicipio': ''
        })
    }

    const cargarBusquedaUbicacion =  (data) => {
        //console.log("esto es la data nueva", data)
         setValoresUbicacion({
            nombre: data.nombre ? data.nombre : '',
            altitud: data.altitud,
            idDepartamento: data.vereda ? data.vereda.corregimiento.municipio.departamento.idDepartamento : data.barrio.comuna.municipio.departamento.idDepartamento,
            //idMunicipio: data.vereda ? data.vereda.corregimiento.municipio.idMunicipio : data.barrio.comuna.municipio.idMunicipio,
            idCorregimiento: data.vereda ? data.vereda.corregimiento.idCorregimiento : '',
            idMunicipio: data.barrio ? data.barrio.comuna.municipio.idMunicipio : '',
            idVereda: data.vereda ? data.vereda.idVereda : '',
            idBarrio: data.barrio ? data.barrio.idBarrio : '',
            direccion: data.direccion ? data.direccion : '',

        })
    }

    useEffect(() => {

        //console.log(valoresIniciales, "estos son los valores iniciales en el useffect")

        setValoresUbicacion({
            ...valoresUbicacion,
            latitud: coordenadas.latitud,
            longitud: coordenadas.longitud,
            //'direccion': ubicacionEstacion[0].ubicacion.direccion,


        })
        consultarUbicacion(valoresUbicacion)


        //console.log("esta ESTAAACTUALIZANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", valoresUbicacion, coordenadas)
        //alert("hola") * probando
        /** hola , probando codigo
         * ?esto es otro comentario
         * TODO :QUE buena extension
         * @param myParam jajajajaj ue biein
         * !important escribir algo para ver
         * *este como que no funciona o debo cambiar el color
         * *cambio de color parece no funcionar
         */
// eslint-disable-next-line    
    }, [coordenadas])

    //  hola como estas


    useEffect(() => {

        //console.log(valoresIniciales, "estos son los valores iniciales en el useffect")

        setValoresUbicacion({
            // ...valoresUbicacion,
            // 'latitud': coordenadas.latitud,
            // 'longitud': coordenadas.longitud,
            //     //'direccion': ubicacionEstacion[0].ubicacion.direccion,


            // })
            // resetValoresUbicacion({
            //     idDepartamento:17
        })

        const cargarvalores = async()=>{
            await valoresIniciales.idUbicacion !== '' ?  cargarBusquedaUbicacion(valoresIniciales) : resetearValoresUbicacion(valoresIniciales);

        }
        cargarvalores();
        //setValoresUbicacion({... valoresIniciales})
        //console.log(valoresUbicacion)
        agregarCoordenadas(coordenadas.latitud, coordenadas.longitud)
        //console.log(valoresIniciales)
// eslint-disable-next-line    
    }, [valoresIniciales])






    const actualizarData = (e) => {

        // console.log("erorrsss" ,errors)
        setValoresUbicacion({
            ...valoresUbicacion,
            //'latitud': coordenadas.latitud,
            [e.target.name]: e.target.value
        })

    }

    const handleBlur = () => {
        setErrors(validationsForm(valoresUbicacion))
    }

    const agregarCoordenadas = async (latitud, longitud) => {
        setValoresUbicacion({
            ...valoresUbicacion,
            latitud: latitud,
            longitud: longitud

        })
    }

    // function removeItemFromArr ( arr, item ) {
    //     var i = arr.indexOf( item );
     
    //     if ( i !== -1 ) {
    //         arr.splice( i, 1 );
    //     }
    // }

    const registrarUbicacion = async () => {
        await agregarCoordenadas(coordenadas.latitud, coordenadas.longitud)
        // console.log(valoresUbicacion, "ESTOS SON LOS VALORES PARA EL VALIDATE   ")
        // console.log(coordenadas.latitud, "estas son lsa coordenadas")
        setErrors(validationsForm(valoresUbicacion))
        setErrorsCoord(validationsForm(coordenadas))
        //console.log(errors, "ESTOS SON LOS ERRORS")
        //handBlur(coordenadas)
        if (valoresUbicacion.altitud !== '' && valoresUbicacion.longitud && valoresUbicacion.longitud !== '' && valoresUbicacion.latitud !== '' && valoresUbicacion.nombre !== '') {

            //alert("se puede guardar")
            //todo : si hay idubicacion, actualizarla si no guardar como nueva
            if (valoresUbicacion.idUbicacion) {//*actualizar
                //alert(valoresUbicacion.idUbicacion)
                axiosPutIndividual(valoresUbicacion, '/ubicacion/')
            }else{
                //alert("nuevo")
                delete(valoresUbicacion.idUbicacion)
                axiosPostIndividual(valoresUbicacion, '/ubicacion/')
            }

        } else {
            //alert(Object.keys(errors).length)
            return
        }
        //    if(errorsCoord){
        //        alert("coordenadas incompletas")
        //    }
        //    if(!errors && !errorsCoord){
        //        alert("vamos a guardar")
        //    }
    }

    return (
        <div className='row'>
            {/* <FormularioUbicacion/> */}
            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <div className='form-group'>
                    <label>Departamento</label>
                    <select className="form-control">
                        <option key={`sinDepartamento`}>Seleccione... </option>
                        {departamentos.map((departamento, index, self) => {
                            return (
                                <option
                                    key={index}
                                    value={departamento.id}
                                >{departamento.nombre}
                                </option>
                            )
                        }
                        )}
                    </select>
                </div>
            </div> */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <FormikControl
                    control='select'
                    label='Departamento'
                    name='idDepartamento'
                    options={departamentos}
                    value={valoresUbicacion.idDepartamento}
                    selected={valoresUbicacion.idDepartamento}
                    onChange={e => actualizarData(e)}
                />
            </div>

            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <div className='form-group'>
                    <label>Municipio</label>
                    <select className="form-control">
                        <option key={`sinMunicipio`}>Seleccione... </option>
                        {municipios.map((municipio, index, self) => {
                            return (
                                <option
                                    key={index}
                                    value={municipio.id}
                                >{municipio.nombre}
                                </option>
                            )
                        }
                        )}
                    </select>
                </div>
            </div> */}

            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <div className='form-group'>
                    <label>Corregimiento</label>
                    <select className="form-control">
                        <option key={`sinCorregimiento`}>Seleccione... </option>
                        {corregimientos.map((corregimiento, index, self) => {
                            return (
                                <option
                                    key={index}
                                    name='corregimiento'
                                    value={corregimiento.id}
                                >{corregimiento.nombre}
                                </option>
                            )
                        }
                        )}
                    </select>
                </div>
            </div> */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <FormikControl
                    control='select'
                    label='Municipio'
                    name='idMunicipio'
                    options={municipios}
                    value={valoresUbicacion.idMunicipio}
                    selected={valoresUbicacion.idMunicipio}
                    onChange={e => actualizarData(e)}
                />
            </div>
            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <FormikControl
                    control='select'
                    label='Corregimiento'
                    name='idCorregimiento'
                    options={corregimientos}
                    value={valoresUbicacion.idCorregimiento || ''}
                    selected={valoresUbicacion.idCorregimiento}
                    onChange={e => actualizarData(e)}
                />
            </div> */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <FormikControl
                    control='select'
                    label='Barrio'
                    name='idBarrio'
                    options={barrios}
                    value={valoresUbicacion.idBarrio || ''}
                    selected={valoresUbicacion.idBarrio}
                    onChange={e => actualizarData(e)}
                />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <FormikControl
                    control='select'
                    label='Vereda'
                    name='idVereda'
                    options={veredas}
                    value={valoresUbicacion.idVereda || ''}
                    selected={valoresUbicacion.idVereda}
                    onChange={e => actualizarData(e)}
                />
            </div>

            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <div className='form-group'>
                    <label>Barrio</label>
                    <select className="form-control" 
                    value={valoresUbicacion.idbarrio} 
                    //selected={valoresUbicacion.idbarrio}
                    name='idbarrio' 
                    //id='idBarrio'
                    onChange={e => actualizarData(e )}
                    selected={valoresUbicacion.idbarrio} 
                    //defaultValue={valoresUbicacion.idBarrio}
                    >
                        <option key={`sinBarrio`}>Seleccione... </option>
                        {barrios.map((barrio, index, self) => {
                            return (
                                <option 
                                    key={index} 
                                    value={barrio.id}
                                    >{barrio.nombre}
                                </option>
                            )}
                        )}
                    </select>
                </div>
            </div> */}

            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <div className='form-group'>
                    <label>Vereda</label>
                    <select className="form-control" name='idVereda' onChange={e => actualizarData(e)}>
                        <option key={`sinVereda`}>Seleccione... </option>
                        {veredas.map((vereda, index, self) => {
                            return (
                                <option
                                    key={index}
                                    value={vereda.id}
                                //onChange={e => actualizarData(e)}
                                >{vereda.nombre}
                                </option>
                            )
                        }
                        )}
                    </select>
                </div>
            </div> */}

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                <div className='form-group'>
                    <label>Altitud</label>
                    <input
                        className="form-control"
                        type="number"
                        name="altitud"
                        onChange={e => actualizarData(e)}
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
                        onChange={e => actualizarData(e)}
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
                        onChange={e => actualizarData(e)}
                        value={valoresUbicacion.direccion}
                    />

                </div>
            </div>

            {/* <div className="row"> */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6" >
                {/* <div className='form-group col-lg-6'> */}
                <input
                    className="btn btn-md  btn-secondary row-md-20 btn-block col-lg-6"
                    type="button"
                    onClick={registrarUbicacion}
                    value="Actualizar ubicate"
                />
                {/* </div> */}
            </div>
        </div>
    )
}

export default SeccionRegistrarUbicacion
