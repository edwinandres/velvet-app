import { FETCH_LISTADO_CARTERAS } from "../types";

const initialState = {
    listadoCarteras: [],
    carteraActual: {},
}

export default function carterasReducer(state = initialState, action ){
    switch( action.type){
        case FETCH_LISTADO_CARTERAS:
            return{
                ...state,
                listadoCarteras: action.payload
            }
        default:
            return state;
    }
}