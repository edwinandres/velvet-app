import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
//import deleteDivision from './helpers/swalDelete';
import useGetData from '../hooks/useGetData';
import DataRows from './DataRows';
import DataRowsRedux from './DataRowsRedux';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import $ from 'jquery'
import { fetch_listado_estaciones } from '../../redux/actions/estacionesActions';

// import 'datatables.net'
// import 'datatable'
// import 'datatables.net-responsive-bs4'





const TableDataRedux = ({ columnas, url, objeto, data }) => {

     //const state = useSelector(state => state)
    // const dispatch = useDispatch() 

    useEffect(() => {
        //console.log(`imprimiendo estado global desde TableDataRedux ${JSON.stringify(state)}`);
        //console.log(`esta es la data que llega al tableredux ${JSON.stringify(data)}`);
        $('#tableDefault').DataTable({
					
            destroy: true,
            responsive: true,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
            },
            dom: 'Blfrtip',
            
        });
    }, [])

    

    //const [datos, setDatos] = useState([]);
    //const [data] = useGetData(url);
    let setTableBody 

    //console.log(`state: ${JSON.stringify(state.listadoEstaciones)}`)
    //consol

    //let data = state.listadoEstaciones
    data?.length == 0
        ? setTableBody = <tr><td colSpan="7" className="text-center"><Spinner /></td></tr>
        : setTableBody = <DataRowsRedux data={data} columnas={columnas} objeto={objeto} donde="redux" />

    return (

       
       
        <div className="row">
            <div className="col-12" >
            

            <div className="table-responsive " >               
                <table className="table table-bordered table-hover dt-responsive "   id='tableDefault'>               
                    <thead>
                        <tr>
                            {columnas.map((columna, index) => {
                                console.log(`index: ${index}`)
                                return <th key={index} className="all">{columna.charAt(0).toUpperCase() + columna.slice(1)}</th>

                            })}

                            <th key={Math.random()} className = "all" style = {{"width" :"18%"}}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {setTableBody}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
			

	)
}

export default TableDataRedux
