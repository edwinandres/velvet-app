import axios from 'axios'
import React, { useState } from 'react'

import SeccionRegistrarUbicacion from '../common/SeccionRegistrarUbicacion'
import validationsForm from '../../components/common/ValidationForms'


//import {axiosGet} from '../common/AxiosCrud'
//import axios from 'axios'


const SeccionUbicacion = ({ ubicacionCompleta, ubicacionEstacion ,guardarCoordenadas, coordenadas, departamentos, municipios, barrios, corregimientos, veredas }) => {


    let styles ={
        fontWeight:"bold",
        color:"#dc3545"
    }   
//console.log("UBICACIONESTACION EN SECCION", ubicacionEstacion)

    const [valoresIniciales , setValoresIniciales] = useState({
        'idUbicacion':'', 
        'nombre':'',
        'altitud':'',
        'barrio':'',
        'direccion':'',
        'latitud':'',
        'longitud':'',
        'idBarrio':'',
        'idComuna':'',
        'vereda':'',
        'idVereda':''

    })
    //setMunicipios2(municipios2)
    const [errorsCoord, setErrorsCoord] = useState([])


    const resetearValoresIniciales = () => {

        setValoresIniciales({
            'idUbicacion':'', 
            'nombre':'',
            'altitud':'',
            'barrio':'',
            'direccion':'',
            'latitud':'',
            'longitud':'',
            'idBarrio':'',
            'idComuna':'',
            'vereda':'',
            'idVereda':''
        })
    }
   

    //const [ubicacionExiste, guardarUbicacionExite] = useState(false)

    const cargarInfo = (dataUbicaciones) => {
        //console.log("DATA UBICACIONES", dataUbicaciones)
        setValoresIniciales(dataUbicaciones)
        //console.log(valoresIniciales, "VALORESINICIALES")
    }

    const habilitarInputs = () => {

    }

    const handBlur = () =>{

        setErrorsCoord(validationsForm(coordenadas))
    }

   

    const consultarUbicacion = async () => {

        //alert("hola")

        let response = await axios.get(process.env.REACT_APP_URL_SERVICES + '/buscarUbicacion/' + coordenadas.latitud + '/' + coordenadas.longitud)

        //buscar ubicacion en nuestra db
        if (response.data.mensaje === "La ubicación ha sido encontrado con éxito.") {
            //console.log("la ubicacion si  esta en nuestra db")
            //guardarUbicacionExite(true)
            cargarInfo(response.data.data)
            //bucar en shape externo
        } else if (response.data.mensaje === "La ubicación no ha sido encontrada") {

            let responseInShape = await axios.get(process.env.REACT_APP_URL_SERVICES + '/base/puntoEnPoligono/' + coordenadas.latitud + '/' + coordenadas.longitud)
            if (responseInShape.data.mensaje === 'El punto fue ubicado con exito') {
                //console.log("el punto se eencontro en shape")
                //console.log(responseInShape.data.data)
                habilitarInputs()
                //cargarInfoDelShape()
            } else {
                //console.log(valoresIniciales,"no se encontro nada")
                resetearValoresIniciales()
                // cargarInfo(response.data.data)
                // console.log(response.data.data)
                
                habilitarInputs();
            }
        }
        // else{
        //     console.log(response.data.mensaje)
        //     console.log("paso por el ultimo else");
        //     guardarUbicacionExite(false)
        //     habilitarInputs()
        // }

    }

    function actualizarCoordenadas(e) {
        guardarCoordenadas({ ...coordenadas, [e.target.name]: e.target.value })
        //console.log(coordenadas)
    }


    return (


        <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card-header"><strong>UBICACION DE LA ESTACION</strong></div>
            <div className="card-body" id="">
                <label>Latitud</label>
                <input
                    className="form-control"
                    type="number"
                    id="latitud"
                    name="latitud"
                    value={coordenadas.latitud || ''}
                    onChange={actualizarCoordenadas}
                    onBlur={handBlur}
                />
                  {errorsCoord.latitud && <p style={styles}>{errorsCoord.latitud}</p>}
                
                <label>Longitud</label>
                <input
                    className="form-control"
                    type="number"
                    id="longitud"
                    name="longitud"
                    value={coordenadas.longitud || ''}
                    onChange={actualizarCoordenadas}
                    onBlur={handBlur}
                />
                  {errorsCoord.longitud && <p style={styles}>{errorsCoord.longitud}</p>}
                  
                
                <div className="row mt-3 ">
                    <div className='col-sm-3' >
                        <input
                            className="btn btn-md  btn-secondary row-md-20 btn-block"
                            type="button"
                            onClick={consultarUbicacion}
                            value="Consultar ubicacion en seccion ubicacion"
                        />
                    </div>
                </div>

                {valoresIniciales!==null
                    ?
                    <>
                        <SeccionRegistrarUbicacion
                            departamentos={departamentos}
                            municipios={municipios}
                            barrios={barrios}
                            corregimientos={corregimientos}
                            veredas={veredas}
                            valoresIniciales={valoresIniciales}
                            setValoresIniciales={setValoresIniciales}
                            ubicacionEstacion={ubicacionEstacion}
                            ubicacionCompleta={ubicacionCompleta}
                            coordenadas={coordenadas}
                            actualizarCoordenadas={actualizarCoordenadas}
                            handBlur={handBlur}
                            errorsCoord={errorsCoord}
                            consultarUbicacion={consultarUbicacion}
                            setErrorsCoord={setErrorsCoord}
                            //resetearValoresIniciales={resetearValoresIniciales}
                        />

                    </>
                    :
                        null
                    // <SeccionRegistrarUbicacion
                    //     departamentos={departamentos}
                    //     municipios={municipios}
                    //     barrios={barrios}
                    //     corregimientos={corregimientos}
                    //     veredas={veredas}
                    // />
                    // <div>
                    //     {/* <FormularioUbicacion/> */}

                    //     <label>Departamento</label>
                    //     <select className="form-control">                                   
                    //         {departamentos.map((departamento, index, self)=>{                                          
                    //             return(<option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>)                                        
                    //         })}
                    //     </select>   
                    //     <label>Municipio</label>
                    //     <select className="form-control">                                   
                    //         {municipios.map((municipio, index, self)=>{                                          
                    //             return(<option key={municipio.id} value={municipio.id}>{municipio.nombre}</option>)                                        
                    //         })}
                    //     </select>  
                    //     <label>Barrio</label>     
                    //     <select className="form-control">                                   
                    //         {barrios.map((barrio, index, self)=>{                                          
                    //             return(<option key={barrio.id} value={barrio.id}>{barrio.nombre}</option>)                                        
                    //         })}
                    //     </select>   
                    //     <label>Altitud</label>
                    //     <input
                    //         className="form-control"
                    //         type="number"
                    //         id="altitud"
                    //     />               
                    // </div>             


                }

            </div>

        </div>


    )
}

export default SeccionUbicacion
