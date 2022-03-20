import { FETCH_MUEBLE_ACTUAL, 
    //FETCH_COMPONENTE_NUEVO, 
    FETCH_LISTADO_MUEBLES } from "../types";

const initialState={
    listadoMuebles:[],
    muebleActual:{},
    muebleNuevo:{'nombre':'','referencia':'','serial':'','idGarantia':'',
       
     'idTipoComponente':'','cartera':'','consecutivoSC':'','codigoAMVA':'','codigoSIATA':''}
        
}
  
   
export default function mueblesReducer (state = initialState, action){
    
        
    switch (action.type) {
        case FETCH_LISTADO_MUEBLES:           
            
          
            return{
                ...state,
                listadoMuebles: action.payload
            }        
       
        case FETCH_MUEBLE_ACTUAL:
           
                
            return{
                ...state,
                muebleActual : action.payload
            }

   
    
        default:
            return state
            break;
    }
}