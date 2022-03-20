import { FETCH_LISTADO_ESTACIONES, FETCH_LISTADO_JARDINES } from "../types";

const initialState={
    idJardin:'',
    nombre:'',
        
}

export default function jardinesReducer (state = initialState, action){
    //alert(`este es el actio.type ${action.type}`)
    switch (action.type) {
        case FETCH_LISTADO_JARDINES:            
            return{
                ...state,
                state: action.payload
            }
            
            break;
       
    
        default:
            return state
            break;
    }
}