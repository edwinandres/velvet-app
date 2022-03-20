import React, { useEffect } from 'react'
//import LogRocket from 'logrocket';
import { Route } from 'react-router-dom';
import '../src/assets/css/common/scrollbarStyle.css'

import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'



//---------------------------------------------------------------
import IndexArticulo from './components/viewsVelvet/articulos/IndexArticulo';
import DetalleArticulo from './components/viewsVelvet/articulos/DetalleArticulo';
import RegistroArticulo from './components/viewsVelvet/articulos/RegistroArticulo';
import EdicionArticulo from './components/viewsVelvet/articulos/EdicionArticulo';

import IndexCategoria from './components/viewsVelvet/categorias/IndexCategoria';
import DetalleCategoria from './components/viewsVelvet/categorias/DetalleCategoria';
import RegistroCategoria from './components/viewsVelvet/categorias/RegistroCategoria';
import EdicionCategoria from './components/viewsVelvet/categorias/EdicionCategoria';

import IndexCliente from './components/viewsVelvet/clientes/IndexCliente';
import DetalleCliente from './components/viewsVelvet/clientes/DetalleCliente';
import RegistroCliente from './components/viewsVelvet/clientes/RegistroCliente';
import EdicionCliente from './components/viewsVelvet/clientes/EdicionCliente';

import IndexFactura from './components/viewsVelvet/facturas/IndexFactura';
import DetalleFactura from './components/viewsVelvet/facturas/DetalleFactura';
import RegistroFactura from './components/viewsVelvet/facturas/RegistroFactura';
import EdicionFactura from './components/viewsVelvet/facturas/EdicionFactura';

import IndexProveedor from './components/viewsVelvet/proveedores/IndexProveedor';
import DetalleProveedor from './components/viewsVelvet/proveedores/DetalleProveedor';
import RegistroProveedor from './components/viewsVelvet/proveedores/RegistroProveedor';
import EdicionProveedor from './components/viewsVelvet/proveedores/EdicionProveedor';

import IndexUsuario from './components/viewsVelvet/usuarios/IndexUsuario';
import DetalleUsuario from './components/viewsVelvet/usuarios/DetalleUsuario';
import RegistroUsuario from './components/viewsVelvet/usuarios/RegistroUsuario';
import EdicionUsuario from './components/viewsVelvet/usuarios/EdicionUsuario';




import { useDispatch, useSelector } from 'react-redux';
import { fetch_listado_componentes } from './redux/actions/componentesActions';
import { fetch_listado_marcas } from './redux/actions/marcasActions';
import { fetch_listado_tipos_componente } from './redux/actions/tiposComponenteActions';
import { fetch_listado_garantias } from './redux/actions/garantiasActions';
import { fetch_listado_carteras } from './redux/actions/carterasActions';
import { fetch_listado_noSensores } from './redux/actions/noSensoresActions';
import { fetch_listado_tipos_noSensor } from './redux/actions/tiposNoSensorActions';






const App = () => {

    const componentes = useSelector(state => state.componentes)
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(fetch_listado_componentes())
        // dispatch(fetch_listado_marcas())   
        // dispatch(fetch_listado_tipos_componente())    
        // dispatch(fetch_listado_tipos_noSensor())    
        // dispatch(fetch_listado_garantias()) 
        // dispatch(fetch_listado_carteras())
        // dispatch(fetch_listado_noSensores())
    }, [dispatch])

    
        // LogRocket.init('tzrios/sisat');
        return (
            <div>



                {/* HEADER Y MENU */}
                <Route path={['/']}component={Header} />
                <Route path={['/']} component={Menu} />
               
             

                <Route exact path="/usuarios/" component={IndexUsuario} />
                <Route exact path="/clientes/" component={IndexCliente} />
                <Route exact path="/proveedores/" component={IndexProveedor} />
                <Route exact path="/categorias/" component={IndexCategoria} />
                <Route exact path="/articulos/" component={IndexArticulo} />
                {/* <Route exact path="/venta/" component={IndexVenta} /> */}
                <Route exact path="/facturas/" component={IndexFactura} />

                {/* VER DETALLE */}
                <Route exact path="/usuario/ver/:id" component={DetalleUsuario} />
                <Route exact path="/cliente/ver/:id" component={DetalleCliente} />
                <Route exact path="/proveedor/ver/:id" component={DetalleProveedor} />
                <Route exact path="/categoria/ver/:id" component={DetalleCategoria} />
                <Route exact path="/articulo/ver/:id" component={DetalleArticulo} />
                {/* <Route exact path="/venta/ver/:id" component={DetalleVenta} /> */}
                <Route exact path="/factura/ver/:id" component={DetalleFactura} />

                {/* REGISTRO */}
                <Route exact path="/usuario/registrar/" component={RegistroUsuario} />
                <Route path="/cliente/registrar/" component={RegistroCliente} />
                <Route path="/proveedor/registrar/" component={RegistroProveedor} />
                <Route path="/categoria/registrar/" component={RegistroCategoria} />
                <Route path="/articulo/registrar/" component={RegistroArticulo} />
                {/* <Route path="/venta/registrar/" component={RegistroVenta} /> */}
                <Route path="/factura/registrar/" component={RegistroFactura} />
                
             
                {/* EDICION */}
                <Route path="/usuario/editar/:id" component={EdicionUsuario} />
                <Route path="/cliente/editar/:id" component={EdicionCliente} />
                <Route path="/proveedor/editar/:id" component={EdicionProveedor} />
                <Route path="/categoria/editar/:id" component={EdicionCategoria} />
                <Route path="/articulo/editar/:id" component={EdicionArticulo} />
                {/* <Route path="/venta/editar/:id" component={EdicionVenta} /> */}
                <Route path="/factura/editar/:id" component={EdicionFactura} />               

                {/* FOOTER */}
                <Route path='/' component={Footer} />

            </div>
        );
    
}

export default App;
