import { ACTUALIZAR_MUNICIPIO, FETCH_PRODUCTS, FETCH_ULTIMAS_FOTOS_CAMARAS, PRUEBA } from "../types";

const initialState={
    ultimasFotos:[{name:"hola",title:"1"}, {name:"jaj", title:"2"}],
    municipio: "medellin",
    products :[]
}

export default function ultimasFotosReducer (state = initialState, action){
    //alert(`este es el actio.type ${action.type}`)
    switch (action.type) {
        case FETCH_ULTIMAS_FOTOS_CAMARAS:
           // alert("holaaa")
            return{
                ...state,
                ultimasFotos: action.payload
            }
            
            break;
        case FETCH_PRODUCTS:
        // alert("holaaa")
        return{
            ...state,
            products: action.payload
        }
        
        break;
        case PRUEBA:
          


            return state
            break;
        case ACTUALIZAR_MUNICIPIO:
            return {
                ...state,
                municipio : action.payload
            }
    
        default:
            return state
            break;
    }
}