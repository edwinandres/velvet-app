import React from 'react'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioCliente from './FormularioCliente'

class RegistroCliente extends React.Component
{
    render ()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Registro Cliente"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioCliente
                            urlService={process.env.REACT_APP_URL_SERVICES + '/cliente/'}
                            urlRetorno={'/cliente/'}
                            encabezado={'Registro'}
                        />              
                    </div>
                </section>
            </div>
        )
    }
}

export default RegistroCliente;
