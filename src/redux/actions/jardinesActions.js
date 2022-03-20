import { FETCH_LISTADO_JARDINES } from "../types"
import FotosService from "../../services/FotosService"
import axios from "axios";
//import fakeStoreApi from "../../apis/fakeStoreApi";
import EstacionesService from "../../services/EstacionesService";


const estacionService =new EstacionesService();

export const fetch_listado_jardines = () => async (dispatch) => {
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES+"jardin");    
    dispatch({ type: FETCH_LISTADO_JARDINES, payload: response.data.data });
};

