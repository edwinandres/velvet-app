import React from 'react'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioProveedor from './FormularioProveedor'

class RegistroProveedor extends React.Component
{
    render ()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Registro Proveedor"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioProveedor
                            urlService={process.env.REACT_APP_URL_SERVICES + '/proveedor/'}
                            urlRetorno={'/proveedor/'}
                            encabezado={'Registro'}
                        />              
                    </div>
                </section>
            </div>
        )
    }
}

export default RegistroProveedor;
