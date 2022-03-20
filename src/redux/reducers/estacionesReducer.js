import { CLEAR_ESTACION_ACTUAL, FETCH_ESTACION_ACTUAL, FETCH_LISTADO_ESTACIONES, POST_NUEVA_ESTACION } from "../types";

const initialState={
    idEstacion:'',
    nombre:'',
    ip:'',
    nombreCorto:'',
    idJardin:'',
    jardin:'',
    altura:'',
    codigo:'',
    alimentacionElectrica:'',
    tieneVenteo:'',
    tieneLucesObstruccion:'',
    tieneDisyuntor:'',
    tieneTierra:''     
}

export default function estacionesReducer (state = initialState, action){


    //alert(`este es el actio.type ${action.type}`)
    switch (action.type) {
        case FETCH_LISTADO_ESTACIONES:            
            return{
                ...state,
                state: action.payload
            }
        case POST_NUEVA_ESTACION:     
        console.log(action.payload)    
        console.log(state.state)   
            return{
                ...state,
                state: [...state.state, action.payload]
            }
        
            
        //     break;
        // case FETCH_PRODUCTS:
        // // alert("holaaa")
        // return{
        //     ...state,
        //     products: action.payload
        // }
        
        // break;
        // case PRUEBA:
          


        //     return state
        //     break;
        // case ACTUALIZAR_MUNICIPIO:
        //     return {
        //         ...state,
        //         municipio : action.payload
        //     }
    
        default:
            return state
            break;
    }
}

export function estacionActualReducer(state = {}, action){
    switch (action.type) {
        case FETCH_ESTACION_ACTUAL:
            return{
                ...state,
                state: action.payload
            }
        case CLEAR_ESTACION_ACTUAL:   
        alert("entramos en clear estacion actual")
        console.log(action.payload)    
        console.log(state.state)   
            return{
                state :state.state = initialState
            }
        default:
            return state
            break;
    }
}