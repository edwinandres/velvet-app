import React from 'react'
import PropTypes from 'prop-types';
import $ from 'jquery'
import axios from 'axios'
import 'datatables.net'
import 'datatable'
import 'datatables.net-responsive-bs4'
import TrBasicTableCRUD from './TrBasicTableCRUD'
import SpinnerLoading from './SpinnerLoading';
import {TableCRUDContext} from '../../context';
import {MaysPrimera} from './helper'



class BasicTableCRUD extends React.Component
{   
    static defaultProps = { 
        urlService: '',
        urlBase: '',
        arrayColums: [],
       
    };
    
    //*Definicion del state
    constructor (props){
        super (props);
        this.state = {
            isLoading: true,
            isInitialized: false,
            listaTRs: [],
            data: [],
           
        }
        
        this.renderTableData = this.renderTableData.bind(this);
        this.reloadDatatable =  this.reloadDatatable.bind(this);
        
    }

    async renderTableData(urlService) {

        // console.log("gggggggggggggggggggggggggggggg", this.props.urlService)
        // if(urlService == null){
        //     console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyy", urlService)
        //     urlService = this.props.urlService
        // }
        
       let listaTRs;

     
       
    

      // console.log("entra en el render")
       //*Consultar base de datos
        await axios.get(urlService)
                    .then(response => {

                        if(response.data.data){
                            //*Cargar los elementos encontrados en una variable
                            listaTRs = response.data.data.filter(row => row.estado.includes('A'))
                            //eslint-disable-next-line
                            .filter(row => this.props.serial? row.serial == this.props.serial: row.nombre !==null)
                            //eslint-disable-next-line
                            .filter(row => this.props.codigoAMVA? row.codigoAMVA == this.props.codigoAMVA: row.nombre !==null)
                            .filter(row => this.props.cartera? row.idCartera == this.props.cartera: row.nombre !==null)
                            .map((tipoFields, index) => {
                               
                          
                                //*Formato Tiempo Garantia
                                if(tipoFields['tiempoGarantia']){
                                    tipoFields['tiempoGarantia']=tipoFields['tiempoGarantia'].valor +' ' + tipoFields['tiempoGarantia']['unidad']['nombre']    
                                }
                                
    
                                //*Llenar las columnas
                                this.props.arrayColums.forEach(element => {                                     
                                    
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
                                    urlBase = {this.props.urlBase} arrayColums = {this.props.arrayColums} urlService = {this.props.urlService}/>)
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


                        
                        this.setState({
                            isLoading: false,
                            data: response.data,
                            listaTRs: listaTRs,
                        });
                    }, error => {
                    });
     }

   

     //*Renderizar los encabezados
    renderTableHeaders() {

      
        
        const listaThs = this.props.arrayColums.map((colum,  index) => {
            
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

    reloadDatatable(){
        //console.log("Este es el reload data table")
        setTimeout(() => {
            this.renderTableData(this.props.urlService);     
        }, 1000);
    }

    componentDidMount () 
    {
        //console.log("este es didmount las props", this.props)
        this.renderTableData(this.props.urlService);
       
        //console.log("didMOUNNT")
    }


    componentDidUpdate () 
    {

        
       
       

            // console.log("didupdate dossssss")
            
          
            // if ( $.fn.DataTable.isDataTable('#parametrizacionTipoGet') ) {
            //     $('#parametrizacionTipoGet').DataTable().clear().destroy();
            //     //this.setState({listaTRs:this.props.arrayColums})
            //     console.log("Entra en el destroy del dt")
                
            //     //this.setState({"isInitialized": true});
            //    // this.renderTableData(this.props.urlService);     
            //   }else{
            //    // this.setState({"isInitialized": false});
            //   }

               
            
            $('#parametrizacionTipoGet').DataTable({
                        "destroy":true,
                        "paging": true,
                        "lengthChange": true,
                        "searching": true,
                        "ordering": true,
                        "info": true,
                        "autoWidth": true,
                        "responsive": true,
                        "aoColumnDefs": [{ "bVisible": false, "aTargets": [0] }],
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

                                        $(row).find('td:eq(2)').css('background-color', data[3]);
                                        $(row).find('td:eq(2)').css('color', data[3]);
                                        // $(row).find('td:eq(3)').css('background-color', data[3]);
                                        // $(row).find('td:eq(3)').css('color', data[3]);


                                }
                    });
                
              // this.renderTableData(this.props.urlService+'/')
        
    }

    componentWillUnmount () {
    }
    

    //*Renderizar la tabla de Index
    render ()
    {

       
       

        const value = { reloadDatatable: this.reloadDatatable };      
        
        return (
            <div>
            {this.state.isLoading ? 
                <SpinnerLoading/>
            :  <TableCRUDContext.Provider value={value}>
                    <table id="parametrizacionTipoGet" className="table table-bordered table-hover dt-responsive">
                        <thead>
                            {this.renderTableHeaders()}
                        </thead>
                        <tbody>
                            { this.state.listaTRs }
                        </tbody>
                    </table>
                </TableCRUDContext.Provider>}
            </div>
            
        )
    }
}

BasicTableCRUD.propTypes = {
    urlService: PropTypes.string.isRequired,
    urlBase: PropTypes.string.isRequired,
    arrayColums: PropTypes.array.isRequired,
};

export default BasicTableCRUD;
