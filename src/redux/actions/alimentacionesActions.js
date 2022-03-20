import { FETCH_LISTADO_ALIMENTACIONES } from "../types"
import axios from "axios";



export const fetch_listado_alimentaciones = () => async (dispatch) => {    
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES+"/base/alimentacionElectrica");      
    dispatch({ type: FETCH_LISTADO_ALIMENTACIONES, payload: response.data.data });
};

