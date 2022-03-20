import axios from 'axios';
import React, { useEffect } from 'react'
import Swal from 'sweetalert2';
import swalErrorGetData from '../helpers/swalErrorGetData';
import $ from 'jquery'
import 'datatables.net'
import 'datatable'
import 'datatables.net-responsive-bs4'
//var $ = require('jquery');
//$.DataTable = require('datatables.net');

const useGetData = (url) => {

	//Este hook consulta la api y retorna un array de objetos e inicializa el datatable
	//si ocurre un error en la consulta se muestra un mensaje de error

	const [data, setData] = React.useState([]);
	console.log(`object: ${url}`)
	

	useEffect(() => {
		const readData = async () => {
			
			axios.get(url)
			.then(res => {
				setData(res.data.data)	

			})
			.then(() => {
				
				$('#tableDefault').DataTable({
					
					destroy: true,
					responsive: true,
					"language": {
						"url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
					}
				// 	// "destroy":true,
				// 	// "paging": true,
				// 	// "lengthChange": true,
				// 	// "searching": true,
				// 	// "ordering": true,
				// 	// "info": true,
				// 	// "autoWidth": true,
				// 	//  responsive: {
				// 	// 	details: true},					
				// 	//  "language": {
				// 	// 	"sProcessing":     "Procesando...",
				// 	// 	"sLengthMenu":     "Mostrar _MENU_ registros",
				// 	// 	"sZeroRecords":    "No se encontraron resultados",
				// 	// 	"sEmptyTable":     "Ningún dato disponible en esta tabla",
				// 	// 	"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
				// 	// 	"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
				// 	// 	"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
				// 	// 	"sInfoPostFix":    "",
				// 	// 	"sSearch":         "Buscar:",
				// 	// 	"sUrl":            "",
				// 	// 	"sInfoThousands":  ",",
				// 	// 	"sLoadingRecords": "Cargando...",
				// 	// 	"oPaginate": {
				// 	// 		"sFirst":    "Primero",
				// 	// 		"sLast":     "Último",
				// 	// 		"sNext":     "Siguiente",
				// 	// 		"sPrevious": "Anterior"
				// 	// 	},
				// 	// 	"oAria": {
				// 	// 		"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
				// 	// 		"sSortDescending": ": Activar para ordenar la columna de manera descendente"
				// 	// 	},
				// 	// 	"buttons": {
				// 	// 		"copy": "Copiar",
				// 	// 		"colvis": "Visibilidad"
				// 	// 	}
				// 	// },
				});
			})
			.catch(err => {
				swalErrorGetData(err);					
			})				
			
		};
		readData();
	}, [url]);

	console.log(`data: ${data}`)

	return [
		data
	]
}

export default useGetData
