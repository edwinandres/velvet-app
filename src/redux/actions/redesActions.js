import { FETCH_LISTADO_REDES } from "../types"
import axios from "axios";



export const fetch_listado_redes = () => async (dispatch) => {    
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES+"/red");      
    dispatch({ type: FETCH_LISTADO_REDES, payload: response.data.data });
};

