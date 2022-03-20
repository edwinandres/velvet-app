import axios from 'axios';
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'


import React, { useEffect, useState } from 'react'
//import { eliminarObjeto, agregarObjeto, cargarObjetos, cargarCoordenadas } from "../../common/ObjetosDinamicos";
// import { 
//     //agregarObjeto,
//     //agregarObjeto2, 
//    // cargarObjetos, 
//    // cargarObjetosDesdeState 
// } from './ObjetosDinamicos';
//import ElementoEstacion from './ElementoEstacion';
//import { limpiarBoxObjetos } from './ObjetosDinamicos';


function limpiarBoxObjetos(div) {
    let bloque = document.getElementById(div)
    while (bloque.firstChild) {
        bloque.removeChild(bloque.firstChild)
    }
}


const ObjetoEstacion = ({arrayComponentes, atributos , nombres, objetosDisponibles, agregarInput, guardadoIndividual, estacion, objetos, objetosEstacion}) => {

    const [initialState, setInitialState] = useState(objetosEstacion)
    const [ready, setReady] = useState(1)
    const [elementStation]= useState(arrayComponentes)
    //const [cantidadObjetos, setCantidadObjetos] = useState(0)

    useEffect(()=>{    
        
        const iniciar = async () => {
            if(elementStation !== null && ready === 1){                     
               
                cargaInicialObjetos(estacion, objetos, initialState, atributos.div, atributos.nombre, atributos.id, atributos.idRelacion)
            }
        }
        iniciar();
        
       
      
        
       
        //eslint-disable-next-line
    },[ready]);


    function cargaInicialObjetos(idEstacion, objetos, relacionObjetos, div, nombre, id, idRelacion) {

        //objetos es la lista completa a desplegar en los select
        //relacionObjetos es los elementos ya asignados con idComponenteEstacion
        //nombre es nombre del elemento
        //id es el nombre del campo id ej = "idComponente"
        //idRelacion es el nombre de la relacion ej= "idComponenteEstacion"
        // console.log(objetos, "OBJETOS")
        // console.log(relacionObjetos, "RELACION OBJETOS")
        // console.log(nombre, "NOMBRE")
        // console.log(id, "ID")
        // console.log(idRelacion, "IDRELACION")
        // console.log("ENTRO EN CARGA INICIAL OBJETOS")

        let bloque = document.getElementById(div);
    
     
        if (relacionObjetos !== null && bloque !== null) {
    
            relacionObjetos.forEach((element, index) => {             
               
    
                if (bloque !== null) {
    
                    //crear boton de eliminar
                    let boton = document.createElement('button')
                    boton.setAttribute("class", "btn btn-md d-inline btn-danger   mb-3 mt-3")                   
                    boton.innerHTML = '<i class="far fa-trash-alt" id="iboton' + nombre + index + '" ></i>';
                    boton.type = 'button';
                    boton.id = "boton" + nombre + index;
    
                    //crear select
                    let select = document.createElement('select');
                    select.setAttribute("class", "custom-select custom-select-md mr-sm-2 col-xs-1 col-md-11 col-sm-11 col-lg-11");
                    select.setAttribute("disabled", "true")
                    select.id = nombre + index;
    
                    //agregar boton y select al dom                     
                    bloque.appendChild(select);
                    bloque.appendChild(boton)    
                    
    
                    boton.onclick = (e => { eliminarObjetosDOM(e, nombre, div, idEstacion, element[idRelacion]) });
                    
    
                    //agregar las opciones al select
                    for (let i = 0; i < objetos.length; i++) {
                        
                        let option = document.createElement("option");
                        option.value = objetos[i][id];
                        option.text = objetos[i]['nombre'];
                        select.appendChild(option);
                    }    
                    select.value = element[nombre][id]
                   
                }    
            })     
        }
    }
    

    async function axiosDesasignarElemento( url, data) {



        try {   
            const eliminado = await axios.put(url, data);
            if (eliminado.data) {
                toast.success(eliminado.data.mensaje)
                // setReady(ready+1)
                // limpiarBoxObjetos(atributos.div)
                // actualizarState();
            }

            
        } catch (error) {
  
        }

    }


async function unassignElementStation(object, element) {



    //*cargar informacion de estacion y elemento a desasignar
    const estacionFull = await axios.get(process.env.REACT_APP_URL_SERVICES + '/estacion/' + object.idEstacion)
    const estacion = estacionFull.data.data;

    const elementoFull = await axios.get(process.env.REACT_APP_URL_SERVICES + '/' + element + '/' + object.ide)
    const elemento = elementoFull.data.data;

    const estados = await axios.get(process.env.REACT_APP_URL_SERVICES + '/base/estado')
    const listaEstados = estados.data.data;


    const { value: formValues } = await Swal.fire({
        title: 'Desasignación de elementos de estación',

        html:
            '<div className="form-group " style="textAlign:left;">' +
            '<p>Se va a desasignar el ' + element + ': ' + elemento.nombre + ' de la Estación: ' + estacion.nombre + '</p>' +
            '<label  class="float-left" text-align:left" htmlFor="swal-input1">Motivo</label>' +
            '<input class="form-control" id="swal-input1" class="swal2-input">' +
            '<label class="float-left">Nuevo Estado</label>' +
            '<select class="form-control" id="swal-input2" class="swal2-input">' +
            '<option>Seleccione...</option>' + listaEstados.map((estado) => {
                return (
                    '<option value=' + estado.idEstado + ' key=' + estado.idEstado + '>' + estado.nombre + '</option>'
                );

            }) +
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
            } else {
                return [
                    motivo, estado, nombreEstado, object.ide
                ]
            }

        },


    })

    return formValues

}



    async function eliminarObjetosDOM(e, nombre, div, idEstacion, idRelacion) {


        // console.log("ACABA DE ENTRAR EN ELIMINAR OBJETOS DOM")
        // console.log(e, "ESTO ES E")
        // console.log(nombre, "ESTO ES NOMBRE")
        // console.log(div, "ESTO ES DIV")
        // console.log(idEstacion, "ESTO ES ID ESTACION")
        // console.log(idRelacion, "ESTO ES IDRELACION")
       
        // console.log("==================================================")

        
        // console.log(nombre)
    
        //diferenciar entre el boton y el icon
        let nombreObjeto = e.target.id
        if (nombreObjeto.charAt(0) === "i") {
            nombreObjeto = nombreObjeto.substring(1)
        }
        //capturar elemento del dom
        let id = nombreObjeto.charAt(nombreObjeto.length - 1)
        let selectEliminar = document.getElementById(`${nombre}${id}`)
        // let botonEliminar = document.getElementById(nombreObjeto)
        // let iconEliminar = document.getElementById(`i${nombreObjeto}`)
    
    
        //let ide = `id${nombre.charAt(0).toUpperCase() + nombre.slice(1)}Estacion`
    
    
        let unassign = await unassignElementStation({ "idEstacion": idEstacion, ide: selectEliminar.value }, nombre)
    
        if (unassign) {
            //*unassign es un array que viene del swal y trae[motivoCambio, idNuevoEstado, nombreNuevoEstado, idElemento]
            //let url = process.env.REACT_APP_URL_SERVICES + "/componenteEstacionEliminar/"
            //alert(atributos.urlEliminar)
            let url = process.env.REACT_APP_URL_SERVICES + atributos.urlEliminar
           
           
            //alert(url)
            //let data = {"idComponenteEstacion":idRelacion,"motivoCambio": unassign[0], "estadoSiguiente":unassign[2], "idComponente":parseInt(unassign[3])}
            let data = {[atributos.idRelacion]:idRelacion,"motivoCambio": unassign[0], "estadoSiguiente":unassign[2], [atributos.id]:parseInt(unassign[3])}
           //alert(data)
            //axiosDelete(unassign[3], url, data)
            axiosDesasignarElemento(url, data)
            limpiarBoxObjetos(div)
    
            setReady(ready+1)
            setTimeout(() => {
                refrescar()
            }, 3000);
            //refrescar();
            
           
            
        } else {
        }
    
    
    }


    const agregarElementoDOM = () => {
        agregarObjeto2(0,atributos.div, atributos.nombre, atributos.id)

    }

    const refrescar = (object) => {
       // alert("refresh")
        setInitialState(object)
        cargaInicialObjetos(estacion, objetos, initialState, atributos.div, atributos.nombre, atributos.id, atributos.idRelacion)
        window.location.reload(false);
    }

    const guardarElementos = async (e) => {
        

        //let respuesta = await guardadoIndividual(e, atributos.div, atributos.id, atributos.url)
        await guardadoIndividual(e, atributos.div, atributos.id, atributos.url)
         
    }


    const agregarObjeto2 = (cantidad, div, nombre, id, setCompo, idEstacion, actualizarState) => {

        //  console.log(objetos)
        //  console.log(nombre, "nombre")
        //  console.log(atributos.nombre, "nombre")
        //  console.log(id, "id")
        //  console.log(atributos.id, "id")
        // console.log(objetos)
        // console.log(div)
        // console.log(objetos)
    
       
    
        
    
        let bloque = document.getElementById(atributos.div);
    
        let boton = document.createElement('button')
        boton.setAttribute("class", "btn btn-md d-inline btn-danger   mb-3 mt-3")
        boton.setAttribute("i", "far fa-trash-alt")
        boton.innerHTML = '<i class="far fa-trash-alt" id="iboton' + nombre + cantidad + '" ></i>';
        boton.type = 'button';
        boton.id = "boton" + nombre + cantidad;
    
        let select = document.createElement('select');
        select.setAttribute("class", "custom-select custom-select-md mr-sm-2 col-xs-1 col-md-11 col-sm-11 col-lg-11");
    
        select.id = nombre + cantidad;
        select.name = nombre + cantidad;
        //select.setAttribute("onchange", function(){saludar(select.id);})
    
        //select.setAttribute("onchange", saludar())
    
        bloque.appendChild(select);
        bloque.appendChild(boton);
    
        //console.log(objetos)
        let option = document.createElement("option");
            option.value = null;
            option.text = "Seleccione ...";
            select.appendChild(option);
    
        for (let i = 0; i < objetos.length; i++) {
            let option = document.createElement("option");
            option.value = objetos[i][atributos.id]
            option.text = objetos[i].nombre
            // option.value = objetos[i][nombre][id];
            // option.text = objetos[i][nombre]['nombre'];
            select.appendChild(option);
        }
    
        //agregar evento onclick al boton
        //boton.onclick = (e => { eliminarObjetosDOM(e, nombre, div, idEstacion, actualizarState) });
       
        select.onchange = function (e) {
    
    
    
     
    
            let elementosAgregar = []
            //let elementosSinRepetir = []
            //let newArray = []
            let childNodes = document.getElementById(atributos.div).childNodes
            //console.log(childNodes, "childnodes hasta el momento")
            childNodes.forEach(el => {
                //console.log("jijijij", el.type)
                if (el.type === "select-one") {
                    // console.log(el.options[el.selectedIndex].text)
                    // console.log(el.value, "val val val")
                    // console.log(el.options.selectedIndex)
    
    
    
                    let elementoNuevo = {[id]: el.value, nombre:el.options[el.selectedIndex].text}
                    
    
                        
                        elementosAgregar.push(elementoNuevo)
                        // const array = eliminarDuplicados(elementosAgregar)
    
                        // //console.log(array, "esto es elementos a agregar")
                        
                        // setCompo(array)
                       // limpiarBoxObjetos('divComponentes')
                  
                }
            })
            
            //console.log(e.target.value)
            this.disabled = "true"
            //return e.target.value
    
        }
    
        return cantidad + 1
    }

    return (
        <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12">               
            
            <div className="card-header"><strong>{(atributos.titulo).toUpperCase()}</strong></div>
            <div className="card-body mb-4" id={atributos.div} name={atributos.div}></div>  
            {/* <hr/> */}
            
            <div>               
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-2" style={{ "textAlign": "center", "justifyContent": "center" }}>
                    <button type="button" onClick={agregarElementoDOM}  className="btn  btn-outline-success btn-inline "   > + </button>
                </div>
                <div className="row mt-3 mb-3" style={{ "textAlign": "center", "justifyContent": "center" }}>
                    <div className='col-sm-3' >
                        <input
                            className="btn btn-md  btn-secondary row-md-20 btn-block"
                            type="button"
                            name="guardarComponentes"
                            value={`Guardar ${atributos.nombre}`}
                            onClick={ e => guardarElementos() }
                        />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ObjetoEstacion
