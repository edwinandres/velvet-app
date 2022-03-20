import { FETCH_LISTADO_GARANTIAS } from "../types";
import axios from "axios";

export const fetch_listado_garantias = () => async (dispatch) => {
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES + "/garantia");
    dispatch({ type: FETCH_LISTADO_GARANTIAS, payload: response.data.data });
}