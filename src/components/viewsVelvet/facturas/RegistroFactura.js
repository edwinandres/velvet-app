import React from 'react'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioFactura from './FormularioFactura'

class RegistroFactura extends React.Component
{
    render ()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Registro Departamento"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioFactura
                            urlService={process.env.REACT_APP_URL_SERVICES + '/factura/'}
                            urlRetorno={'/factura/'}
                            encabezado={'Registro'}
                        />              
                    </div>
                </section>
            </div>
        )
    }
}

export default RegistroFactura;
