import { FETCH_LISTADO_REDES } from "../types";

const initialState={
    idAlimentacion:'',
    nombre:'',
        
}

export default function redesReducer (state = initialState, action){
    //alert(`este es el actio.type ${action.type}`)
    switch (action.type) {
        case FETCH_LISTADO_REDES:            
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