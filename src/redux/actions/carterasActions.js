import { FETCH_LISTADO_CARTERAS } from "../types";
import axios from "axios";


export const fetch_listado_carteras = () => async (dispatch) => {
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES + "base/cartera");
    dispatch({ type: FETCH_LISTADO_CARTERAS, payload: response.data.data });
}