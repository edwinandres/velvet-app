import React from 'react';
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioCategoria from './FormularioCategoria'

class EdicionCategoria extends React.Component {

    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Edicion Categoria"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioCategoria
                            urlService={process.env.REACT_APP_URL_SERVICES + '/categoria/'}
                            urlRetorno={'/categoria/'}
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
 
export default EdicionCategoria;