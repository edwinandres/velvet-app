import { FETCH_LISTADO_MARCAS } from "../types"

const initialState = {
    listadoMarcas: [],
    marcaActual: {},
};

export default function marcasReducer(state = initialState, action){

    switch (action.type) {
        case FETCH_LISTADO_MARCAS:           
            return {
                ...state,
                listadoMarcas: action.payload
            }
        // case POST_NUEVA_MARCA:
        //     return {
        //         ...state,
        //         listadoMarcas: [...state.listadoMarcas, action.payload]
        //     }
        // case FETCH_MARCA_ACTUAL:
        //     return {
        //         ...state,
        //         marcaActual: action.payload
        //     }
        // case CLEAR_MARCA_ACTUAL:
        //     return {
        //         ...state,
        //         marcaActual: {}
        //     }
        // case FETCH_ULTIMAS_FOTOS_MARCAS:
        //     return {
        //         ...state,
        //         ultimasFotosMarcas: action.payload
        //     }
        // case PRUEBA:
        //     return {
        //         ...state,
        //         prueba: action.payload
        //     }
        // case ACTUALIZAR_MUNICIPIO:
        //     return {
        //         ...state,
        //         municipio: action.payload
        //     }
        default:
            return state
            break;
    }
}