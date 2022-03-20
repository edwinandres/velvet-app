import { FETCH_NOSENSOR_ACTUAL, 
    //FETCH_COMPONENTE_NUEVO, 
    FETCH_LISTADO_NOSENSORES } from "../types"
import axios from "axios";
import { toast } from "react-toastify";



export const fetch_listado_noSensores = () => async (dispatch) => {      
    const response = await axios.get(process.env.REACT_APP_URL_SERVICES+"noSensor/");    
    dispatch({ type: FETCH_LISTADO_NOSENSORES, payload: response.data.data });
};



export const fetch_noSensor_actual = (id=0) => async (dispatch) => {
    
    if(id==0){    
        
        dispatch({ type: FETCH_NOSENSOR_ACTUAL, payload: {'idNoSensor':'','nombre':'','codigoAMVA':'','serial':'','referencia':'','marca':'','idMarca':'','idTipoNoSensor':'', 'tipoNoSensor':'','cartera':''} });
    }else{
        const response = await axios.get(process.env.REACT_APP_URL_SERVICES+"noSensor/" + id);  
       Object.entries(response.data.data).forEach(([key, value]) => {
            if (value == null) {
                response.data.data[key] = '';
            }
          });
        console.log(response.data.data, "esto es el response.data.data");
        dispatch({ type: FETCH_NOSENSOR_ACTUAL, payload: response.data.data });
    }
    
}

export const update_noSensor_actual = (noSensor, setFieldError, history) => async (dispatch) => {
    const response = await axios.put(process.env.REACT_APP_URL_SERVICES+"noSensor/" , noSensor)

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
               dispatch(fetch_listado_noSensores());
            }, 1000)

        }
       
        //Problemas al tratar de guardar
    }).catch(error => {
        if (error) {            
            toast.error("Problemas con el servidor, error : " + error)
        }
    });

    dispatch({ type: FETCH_NOSENSOR_ACTUAL, payload: {'idNoSensor':'','nombre':'','codigoAMVA':'','serial':'','referencia':'','marca':'', 'tipoNoSensor':'','cartera':''} });
}

export const create_noSensor_actual = (noSensor, setFieldError, history) => async (dispatch) => {
    const response = await axios.post(process.env.REACT_APP_URL_SERVICES+"noSensor/" , noSensor)

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
                dispatch(fetch_listado_noSensores());
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

    dispatch({ type: FETCH_NOSENSOR_ACTUAL, payload: {'idNoSensor':'','nombre':'','codigoAMVA':'','serial':'','referencia':'','marca':'', 'tipoNoSensor':'','cartera':''} });
}


