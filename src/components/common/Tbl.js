import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TrBasicTableCRUD from './TrBasicTableCRUD';
import {MaysPrimera} from './helper'
import $, { data } from 'jquery'
import SpinnerLoading from './SpinnerLoading';
import {TableCRUDContext} from '../../context';
import 'datatables.net-responsive-bs4'
import 'datatables.net'
import 'datatable'



export const Tbl = ({urlService, urlBase, arrayColums}) => {


    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const [listaTRs, setListaTRs] = useState([]);
    const [data, setData] = useState([]);
   


    
    useEffect(() => {
        renderTableData(urlService);
        definirTabla()
    },[])



    const  renderTableData = async (urlService) =>{

        console.log("RENDERTABLE DE TBL", urlService)
        if(urlService == null){
            urlService = this.props.urlService
        }
        
       let listaTRs;


       //*Consultar base de datos
        await axios.get(urlService)
                    .then(response => {

                        if(response.data.data){
                            //*Cargar los elementos encontrados en una variable
                            listaTRs = response.data.data.filter(row => row.estado.includes('A')).map((tipoFields, index) => {
                               
                          
                                //*Formato Tiempo Garantia
                                if(tipoFields['tiempoGarantia']){
                                    tipoFields['tiempoGarantia']=tipoFields['tiempoGarantia'].valor +' ' + tipoFields['tiempoGarantia']['unidad']['nombre']    
                                }
                                
    
                                //*Llenar las columnas
                                arrayColums.forEach(element => {                                     
                                    
                                    //*Formatear fecha para humanos
                                    if(element === 'fechaInicio' || element  === 'fechaFin'){
                                        if(tipoFields[element] !== null){
                                            let fechaEnDB = new Date(tipoFields[element])
                                            let fechaFormateada = fechaEnDB.toLocaleDateString();
                                            tipoFields[element]= fechaFormateada
                                        }
                                    }       
                                   
                                    //*sacar nombre de la lista interna (objetos dentro de objetos)
                                    if(typeof tipoFields[element]=== 'object' ){                                        
                                        if(tipoFields[element] !== null ){
                                            tipoFields[element]= tipoFields[element].nombre
                                        }
                                    }
                                    
                                });
    
                                //*Returnas filas con los datos obtenidos
                                return (<TrBasicTableCRUD 
                                            
                                    key={index}
                                    tipoFields={ tipoFields }
                                    urlBase = {urlBase} 
                                    arrayColums = {arrayColums} 
                                    urlService = {urlService}/>)
                            });
                        
                        //*Este else se implementa debido al cambio de formato en algunos servicios
                        }else{
                            listaTRs = response.data.filter(row => row.estado.includes('A')).map((tipoFields, index) => {

                          
                                //*Formato Tiempo Garantia
                                if(tipoFields['tiempoGarantia']){
                                    tipoFields['tiempoGarantia']=tipoFields['tiempoGarantia'].valor +' ' + tipoFields['tiempoGarantia']['unidad']['nombre']    
                                }
    
                                this.props.arrayColums.forEach(element => {                                     
                                    
                                    //*Formatear fecha para humanos
                                    if(element === 'fechaInicio' || element  === 'fechaFin'){
                                        if(tipoFields[element] !== null){
                                            let fechaEnDB = new Date(tipoFields[element])
                                            let fechaFormateada = fechaEnDB.toLocaleDateString();
                                            tipoFields[element]= fechaFormateada
                                        }
                                    }       
                                  
                                    //*sacar nombre de la lista interna
                                    if(typeof tipoFields[element]=== 'object' ){
                                        
                                        if(tipoFields[element] !== null ){                                            
                                               
                                                tipoFields[element]= tipoFields[element].nombre
                                               
                                                if(tipoFields['componente'].marca){                                                   
                                                    tipoFields['serial'] = tipoFields['componente'].serial
                                                    tipoFields['marca']= tipoFields['componente'].marca.nombre
                                                }
                                                if(tipoFields['componente'].cartera){
                                                    //console.log(tipoFields['componente'].marca)
                                                    tipoFields['cartera']= tipoFields['componente'].cartera.nombre
                                                }
                                                if(tipoFields['componente'].garantia){
                                                    //console.log(tipoFields['componente'].marca)
                                                    tipoFields['garantia']= tipoFields['componente'].garantia.tiempoGarantia.valor +" "+tipoFields['componente'].garantia.nombre
                                                }                                            
                                            
                                        }
                                    }
                                    
                                });
    
                                //*Returnas filas con los datos obtenidos
                                return (<TrBasicTableCRUD                                            
                                    key={index}
                                    tipoFields={ tipoFields }
                                    urlBase = {this.props.urlBase} arrayColums = {this.props.arrayColums} urlService = {this.props.urlService}/>)
                            });
                        }


                        setIsLoading(false);
                        setData(response.data)
                        setListaTRs(listaTRs)
                        // this.setState({
                        //     isLoading: false,
                        //     data: response.data,
                        //     listaTRs: listaTRs,
                        // });
                    }, error => {
                    });
     }


     const renderTableHeaders =()=> {

        // console.log("entro en rendertableheaders")
        // console.log(listaTRs, "lista trssss")
        
        const listaThs = arrayColums.map((colum,  index) => {
            
            return (<th 
                key={index}
                className = "all"> {MaysPrimera(colum)} </th>)
        })

        return(
            <tr key={'encabezado'}>
                {listaThs}
                <th className = "all" style = {{"width" :"18%"}} >Acciones</th>
            </tr>
        )
    }



    const reloadDatatable =() => {
        setTimeout(() => {
            this.renderTableData(this.props.urlService);     
        }, 1000);
    }


    const definirTabla = ()=>{

       

        // console.log("entra en did update");
        // console.log(listaTRs, "Esto es lista trs")
        //if(!this.state.isLoading && !this.state.isInitialized)
        if(1==1)
        {

            
          
            if ( $.fn.DataTable.isDataTable('#parametrizacionTipoGet2') ) {
                $('#parametrizacionTipoGet2').DataTable().clear().destroy();
                //this.setState({listaTRs:this.props.arrayColums})
                
                //this.setState({"isInitialized": true});
               // this.renderTableData(this.props.urlService);     
              }else{
               // this.setState({"isInitialized": false});
              }

               
            
            $('#parametrizacionTipoGet2').DataTable({
                        "destroy":true,
                        "paging": true,
                        "lengthChange": true,
                        "searching": true,
                        "ordering": true,
                        "info": true,
                        "autoWidth": true,
                        "responsive": true,
                        "language": {
                                    "sProcessing":     "Procesando...",
                                    "sLengthMenu":     "Mostrar _MENU_ registros",
                                    "sZeroRecords":    "No se encontraron resultados",
                                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                                    "sInfoPostFix":    "",
                                    "sSearch":         "Buscar:",
                                    "sUrl":            "",
                                    "sInfoThousands":  ",",
                                    "sLoadingRecords": "Cargando...",
                                    "oPaginate": {
                                        "sFirst":    "Primero",
                                        "sLast":     "Último",
                                        "sNext":     "Siguiente",
                                        "sPrevious": "Anterior"
                                    },
                                    "oAria": {
                                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                                    },
                                    "buttons": {
                                        "copy": "Copiar",
                                        "colvis": "Visibilidad"
                                    }
                                },
                                "rowCallback": function( row, data, index ) {

                                        $(row).find('td:eq(2)').css('background-color', data[2]);
                                        $(row).find('td:eq(2)').css('color', data[2]);
                                        $(row).find('td:eq(3)').css('background-color', data[3]);
                                        $(row).find('td:eq(3)').css('color', data[3]);


                                }
                    });
                }
              // this.renderTableData(this.props.urlService+'/')
    }

    const value = { reloadDatatable: reloadDatatable };    
    return (
        <div>
            {isLoading ? 
                <SpinnerLoading/>
            :  <TableCRUDContext.Provider value={value}>
                    <table id="parametrizacionTipoGet2" className="table table-bordered table-hover dt-responsive">
                        <thead>
                            {renderTableHeaders()}
                        </thead>
                        <tbody>
                            { listaTRs }
                        </tbody>
                    </table>
                </TableCRUDContext.Provider>}
            </div>
    )
}

export default Tbl
