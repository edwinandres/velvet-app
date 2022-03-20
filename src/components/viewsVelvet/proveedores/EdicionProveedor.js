import React from 'react';
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioProveedor from './FormularioProveedor'

class EdicionProveedor extends React.Component {

    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Edicion Proveedor"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioProveedor
                            urlService={process.env.REACT_APP_URL_SERVICES + '/proveedor/'}
                            urlRetorno={'/proveedor/'}
                            id={this.props.match.params.id}
                            nombreId={"idProveedor"}
                            encabezado={'Edicion'}
                        />
                    </div>
                </section>
            </div>
        )
    }
}
 
export default EdicionProveedor;