import { FETCH_LISTADO_MARCAS } from "../types";
import axios from "axios";

export const fetch_listado_marcas = () => async(dispatch) => {
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES+"/base/marca");
    dispatch({ type: FETCH_LISTADO_MARCAS, payload: response.data.data})
}

