import { ACTUALIZAR_MUNICIPIO, FETCH_PRODUCTS, FETCH_ULTIMAS_FOTOS_CAMARAS } from "../types"
import FotosService from "../../services/FotosService"
import axios from "axios";
import fakeStoreApi from "../../apis/fakeStoreApi";


const fotoService =new FotosService();

export const fetch_ultimas_fotos =  (municipio) =>{

    return async function (dispatch, getState){
        //const response = await axios.get("/products");
        const response = await axios.get(process.env.REACT_APP_URL_SERVICES + "portalesDivididos/"+municipio);
        dispatch({type:FETCH_ULTIMAS_FOTOS_CAMARAS, payload:response.data})
    }


    
}

export const fetch_products =  () => async (dispatch) =>{

   
        //const response = await axios.get("/products");
        const response = await fakeStoreApi.get("/products");
        dispatch({type:FETCH_PRODUCTS, payload:response.data})
    
    
}



const actualizar_municipio = (municipio) =>({
    type: ACTUALIZAR_MUNICIPIO,
    payload : municipio
})

export const getFotos = () => {
    
    return dispatch => {
        fotoService.list().then(data => {
            dispatch({
                type: FETCH_ULTIMAS_FOTOS_CAMARAS,
                payload: data.data
            })
        })
       
    }
}


export { actualizar_municipio}