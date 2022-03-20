import { FETCH_CONSUMIBLE_ACTUAL, 
    //FETCH_COMPONENTE_NUEVO, 
    FETCH_LISTADO_CONSUMIBLES } from "../types";

const initialState={
    listadoConsumibles:[],
    consumibleActual:{},
    consumibleNuevo:{'nombre':'','referencia':'','serial':'','idGarantia':'',      
     'idTipoConsumible':'','cartera':'','consecutivoSC':'','codigoSIATA':''}
        
}

 
   
export default function consumiblesReducer (state = initialState, action){
    
        
    switch (action.type) {
        case FETCH_LISTADO_CONSUMIBLES:           
            
          
            return{
                ...state,
                listadoConsumibles: action.payload
            }        
       
        case FETCH_CONSUMIBLE_ACTUAL:
           //alert(JSON.stringify(action.payload))
                
            return{
                ...state,
                consumibleActual : action.payload
            }

   
    
        default:
            return state
            break;
    }
}