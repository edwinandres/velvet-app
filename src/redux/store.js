import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ultimasFotosReducer from "./reducers/ultimasFotosReducer";
import thunk from "redux-thunk";
import estacionesReducer, { estacionActualReducer } from "./reducers/estacionesReducer";
import jardinesReducer from "./reducers/jardinesReducer";
import alimentacionesReducer from "./reducers/alimentacionesReducer";
import redesReducer from "./reducers/redesReducers";
import componentesReducer from "./reducers/componentesReducer";
import marcasReducer from "./reducers/marcasReducer";
import tiposComponenteReducer from "./reducers/tiposComponenteReducer";
import garantiasReducer from "./reducers/garantiasReducer";
import carterasReducer from "./reducers/carterasReducer";
import noSensoresReducer from "./reducers/noSensoresReducer";
import tiposNoSensorReducer from "./reducers/tiposNoSensorReducer";
import mueblesReducer from "./reducers/mueblesReducer";
import consumiblesReducer from "./reducers/consumiblesReducer";

const reducers = combineReducers({ 
    muebles: mueblesReducer,
    consumibles: consumiblesReducer,  
    tiposNoSensor : tiposNoSensorReducer,
    noSensores : noSensoresReducer,
    carteras: carterasReducer,
    garantias: garantiasReducer,
    garantias : garantiasReducer,
    tiposComponente: tiposComponenteReducer,
    marcas: marcasReducer,
    componentes :componentesReducer,
    listadoEstaciones: estacionesReducer,
    estacion :estacionActualReducer,
    listadoJardines: jardinesReducer,
    listadoAlimentaciones: alimentacionesReducer,
    listadoRedes: redesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

export default store