import React from 'react';
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioUsuario from './FormularioUsuario'

class EdicionUsuario extends React.Component {

    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Edicion Usuario"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioUsuario
                            urlService={process.env.REACT_APP_URL_SERVICES + '/usuario/'}
                            urlRetorno={'/usuario/'}
                            id={this.props.match.params.id}
                            nombreId={"idUsuario"}
                            encabezado={'Edicion'}
                        />
                    </div>
                </section>
            </div>
        )
    }
}
 
export default EdicionUsuario;