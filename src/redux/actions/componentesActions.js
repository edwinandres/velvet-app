import { FETCH_COMPONENTE_ACTUAL, 
    //FETCH_COMPONENTE_NUEVO, 
    FETCH_LISTADO_COMPONENTES } from "../types"
import axios from "axios";
import { toast } from "react-toastify";



export const fetch_listado_componentes = () => async (dispatch) => {      
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES+"componente/");    
    dispatch({ type: FETCH_LISTADO_COMPONENTES, payload: response.data.data });
};



export const fetch_componente_actual = (id=0) => async (dispatch) => {
    if(id==0){        
        dispatch({ type: FETCH_COMPONENTE_ACTUAL, payload: {'nombre':'','referencia':'','serial':'','idGarantia':'', 'idMarca':'', 'idTipoComponente':'','idCartera':'','consecutivoSC':'','codigoAMVA':'','codigoSIATA':'','descripcion':''} });
    }else{
        const response = await axios.get(process.env.REACT_APP_URL_SERVICES+"componente/" + id);  
       Object.entries(response.data.data).forEach(([key, value]) => {
            if (value == null) {
                response.data.data[key] = '';
            }
          });
        console.log(response.data.data, "esto es el response.data.data");
        dispatch({ type: FETCH_COMPONENTE_ACTUAL, payload: response.data.data });
    }
    
}

export const update_componente_actual = (componente, setFieldError, history) => async (dispatch) => {
    const response = await axios.put(process.env.REACT_APP_URL_SERVICES+"componente/" , componente)

    .then(response => {
        
        //Devolver si hay error de llave duplicada
        if (response.data.error) {
            response.data.columnas.forEach((columna) => {
                setFieldError(columna.nombre, columna.mensaje);
            })

        } else {
            //Sacar nuevo id, mostrar mensaje de exito y redireccionar
            //estacion.idEstacion=response.data.data.idEstacion;                     
            toast.success(response.data.mensaje)
            setTimeout(() => {
               history.goBack();
               dispatch(fetch_listado_componentes());
            }, 1000)

        }
       
        //Problemas al tratar de guardar
    }).catch(error => {
        if (error) {            
            toast.error("Problemas con el servidor, error : " + error)
        }
    });

    dispatch({ type: FETCH_COMPONENTE_ACTUAL, payload: {'nombre':'','referencia':'','serial':'','idGarantia':'', 'idMarca':'', 'idTipoComponente':'','idCartera':'','consecutivoSC':'','codigoAMVA':'','codigoSIATA':'','descripcion':''} });
}

export const create_componente_actual = (componente, setFieldError, history) => async (dispatch) => {
    const response = await axios.post(process.env.REACT_APP_URL_SERVICES+"componente/" , componente)

    .then(response => {
        
        //Devolver si hay error de llave duplicada
        if (response.data.error) {
            response.data.columnas.forEach((columna) => {
                setFieldError(columna.nombre, columna.mensaje);
            })

        } else {
            //Sacar nuevo id, mostrar mensaje de exito y redireccionar
            //estacion.idEstacion=response.data.data.idEstacion;                     
            toast.success(response.data.mensaje)
            setTimeout(() => {
                dispatch(fetch_listado_componentes());
               history.goBack();               
               //dispatch({type: FETCH_LISTADO_COMPONENTES})
            }, 1000)

        }
       
        //Problemas al tratar de guardar
    }).catch(error => {
        if (error) {            
            toast.error("Problemas con el servidor, error : " + error)
        }
    });

    dispatch({ type: FETCH_COMPONENTE_ACTUAL, payload: {'nombre':'','referencia':'','serial':'','idGarantia':'', 'idMarca':'', 'idTipoComponente':'','idCartera':'','consecutivoSC':'','codigoAMVA':'','codigoSIATA':'','descripcion':''} });
}


