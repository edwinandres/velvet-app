import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {confirmDelete} from './MySwal'
import {axiosDelete} from './AxiosCrud'
import {TableCRUDContext} from '../../context';

class TrBasicTableCRUD extends React.Component
{  
    static defaultProps = {
        tipoFields : [],
        urlBase : '',
        urlService: '',
        arrayColums: [],
    };

    static contextType = TableCRUDContext;

    constructor(props) {
        super(props);
        this.state = {
                        isDeleting: false,
                        isHidden: false,
                    }
    }

    async deleteData(id, objeto) {

        //alert(`esto es el id ${id} y esto el objeto ${JSON.stringify(objeto)} que llegan a la funcion deleteData`)
         
        const confirmado = await confirmDelete(objeto )
        
        if(confirmado){
            
            axiosDelete(id, this.props.urlService,{data:{[this.props.arrayColums[0]]: id }})
        }

        this.context.reloadDatatable();
    }

    render() {

       // console.log("entra en trbasic", this.props.arrayColums)
        
        
        if (this.state.isHidden) {
            return null;
        }
        const id = this.props.arrayColums[0] 
        const listaTDs = this.props.arrayColums.map((propKey, index) =>{
                                                return (<td
                                                    key={index}
                                                
                                                // key={(this.props.tipoFields[id]!==[])
                                                //     ?alert(this.props.tipoFields[id])
                                                //     :this.props.tipoFields[id]+'-'+index}
                                                    >
                                                    {/*{console.log(propKey, "esto es propkey")}*/}
                                                    {/* {console.log(this.props.tipoFields[propKey], "campo de prueba")} */}
                                                            {/* {(this.props.tipoFields[propKey]===true
                                                                ?"Si"
                                                                :(this.props.tipoFields[propKey]===false
                                                                    ?"No"
                                                                    :this.props.tipoFields[propKey]))} */}

                                                            {(this.props.tipoFields[propKey]===true
                                                                ?"Si"
                                                                :(this.props.tipoFields[propKey]===false
                                                                    ?"No"
                                                                    :(this.props.tipoFields[propKey]===[])
                                                                        ?this.props.tipoFields[propKey].nombre
                                                                        :this.props.tipoFields[propKey]))}
                                                        </td>)
                                            });
                                        
        return (
                
                <tr key={this.props.tipoFields[id]}>
                    {listaTDs}
                    <td className = "all">
                        <div className="btn-group-horizontal col-sm-12 col-xs-12" style={{"display":"flex", "width":"100%"}}>
                            <Link to={this.props.urlBase+'ver/'+this.props.tipoFields[id]} style={{"width":"30%"}} className="btn btn-outline-info mb-2 ml-1" data-toggle="tooltip" title="Ver" ><i className="far fa-eye" /></Link>{' '}
                            <Link to={this.props.urlBase+'editar/'+this.props.tipoFields[id]} style={{"width":"30%"}} className="btn btn-outline-success mb-2 ml-1" data-toggle="tooltip" title="Editar" ><i className="fas fa-edit" /></Link>{' '}
                            {/* {console.log(this.props.tipoFields)} */}
                            <button 
                                onClick={() => this.deleteData(this.props.tipoFields[id], this.props.tipoFields,)} 
                                style={{"width":"30%"}} className="btn btn-outline-danger mb-2 ml-1" 
                                data-toggle="tooltip" 
                                title="Borrar" 
                            >
                                <i className="far fa-trash-alt" style={{"width": "18px"}}></i>
                            </button>
                        </div>
                    </td>
                </tr>
                
                
        );
    }
}

TrBasicTableCRUD.propTypes = {
    tipoFields              : PropTypes.object.isRequired,
    urlBase                 : PropTypes.string.isRequired,
    urlService                 : PropTypes.string.isRequired,
    arrayColums             : PropTypes.array.isRequired,
};

export default TrBasicTableCRUD;
