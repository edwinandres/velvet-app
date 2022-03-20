import { FETCH_COMPONENTE_ACTUAL, 
    //FETCH_COMPONENTE_NUEVO, 
    FETCH_LISTADO_COMPONENTES } from "../types";

const initialState={
    listadoComponentes:[],
    componenteActual:{},
    componenteNuevo:{'nombre':'','referencia':'','serial':'','idGarantia':'',
       'idMarca':'',
     'idTipoComponente':'','cartera':'','consecutivoSC':'','codigoAMVA':'','codigoSIATA':'','descripcion':''}
        
}


 // const [valoresIniciales, guardarValoresIniciales] = useState({'nombre':'','referencia':'','serial':'','idGarantia':'',
    //   'idMarca':'',
    // 'idTipoComponente':'','cartera':'','consecutivoSC':'','codigoAMVA':'','codigoSIATA':'','descripcion':''})    
   
export default function componentesReducer (state = initialState, action){
    
        
    switch (action.type) {
        case FETCH_LISTADO_COMPONENTES:           
            
          
            return{
                ...state,
                listadoComponentes: action.payload
            }        
        // case FETCH_COMPONENTE_NUEVO:
        //     return{
        //         ...state,
        //         componenteNuevo : initialState.componenteNuevo
        //     }
        case FETCH_COMPONENTE_ACTUAL:
           //alert(JSON.stringify(action.payload))
                
            return{
                ...state,
                componenteActual : action.payload
            }

   
    
        default:
            return state
            break;
    }
}