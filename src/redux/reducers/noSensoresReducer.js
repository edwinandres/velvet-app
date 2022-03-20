import { FETCH_NOSENSOR_ACTUAL, 
    //FETCH_COMPONENTE_NUEVO, 
    FETCH_LISTADO_NOSENSORES } from "../types";

const initialState={
    listadoNoSensores:[],
    noSensorActual:{},
    noSensorNuevo:{'idNoSensor':'','nombre':'','codigoAMVA':'',
    'serial':'','referencia':'','marca':'', 'tipoNoSensor':'','cartera':''}
        
}
  
   
export default function noSensoresReducer (state = initialState, action){
   
    
        
    switch (action.type) {
       
        case FETCH_LISTADO_NOSENSORES:           
            
          
            return{
                ...state,
                listadoNoSensores: action.payload
            }        
       
        case FETCH_NOSENSOR_ACTUAL:          
        
       
            return{
                ...state,
                noSensorActual : action.payload
            }

   
    
        default:
            return state
            break;
    }
}