import Swal from 'sweetalert2'
import axios from 'axios'
import { toast } from 'react-toastify'
//import { axiosGet } from './AxiosCrud'

export function swalDelete(id, urlService, data) {



    const swal = Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: `Se eliminará el registro con id: ${id}`,
        icon: 'warning',
        customClass: {
            confirmButton: 'btn btn-success ml-5',
            cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true

        //realizar el delete
    }).then((result) => {
        if (result.isConfirmed) {

            const borrar = async () => {
                const eliminado = await axios.delete(urlService, data);
                if (eliminado.data) {
                    toast.success(eliminado.data.mensaje)
                }
            }
            borrar()

            //actualizar pagina(para que se evidencie el borrado en la tabla)
            setTimeout(() => {
                window.location.reload(false);
                this.setState(prevState => ({
                    isHidden: true,
                }));
            }, 3000);

        }
    })

    return swal

}

export async function confirmDelete(objeto) {

   

    //construir tabla con el objeto que llega de la funcion delete
    let tabla = `<div style='text-align:center'>
                    <div><span class='margin:auto'>Se eliminará el siguiente registro</span><div><br>
                    <table border='1' style='margin:auto'>`
    for (const [key, value] of Object.entries(objeto)) {

        tabla += `<tr>
                    <td>${key}</td>
                    <td>${value}</td>
                </tr>`
    }
    tabla += `</table></div>`


  

    //const resultado= false
    const swal = await Swal.fire({
        title: '¿Está seguro de eliminar?',
        //text: `Se eliminará el registro con id: ${id}, nombre:${nombre}`, 
        text: 'Se eliminará el siguiente registro',
        html: tabla,

        icon: 'warning',
        iconColor: 'red',
        footer: '<span class="text-danger">Esta accion no puede deshacerse</span>',
        grow: 'column',
        customClass: {
            confirmButton: 'btn btn-success m-1',
            cancelButton: 'btn btn-secondary m-1'
        },
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true

        //realizar el delete
    }).then((result) => {

        return result.isConfirmed

    })


    return swal

}

export async function unassignElementStation(object, element) {

   //console.log(object)
   //console.log(element)
   //*cargar informacion de estacion y elemento a desasignar
    const estacionFull = await axios.get(process.env.REACT_APP_URL_SERVICES + '/estacion/'+object.idEstacion)
    const estacion = estacionFull.data.data;
    
    const elementoFull = await axios.get(process.env.REACT_APP_URL_SERVICES + '/' + element + '/' + object.ide)
    const elemento = elementoFull.data.data;

    const estados = await axios.get(process.env.REACT_APP_URL_SERVICES + '/base/estado')
    const listaEstados = estados.data.data;
   

    const { value: formValues } = await Swal.fire({
        title: 'Desasignación de elementos de estación',

        html:
            '<div className="form-group " style="textAlign:left;">'+
            '<p>Se va a desasignar el '+ element +': '+ elemento.nombre +' de la Estación: '+ estacion.nombre +'</p>'+
            '<label  class="float-left" text-align:left" htmlFor="swal-input1">Motivo</label>' +
            '<input class="form-control" id="swal-input1" class="swal2-input">' +
            '<label class="float-left">Nuevo Estado</label>' +
            '<select class="form-control" id="swal-input2" class="swal2-input">' +
            '<option>Seleccione...</option>' + listaEstados.map((estado) => {
                return (
                    '<option value=' + estado.idEstado + ' key=' + estado.idEstado + '>' + estado.nombre + '</option>'
                );

            })+
            '</div>',

        //*preConfirm es propio de swal, indispensable cuando hay mas de un campo
        //*solo hace el return si cumple las validaciones 
        preConfirm: () => {

            let motivo = document.getElementById('swal-input1').value;
            let estado = document.getElementById('swal-input2').value;

            let temp = document.getElementById('swal-input2');
            let nombreEstado = temp.options[temp.selectedIndex].text;         
        


            if (motivo === '') {
                Swal.showValidationMessage(`Debe digitar un motivo`)
            } else if (estado === 'Seleccione...') {
                Swal.showValidationMessage(`Debe seleccionar un nuevo estado`)
            }else{
                return [
                    motivo, estado, nombreEstado, object.ide                  
                ]
            }
            
        },

        
    })

    return formValues

}