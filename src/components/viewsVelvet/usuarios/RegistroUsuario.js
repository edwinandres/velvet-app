import React from 'react'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioUsuario from './FormularioUsuario'

class RegistroUsuario extends React.Component
{
    render ()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Registro Usuario"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioUsuario
                            urlService={process.env.REACT_APP_URL_SERVICES + '/usuario/'}
                            urlRetorno={'/usuario/'}
                            encabezado={'Registro'}
                        />              
                    </div>
                </section>
            </div>
        )
    }
}

export default RegistroUsuario;
