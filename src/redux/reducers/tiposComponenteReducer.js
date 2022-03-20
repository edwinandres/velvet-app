import { FETCH_LISTADO_TIPOS_COMPONENTE } from "../types"

const initialState = {
    listadoTiposComponente: [],
    tipoComponenteActual: {},
}

export default function tiposComponenteReducer(state = initialState, action){
    switch (action.type){
        case FETCH_LISTADO_TIPOS_COMPONENTE:
            return{
                ...state,
                listadoTiposComponente: action.payload
            }
        default:
            return state
    }
}