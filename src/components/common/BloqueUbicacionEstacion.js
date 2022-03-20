import axios from 'axios'
import React , { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { 
    //axiosGetUbicacionEstacion, 
    //axiosPostIndividual, 
    axiosPostUbicacion, 
    axiosPutIndividual 
} from './AxiosCrud'
import BloqueCoordenadasEstacion from './BloqueCoordenadasEstacion'
import BloqueInformacionUbicacionEstacion from './BloqueInformacionUbicacionEstacion'
import validationsForm from './ValidationForms'

const ubicacionDefault={'idUbicacion':"",'nombre':"","altitud":"",'direccion':"", "latitud":"","longitud": "",'idBarrio':"",'idComuna':"",'idVereda':"",'idMunicipio': "",'idDepartamento':"",'idCorregimiento':"", "estado":"A"}


const BloqueUbicacionEstacion = ({estacionId, ubicacionEstacion, departamentos, municipios, corregimientos, comunas, barrios, veredas}) => {

    const [valoresUbicacion, setValoresUbicacion] = useState(ubicacionDefault)
    const [errors, setErrors] = useState([])
    
    //! esta ya no se utiliza porque actualizarValoresUbicacion es mas dinamica
    // const cargarValoresUbicacion = async () => {            
       
    //     setValoresUbicacion({...valoresUbicacion,
    //         'latitud': ubicacionEstacion[0].ubicacion.latitud,
    //         'longitud': ubicacionEstacion[0].ubicacion.longitud,
    //         'idUbicacion': ubicacionEstacion[0].ubicacion.idUbicacion,
    //         'nombre': ubicacionEstacion[0].ubicacion.nombre,
    //         'altitud': ubicacionEstacion[0].ubicacion.altitud,
    //         'direccion': ubicacionEstacion[0].ubicacion.direccion,   
    //         'idBarrio': ubicacionEstacion[0].ubicacion.idBarrio, 
    //         'idVereda':ubicacionEstacion[0].ubicacion.idVereda,
    //         'idCorregimiento': !ubicacionEstacion[0].ubicacion.vereda
    //             ? ''
    //             : ubicacionEstacion[0].ubicacion.vereda
    //                 ? ubicacionEstacion[0].ubicacion.vereda.corregimiento.idCorregimiento
    //                 : '',
    //         'idMunicipio': !ubicacionEstacion[0].ubicacion.barrio
    //             ? ''
    //             : ubicacionEstacion[0].ubicacion.barrio
    //                 ? ubicacionEstacion[0].ubicacion.barrio.comuna.municipio.idMunicipio
    //                 : ubicacionEstacion[0].ubicacion.vereda.corregimiento.municipio.idMunicipio,

    //         'idDepartamento': !ubicacionEstacion[0].ubicacion.vereda
    //             ? ''
    //             : ubicacionEstacion[0].ubicacion.vereda
    //                 ? ubicacionEstacion[0].ubicacion.vereda.corregimiento.municipio.departamento.idDepartamento
    //                 : ubicacionEstacion[0].ubicacion.barrio.comuna.municipio.departamento.idDepartamento,
    //     });
    // };

    //console.log(valoresUbicacion, "DESDE BLOQUE PRIMARIO")

    //*se ejecuta al renderizar este componente y al consultar nueva ubicacion
    const actualizarValoresUbicacion = async (data) => {            
        //console.log("datos internos", data.barrio)
        setValoresUbicacion({...valoresUbicacion,
            'idUbicacion': data.idUbicacion? data.idUbicacion:null,
            'latitud': parseFloat(data.latitud),
            'longitud': parseFloat(data.longitud),
            //'idUbicacion': parseInt(data.idUbicacion),
            'nombre': data.nombre,
            'altitud': parseFloat(data.altitud),
            'direccion': data.direccion,   
            'idBarrio': data.idBarrio ? parseInt(data.idBarrio):'', 
            'idVereda': data.idVereda ? parseInt(data.idVereda) : '',
            'idCorregimiento': !data.vereda
                ? ''
                : data.vereda
                    ? parseInt(data.vereda.corregimiento.idCorregimiento)
                    : '',
            'idMunicipio': data.barrio
                ? parseInt(data.barrio.comuna.municipio.idMunicipio)
                : data.vereda
                    ? parseInt(data.vereda.corregimiento.municipio.idMunicipio)
                    : '',

            'idDepartamento': data.vereda
                ?  parseInt(data.vereda.corregimiento.municipio.departamento.idDepartamento)
                : data.barrio
                    ? parseInt(data.barrio.comuna.municipio.departamento.idDepartamento)
                    : '',
        });
    };    
    
    //*Se ejecuta solo al presionar el boton de consultar ubicacion
    const consultarUbicacion = async () => {
        let response = await axios.get(process.env.REACT_APP_URL_SERVICES + '/buscarUbicacion/' + valoresUbicacion.latitud + '/' + valoresUbicacion.longitud)
        

        if (response.data.mensaje === "La ubicación ha sido encontrado con éxito.") {
            //console.log("la ubicacion si  esta en nuestra db")
            actualizarValoresUbicacion(response.data.data);
            //bucar en shape externo
        } else if (response.data.mensaje === "La ubicación no ha sido encontrada") {
            setValoresUbicacion({
                ...ubicacionDefault, 'latitud':parseFloat(valoresUbicacion.latitud),'longitud':parseFloat(valoresUbicacion.longitud) 

            })

            let responseInShape = await axios.get(process.env.REACT_APP_URL_SERVICES + '/base/puntoEnPoligono/' + valoresUbicacion.latitud + '/' + valoresUbicacion.longitud)
            if (responseInShape.data.mensaje === 'El punto fue ubicado con exito') {
                //console.log("el punto se eencontro en shape")
                //console.log(responseInShape.data.data)
               
                //cargarInfoDelShape()
            } else {
                //console.log(valoresIniciales,"no se encontro nada")
                
               
            }
        }

       // alert(`ubicacion id ${response.data.data.idUbicacion}`)
    };

    const establecerErrores = async () => {
        setErrors(validationsForm(valoresUbicacion))        
    }

    // const registrarUbicacion2 = async()=>{
    //     let response = await axiosPostUbicacion(valoresUbicacion, '/ubicacion/');
    // }

    const registrarUbicacion = async () => {
        
        await establecerErrores();        
       
        if(Object.keys(errors).length===0){              
            //*if exist : update  else: create
            if (valoresUbicacion.idUbicacion){                                      
                await axiosPutIndividual(valoresUbicacion, '/ubicacion/', estacionId)                
            }else{       
                    
                await axiosPostUbicacion(valoresUbicacion, 'ubicacion/', estacionId)               
            }            
            
        }else{            
            toast.error("Falta diligenciar algunos campos")
        }
    };
   

    useEffect(() => {
        const cargarDataInicial = async () => {
            if(ubicacionEstacion[0] !== undefined){
                actualizarValoresUbicacion(ubicacionEstacion[0].ubicacion)
            }
        }
        cargarDataInicial();
       //eslint-disable-next-line     
    },[ubicacionEstacion]);


    const handleChangeCoordenadas = (e) => {

        let numericos = [
        'idVereda','idBarrio', 'idDepartamento', 'idMunicipio','idCorregimiento']

        if(numericos.includes(e.target.name)){
            //alert("siii")
            setValoresUbicacion({
                ...valoresUbicacion,
                [e.target.name]:parseInt(e.target.value)
            });
        }else if(e.target.name=== 'altitud'){
            setValoresUbicacion({
                ...valoresUbicacion,
                [e.target.name]:parseFloat(e.target.value)
            });
        }else{
            setValoresUbicacion({
                ...valoresUbicacion,
                [e.target.name]:e.target.value
            });
        }
        
    };

    const handleBlur = (e) => {
        //handleChangeCoordenadas(e)
       
        setErrors(validationsForm(valoresUbicacion));
    };


    return (
        <div>
            
            <BloqueCoordenadasEstacion
                valoresUbicacion={valoresUbicacion}
                handleChangeCoordenadas={handleChangeCoordenadas}
                handleBlur={handleBlur}
                errors={errors}
                consultarUbicacion={consultarUbicacion}
            />
                {/* <div className="row mt-3 ">
                    <div className='col-sm-3' >
                        <input
                            className="btn btn-md  btn-secondary row-md-20 btn-block"
                            type="button"
                            onClick={consultarUbicacion}
                            value="Consultar ubicacionubicacion"
                        />
                    </div>
                </div> */}






            <BloqueInformacionUbicacionEstacion
                valoresUbicacion={valoresUbicacion}
                municipios={municipios}
                departamentos={departamentos}
                barrios={barrios}
                corregimientos={corregimientos}
                veredas={veredas}
                handleChangeCoordenadas={handleChangeCoordenadas}
                handleBlur={handleBlur}
                errors={errors}
                registrarUbicacion={registrarUbicacion}
            />
            
        </div>
    )
}

export default BloqueUbicacionEstacion
