import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

/**
 * *Toast.configure es requerido para invocarlo 
 */
toast.configure()

/**
 * *Guarda en DB y redirecciona la página al index
 * @param { string } urlPost - url del endpoint al que apuntara axios
 * @param { object } datos  - objeto a guardar en DB
 * @param { string } setFieldError - recibe el posible error y lo retorna a Formik
 * @param { string } urlRetorno - url a la que se redirecciona luego de guardar
 * @param { string } history - parametro de react-route para redireccionar 
 */
export async function axiosPost(urlPost, datos, setFieldError, urlRetorno, history) {


    await axios.post(urlPost, datos, { timeout: 2000 }
    ).then(response => {


        if (response.data.error) {
            response.data.columnas.forEach((columna) => {
                setFieldError(columna.nombre, columna.mensaje);
            })



        } else {
                     
            toast.success(response.data.mensaje)
            setTimeout(() => {
                history.push(urlRetorno)
            }, 1000)

        }
       

    }).catch(error => {
        if (error) {
            toast.error("Problemas con el servidor")
        }
    });

}


/**
 * *Actualiza la info de un objeto en DB y redirecciona
 * @param { string } urlPost - url del servicio de actualizacion
 * @param { object } datos - objeto a guardar en DB
 * @param { string } setFieldError - recibe el posible error y lo retorna a Formik
 * @param {*} urlRetorno urlRetorno - url a la que se redirecciona luego de guardar
 * @param {*} history - parametro de react-route para redireccionar 
 */
export async function axiosPut(urlPost, datos, setFieldError, urlRetorno, history) {


    console.log(urlPost, JSON.stringify(datos) + "crud");
    await axios.put(urlPost, datos, { timeout: 2000 }
        
    ).then(response => {

        //validar unique
        if (response.data.error) {
            response.data.columnas.forEach((columna) => {
                setFieldError(columna.nombre, columna.mensaje);
            })

        } else {
            //confirmiar y redirigir            
            toast.success(response.data.mensaje)
            setTimeout(() => {
                history.push(urlRetorno)
            }, 1000)

        }

    }).catch(error => {
        if (error) {
            toast.error("Problemas con el servidor")
        }

    });

}

/**
 * *Consulta DB para obtener informacion de un elemento
 * @param {string} urlGet - url de consulta de la api
 * @param {string} history -parametro de React-Router para redireccionar 
 * @param {string} urlRetorno -url de redireccion luego de consultar DB
 * @param {int} id - id del elemento a consultar
 * @returns object - Retorna toda la informacion de un objeto en especifico
 */
export async function axiosGet(urlGet, history, urlRetorno, id) {

  
    try {       
        const response = await axios.get(urlGet)      

        if (response.data.error) {
            toast.error(response.data.mensaje)
            history.push(urlRetorno)
        }
      
        if (response.data.data.estado === 'I') {
            toast.error(`El registro con id:${id} se encuentra inactivo`)
            history.push(urlRetorno)
        }

        const respuesta = response.data.data
        return respuesta

    } catch (error) {
        toast.error("El servidor no responde");
    }

}

/**
 * *Elimina un objeto de la DB
 * @param {int} id -identificador del objeto a eliminar
 * @param {string} url - url del servicio de api que elimina
 * @param {object} data -objeto a eliminar
 */
export async function axiosDelete(id, url, data) {


    console.log(`esto es url ${url} y esto es data ${JSON.stringify(data)} dentro de axiosDelete`)
    try {
        const eliminado = await axios.delete(url, data);

        console.log(`esto es eliminado ${JSON.stringify(eliminado)}`)
        if (eliminado.data) {
            toast.success(eliminado.data.mensaje)
        }

        
    } catch (error) {
    }

}

export async function axiosDeleteRedux(id, url, data) {

   

    console.log(`esto es url ${url} y esto es data ${JSON.stringify(data)} dentro de axiosDeleteREDUX`)
    try {
        const eliminado = await axios.delete(url, data);
        console.log(`esto es eliminado ${JSON.stringify(eliminado)}`)
        if (eliminado.data) {
            toast.success(eliminado.data.mensaje)
        }

        
    } catch (error) {
        console.log(`error ${error}`)
    }

}

/**
 * *Consulta el color asociado a un estado
 * @param {string} urlGet -url de consulta
 * @param {string} newColor -nuevo color a asignar
 * @returns string -color en formato hexadecimal
 */
export async function axiosGetColor(urlGet, newColor) {
   

    try {
        const response = await axios.get(urlGet);
        let respuesta = []

        response.data.data.map(dato => {           
            return respuesta.push(dato.color)           
        })
        return respuesta

    } catch (error) {
        console.error("El servidor no responde");
    }

}

/**
 * *Guarda una nueva estacion y redirige a edicion estacion
 * @param {string} urlPost -url de la estacion a guardar
 * @param {object} datos -objeto con la informacion a guardar
 * @param {string} setFieldError -en caso de error retorna el tipo de error a Formik
 * @param {string} urlRetorno -url a donde redirigirá al final
 * @param {string} history -parametro react-router para redirigir
 */
export async function axiosPostEstacion(urlPost, datos, setFieldError, urlRetorno, history) {

    
    await axios.post(urlPost, datos, { timeout: 2000 }
    ).then(response => {

        
        if (response.data.error) {
            response.data.columnas.forEach((columna) => {
                setFieldError(columna.nombre, columna.mensaje);
            })

        } else {
           
            toast.success(response.data.mensaje)
            setTimeout(() => {
                history.push(urlRetorno + response.data.data.idEstacion)
            }, 1000)

        }

       
    }).catch(error => {
        if (error) {
            toast.error("Problemas con el servidor")
        }
    });

}

/**
 * *Guardado de un objeto asociado a otro ej: componente-Estacion
 * @param {object} datos -objeto a guardar
 * @param {string} urlPost -url de la api para guardar el objeto
 * @returns object - retorna un objeto con status y el id del nuevo registro
 */
export async function axiosPostIndividual(datos, urlPost, nombreId) {

   

    //alert("axiospostindividual")

    let url = process.env.REACT_APP_URL_SERVICES + urlPost 
    

    if( await validarExistencia(datos, url, nombreId)){
        return
    }else{
//return;
        await axios.post(url, datos, { timeout: 2000 }
        ).then(response => {

            if (response.data.error) {
                response.data.columnas.forEach((columna) => {
                    //setFieldError(columna.nombre, columna.mensaje);
                })
                return response


            } else {
                              
                toast.success(response.data.mensaje)

                return response

            }

            

        }).catch(error => {
            if (error) {                
                toast.error("Problemas con el servidor")
            }
        });
}

}

/**
 * *Guarda ubicacion y redirecciona a funcion de guardado ubicacionEstacion
 * @param {object} datos -objeto con los datos de ubicacion
 * @param {string} urlPost -url de la api para el guardado
 * @param {int} estacionId -id de la Estacion con elemento asociado
 */
export async function axiosPostUbicacion(datos, urlPost, estacionId) {


    let url = process.env.REACT_APP_URL_SERVICES + urlPost

    let data = {
        "altitud": datos.altitud,
        "longitud": datos.longitud,
        "latitud": datos.latitud,
        "nombre": datos.nombre,
        "idBarrio": (datos.idBarrio ? datos.idBarrio : null),
        "idVereda": (datos.idVereda ? datos.idVereda : null),
        "direccion": (datos.direccion ? datos.direccion : null),
        "descripcion": (datos.descripcion ? datos.descripcion : null)
    }

    


    await axios.post(url, data
    ).then(response => {


        if (response.data.error) {
            response.data.columnas.forEach((columna) => {
                //setFieldError(columna.nombre, columna.mensaje);
            })
        } else {
            
            let idUbicacion = response.data.data.idUbicacion    
            //alert(idUbicacion)       
            axiosGetUbicacionEstacion(estacionId, idUbicacion)
        }


    }).catch(error => {
        if (error) {          
            toast.error("Problemas con el servidor")
        }
    });

}

/**
 * *Guarda la ubicacionEstacion
 * @param {int} ubicacionId -id de la ubicacion
 * @param {int} estacionId -id de la estacion
 */
export async function guardarRompimientoUbicacionEstacion(ubicacionId, estacionId) {

    let url = process.env.REACT_APP_URL_SERVICES + '/ubicacionEstacion/';
    let datos = { 'idEstacion': parseInt(estacionId), 'idUbicacion': ubicacionId }
    
    await axios.post(url, datos, { timeout: 2000 })
        .then(response => {
          
            if (!response.data.error) {
                toast.success("Se guardo ubicacionEstacion correctamente")
            } else {
                toast.error("Error del servidor")
            }
        })
}


/**
 * *Actualiza una ubicacionEstacion
 * @param {int} ubicacionId -id de la ubicacion
 * @param {int} estacionId -id de la estacion
 * @param {int} idUbicacionEstacion -id de la ubicacionEstacion
 */
export async function updateRompimientoUbicacionEstacion(ubicacionId, estacionId, idUbicacionEstacion) {

    let url = process.env.REACT_APP_URL_SERVICES + '/ubicacionEstacion/';
    let datos = { 'idUbicacionEstacion': idUbicacionEstacion, 'idEstacion': parseInt(estacionId), 'idUbicacion': ubicacionId }
    
    await axios.put(url, datos, { timeout: 2000 })
        .then(response => {
          
            if (!response.data.error) {
                toast.success("Se actualizo ubicacionEstacion correctamente")
            } else {
                toast.error("Error del servidor")
            }
        })
}

/**
 * 
 * @param {object} datos -objeto con los datos a actualizar
 * @param {string} urlPut -url de la api para actualizar un elemento asociado 
 * @param {int} idEstacion -id de la estacion asociada
 */
export async function axiosPutIndividual(datos, urlPut, idEstacion) {

   // alert("axiosputindivual")

    urlPut = process.env.REACT_APP_URL_SERVICES + urlPut


    await axios.put(urlPut, datos, { timeout: 2000 }
    ).then(response => {

        //console.log("holaaaaaaaaaaaaaaaaaaa", response)
        if (response.data.error) {
            response.data.columnas.forEach((columna) => {
                //setFieldError(columna.nombre, columna.mensaje);
            })

        } else {
            //confirmiar y redirigir    

            axiosGetUbicacionEstacion(idEstacion, datos.idUbicacion);
            toast.success(response.data.mensaje)
            setTimeout(() => {
                // history.push(urlRetorno) 
            }, 1000)
            return response;
        }



    }).catch(error => {
        if (error) {
            toast.error("Problemas con el servidor")
        }
    });

}


/**
 * *Consulta la existencia de una ubicacionEstacion y redirige a acutalizar este elemento
 * @param {int} idEstacion -id de la estacion
 * @param {int} idUbicacion -id de la ubicacion
 */
export async function axiosGetUbicacionEstacion(idEstacion, idUbicacion) {

    let url = process.env.REACT_APP_URL_SERVICES + 'ubicacionEstacion/estacion/' + idEstacion;
   
    //const response = await axios.get(url).then(response => {
        await axios.get(url).then(response => {


        if (response.data.mensaje === "El idEstacion no ha sido encontrado") {
            guardarRompimientoUbicacionEstacion(idUbicacion, idEstacion)
        } else if (response.data.mensaje === "El elemento ha sido encontrado con éxito.") {
            let idUbicacionEstacion = response.data.data.idUbicacionEstacion
            updateRompimientoUbicacionEstacion(idUbicacion, idEstacion, idUbicacionEstacion)
        }

    }).catch(error => {
        if (error) {            
            toast.error("Problemas con el servidor")
            return error
        }
    }).finally(() => {
        return false
    });
    


}

/**
 * *Verifica que exista un componenteEstacion , sensorEstacion, etc(retorna true o false)
 * @param {object} datos -objeto con datos para validar que exista relacion (componenteEstacion)
 * @param {string} url -url
 * @returns boolean - si ya existe retorna un true
 */
export async function validarExistencia(datos, url, nombreId){

    const data = await axios(url)
    const dataF = data.data.data
  
    let result = false;

    dataF.map(registro => {

        //eslint-disable-next-line
        if(registro.idEstacion == datos.idEstacion && registro[nombreId] == datos[nombreId] && registro.estado=="A"){
            result = true;
        }

        return(result)
        
    })

    return result

}


export async function axiosDesasignarElemento( url, data) {

    try {
        const eliminado = await axios.put(url, data);
        if (eliminado.data) {
            toast.success(eliminado.data.mensaje)
        }

        
    } catch (error) {
    }

}