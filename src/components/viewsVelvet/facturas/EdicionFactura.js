import React from 'react';
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioFactura from './FormularioFactura'

class EdicionFactura extends React.Component {

    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Edicion Factura"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioFactura
                            urlService={process.env.REACT_APP_URL_SERVICES + '/factura/'}
                            urlRetorno={'/factura/'}
                            id={this.props.match.params.id}
                            nombreId={"idFactura"}
                            encabezado={'Edicion'}
                        />
                    </div>
                </section>
            </div>
        )
    }
}
 
export default EdicionFactura;