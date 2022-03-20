import React from 'react'
import {Link} from 'react-router-dom'
import ContentHeaderComponent from '../../common/ContentHeaderComponent'
import BasicTableCRUD from '../../common/BasicTableCRUD'

class IndexCategoria extends React.Component
{   
    static defaultProps = { 
        urlService : process.env.REACT_APP_URL_SERVICES + '/categoria/',
        urlBase : '/categoria/',
        arrayColums: ['idCategoria', 'nombre','descripcion'],
    };    
   
    

    render ()

    {
//console.log(process.env.REACT_APP_URL_SERVICES)
        return (
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                        <ContentHeaderComponent mainTitle={"Categoria"}></ContentHeaderComponent>
                        </div>
                    </section>
                    <section className="content">
                    <div className="container-fluid"></div>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Listado Categorias</h3>
                        </div>
                        <div className="card-body">
                            <div className="row no-print">
                                <div className="col-12">
                                    <Link to={this.props.urlBase+'registrar/'} className="btn btn-success float-right"><i className="fas fa-plus" /> &nbsp;Registrar </Link>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive scrollbarHidden">
                                        <BasicTableCRUD urlService={this.props.urlService} urlBase= {this.props.urlBase} arrayColums= {this.props.arrayColums}></BasicTableCRUD>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>  

        )
    }
}

export default IndexCategoria;