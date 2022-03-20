import { FETCH_LISTADO_TIPOS_NOSENSOR } from "../types"

const initialState = {
    listadoTiposNoSensor: [],
    tipoNoSensorActual: {},
}

export default function tiposNoSensorReducer(state = initialState, action){
    switch (action.type){
        case FETCH_LISTADO_TIPOS_NOSENSOR:
            return{
                ...state,
                listadoTiposNoSensor: action.payload
            }
        default:
            return state
    }
}