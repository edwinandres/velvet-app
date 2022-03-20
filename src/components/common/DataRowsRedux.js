import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import deleteDivision from '../helpers/swalDelete'
import editItem from '../helpers/editItem'
import Spinner from './Spinner';
//import useGetData from './hooks/useGetData';
import $ from 'jquery'
import SweetAlert from 'react-bootstrap-sweetalert';
import FormularioCartera from '../views/cartera/FormularioCartera';
import FormularioEstacion from '../views/estacion/FormularioEstacion';
import EdicionEstacion from '../views/estacion/EdicionEstacion';
import { confirmDelete } from './MySwal';
import { axiosDeleteRedux } from './AxiosCrud';



const DataRowsRedux = ({ data, columnas, objeto, donde="normal" }) => {


    //console.log(`esto es la data obtenida en ${donde}: ${JSON.stringify(data)}`)

    const  deleteData = async(id, elemento) =>{

        console.log(`esto es el id ${id} y esto el objeto ${JSON.stringify(objeto)} que llegan a la funcion deleteData`)
       
         
        const confirmado = await confirmDelete(elemento)

        console.log(`esto es elemento ${JSON.stringify(elemento)} y esto es confirmado ${confirmado}`)
        let claves = []
        let nombreDelId = Object.keys(elemento)[0]
        claves.push(Object.keys(elemento)[0])
        console.log(`esto es nombredelid ${nombreDelId}`)
        //console.log(`esto es claves ${JSON.stringify(claves)}`)
       //console.log(Object.keys(elemento) +"esto son las keys de elemento")
        
        if(confirmado){
            const url = `${process.env.REACT_APP_URL_SERVICES+objeto}/`
            elemento = {data:{[nombreDelId]: id }}
            axiosDeleteRedux(id, url,elemento)
        }

        //this.context.reloadDatatable();
    }

    


    //str para el id dinamico ej: idSensor, idComponente...  => id+str
    let str = objeto.charAt(0).toUpperCase() + objeto.slice(1)
    //console.log(`str: ${str}`)
    let element
    const [alert, setAlert] = useState(false)


    const fire = ( ) => {
       // e.preventDefault();
        setAlert(true)
    }

    //console.log(`esta es la data que llegue a rowsredux ${JSON.stringify(data)}`)

    if (data.length == 0) {
        element = <tr style={{width:"100%"}}><td  className="text-center"><Spinner /></td></tr>
    } else {
        //console.log(`esto es la data obtenida en ${donde}: ${JSON.stringify(data)}`)
        

        element = data.map((item) => {

            return <tr key={item[`id${str}`]}>

                {columnas.map((columna, index) => {

                    let fila

                    //Se valida si es  un objeto anidado
                    if (typeof item[columna] === 'object' && item[columna] != null) {

                        if (item[columna]?.nombre && item[columna] !== 'ubicacion') {
                            fila = <td key={index} className="text-center all">{item[columna] = item[columna].nombre}</td>
                        }

                    } else {

                        fila = <td key={index} className="text-center all">
                            {item[columna] === null
                                ? "No registra"
                                : item[columna] === false
                                    ? "No"
                                    : item[columna] === true
                                        ? 'Si'
                                        : item[columna]}
                        </td>
                    }

                    return fila


                })}

                {/* Columna de acciones => editar , borrar */}
                <td className='text-center all' key={Math.random()}>
                    {/* <div>
                        <Link to={`${objeto}/${item[`id${str}`]}`} className="btn btn-success btn-sm me-2"  >Editar</Link>
                        <button type="button" className="btn btn-danger btn-sm" onClick={(e) => deleteDivision(e, objeto, item.idSensor)} >Borrar</button>
                    </div> */}
                    {/* <td className = "all"> */}
                        <div className="btn-group-horizontal col-sm-12 col-xs-12" style={{"display":"flex", "width":"100%"}}>
                        <Link to={`ver/${item[`id${str}`]}`} style={{"width":"30%"}} className="btn btn-outline-info mb-2 ml-1" data-toggle="tooltip" title="Ver" ><i className="far fa-eye" /></Link>{' '}
                        <Link to={`editar/${item[`id${str}`]}`} style={{"width":"30%"}} className="btn btn-outline-success mb-2 ml-1" data-toggle="tooltip" title="Editar" ><i className="fas fa-edit" /></Link>{' '}
                            {/* <Link to={`${objeto}/${item[`id${str}`]}`} style={{"width":"30%"}} className="btn btn-outline-success mb-2 ml-1" data-toggle="tooltip" title="Editar" ><i className="fas fa-edit" /></Link>{' '} */}
                            {/* {console.log(this.props.tipoFields)} */}
                            {/* <button 
                                // onClick={(e) => editItem(e, objeto, item.idSensor)}
                                onClick={(e) => fire()}
                                style={{"width":"30%"}} className="btn btn-outline-success mb-2 ml-1" 
                                data-toggle="tooltip" 
                                title="Borrar" 
                            > 
                                <i className="fas fa-edit" style={{"width": "18px"}}></i>
                            </button>*/}
                            <button 
                               // onClick={(e) => deleteDivision(e, objeto, item[`id${str}`])}
                                onClick={() => deleteData(`${item[`id${str}`]}`, item)}
                                //onClick={() => prueba() }
                                style={{"width":"30%"}} className="btn btn-outline-danger mb-2 ml-1" 
                                data-toggle="tooltip" 
                                title="Borrar" 
                            >
                                <i className="far fa-trash-alt" style={{"width": "18px"}}></i>
                            </button>
                        </div>
                        {/* { 
                alert && <SweetAlert
                    title="Here's a message!"
                    onConfirm={() => setAlert(false)}
                    
                    ><div>
                    The counter value is: {alert}
                    <FormularioEstacion/>
                    <hr/>
                    
                    <hr/>
                  </div></SweetAlert>
             } */}
                    {/* </td> */}

                </td>
            </tr>
        })
    }

    return element

}

export default DataRowsRedux
