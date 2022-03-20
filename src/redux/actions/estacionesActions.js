import {  CLEAR_ESTACION_ACTUAL, FETCH_ESTACION_ACTUAL, FETCH_LISTADO_ESTACIONES,  POST_NUEVA_ESTACION } from "../types"
import axios from "axios";
//import fakeStoreApi from "../../apis/fakeStoreApi";
import EstacionesService from "../../services/EstacionesService";
import { toast } from 'react-toastify';
//import { useHistory } from "react-router-dom";


export const fetch_listado_estaciones = () => async (dispatch) => {
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES+"estacion");    
    dispatch({ type: FETCH_LISTADO_ESTACIONES, payload: response.data.data });
};

export const fetch_estacion_actual = (idEstacion) => async (dispatch) => {
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES + "estacion/" + idEstacion);    
    dispatch({ type: FETCH_ESTACION_ACTUAL, payload: response.data.data });
};

export const clear_estacion_actual = () => async (dispatch) => {
    //const response = await axios.get(process.env.REACT_APP_URL_SERVICES + "estacion/" + idEstacion);    
    dispatch({ type: CLEAR_ESTACION_ACTUAL});
};


export const post_nueva_estacion = (estacion, setFieldError, urlRetorno, history) => async (dispatch) => {
    const response = await axios.post(process.env.REACT_APP_URL_SERVICES+"estacion/", estacion)
    .then(response => {
        
        //Devolver si hay error de llave duplicada
        if (response.data.error) {
            response.data.columnas.forEach((columna) => {
                setFieldError(columna.nombre, columna.mensaje);
            })

        } else {
            //Sacar nuevo id, mostrar mensaje de exito y redireccionar
            estacion.idEstacion=response.data.data.idEstacion;                     
            toast.success(response.data.mensaje)
            setTimeout(() => {
                history.push(urlRetorno)               
            }, 1000)

        }
       
        //Problemas al tratar de guardar
    }).catch(error => {
        if (error) {            
            toast.error("Problemas con el servidor, error : " + error)
        }
    });

    //LLamar al reducer para actualizar el state
    dispatch({type: POST_NUEVA_ESTACION, payload: estacion})
};



// export const fetch_listado_estaciones2 =  (url) =>{

//     return async function (dispatch, getState){
//         alert("entramos actions con url " + url);
//         //const response = await axios.get("/products");
//         const response = await axios.get(process.env.REACT_APP_URL_SERVICES + url)
//         .then(response => {
//             console.log("entramos actions con response " + JSON.stringify(response.data));
//             dispatch({
//                 type: FETCH_LISTADO_ESTACIONES,
//                 payload: response.data.data
//             })
//         }
//         )
//         .catch(error => {
//             alert("entramos actions con error " + error);
//             throw error
//         })
//     }

    
// }

// export const fetch_products =  () => async (dispatch) =>{

   
//         //const response = await axios.get("/products");
//         const response = await fakeStoreApi.get("/products");
//         dispatch({type:FETCH_PRODUCTS, payload:response.data})
    
    
// }



// const actualizar_municipio = (municipio) =>({
//     type: ACTUALIZAR_MUNICIPIO,
//     payload : municipio
// })

// export const getEstaciones = () => {
    
//     return dispatch => {
//         EstacionesService.list().then(data => {
//             dispatch({
//                 type: FETCH_LISTADO_ESTACIONES,
//                 payload: data.data
//             })
//         })
       
//     }
// }


// export { actualizar_municipio}