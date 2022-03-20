import React from 'react';
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioCliente from './FormularioCliente'

class EdicionCliente extends React.Component {

    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Edicion Cliente"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioCliente
                            urlService={process.env.REACT_APP_URL_SERVICES + '/Cliente/'}
                            urlRetorno={'/Cliente/'}
                            id={this.props.match.params.id}
                            nombreId={"id"}
                            encabezado={'Edicion'}
                        />
                    </div>
                </section>
            </div>
        )
    }
}
 
export default EdicionCliente;