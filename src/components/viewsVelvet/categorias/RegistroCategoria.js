import React from 'react'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import FormularioCategoria from './FormularioCategoria'

class RegistroCategoria extends React.Component
{
    render ()
    {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                    <ContentHeaderComponent mainTitle={"Registro Categoria"}></ContentHeaderComponent>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">                        
                        <FormularioCategoria
                            urlService={process.env.REACT_APP_URL_SERVICES + '/categoria/'}
                            urlRetorno={'/categoria/'}
                            encabezado={'Registro'}
                        />              
                    </div>
                </section>
            </div>
        )
    }
}

export default RegistroCategoria;
