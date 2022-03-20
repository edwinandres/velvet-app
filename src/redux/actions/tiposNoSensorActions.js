import { FETCH_LISTADO_TIPOS_NOSENSOR } from "../types";
import axios from "axios";


export const fetch_listado_tipos_noSensor = () => async (dispatch) => {
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES + "/base/tipoNoSensor");
    dispatch({ type: FETCH_LISTADO_TIPOS_NOSENSOR, payload: response.data.data });
}