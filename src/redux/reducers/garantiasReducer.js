import { FETCH_LISTADO_GARANTIAS } from "../types"

const initialState={
    listadoGarantias:[],
    garantiaActual:{},
}

export default function garantiasReducer(state=initialState, action){
    
    switch (action.type) {
        case FETCH_LISTADO_GARANTIAS:
            return{
                ...state,
                listadoGarantias: action.payload
            }

        default:
            return state
    }
}