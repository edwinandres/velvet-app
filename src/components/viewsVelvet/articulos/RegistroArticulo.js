import React from 'react'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioArticulo from './FormularioArticulo'

class RegistroArticulo extends React.Component
{
    render ()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Registro Articulo"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioArticulo
                            urlService={process.env.REACT_APP_URL_SERVICES + '/articulo/'}
                            urlRetorno={'/articulo/'}
                            encabezado={'Registro'}
                        />              
                    </div>
                </section>
            </div>
        )
    }
}

export default RegistroArticulo;
