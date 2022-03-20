import React from 'react';
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import CardDetalle from '../../common/CardDetalle'

class DetalleUsuario extends React.Component {   

    render(){    
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Detalle Usuario"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <CardDetalle                            
                            urlService={process.env.REACT_APP_URL_SERVICES + '/usuario/'}
                            encabezado={'Detalle'}                    
                            urlRetorno={'/usuario/'}
                            id={this.props.match.params.id}              
                        />
                    </div>
                </section>
            </div>
        )

    }
}
 
export default DetalleUsuario;

