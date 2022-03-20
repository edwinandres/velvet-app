import { FETCH_LISTADO_ALIMENTACIONES } from "../types";

const initialState={
    idAlimentacion:'',
    nombre:'',
        
}

export default function alimentacionesReducer (state = initialState, action){
    //alert(`este es el actio.type ${action.type}`)
    switch (action.type) {
        case FETCH_LISTADO_ALIMENTACIONES:            
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