import { FETCH_LISTADO_TIPOS_COMPONENTE } from "../types";
import axios from "axios";


export const fetch_listado_tipos_componente = () => async (dispatch) => {
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES + "/base/tipoComponente");
    dispatch({ type: FETCH_LISTADO_TIPOS_COMPONENTE, payload: response.data.data });
}