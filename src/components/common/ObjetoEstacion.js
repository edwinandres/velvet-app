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
//import { limpiarBoxObjetos } from './ObjetosDinamicos';


function limpiarBoxObjetos(div) {
    //console.log("este es el div a limpiar", div)
    let bloque = document.getElementById(div)
    while (bloque.firstChild) {
        bloque.removeChild(bloque.firstChild)
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


const eliminarDuplicados = (arr) => {

   
    let ids = []

    arr.map(el => 
       ( ids.push(el.idComponente))
    )

   
    const unicos = [];
    ids.forEach( (elemento) => {
      if (!unicos.includes(elemento)) {
          //console.log(elemento , "este es el elemento en unicos")
        unicos.push(elemento);
      }
    });
    //console.log(unicos, "esto es unicos")
    return unicos;
  }



async function buscarComponentes(elemento ,array){

    const compo = await  axios.get(process.env.REACT_APP_URL_SERVICES + '/'+ elemento +'/'+ array)
    //console.log(compo.data.data, "mirando compo")
    return compo.data.data

}





const ObjetoEstacion = ({ atributos , nombres, objetosDisponibles, agregarInput, guardadoIndividual, estacion, objetos, objetosEstacion}) => {

    //const [prueba, setPrueba] = useState(0);
    const [ready , setReady]=useState(0);
    const [componentStation, setComponentStation] = useState(objetosEstacion);
    const [compoState, setCompoState]= useState([])

   
    useEffect(()=>{      
        
        const consultarElementoEstacion = async () =>{

            const objetosEstacion = await axios.get(process.env.REACT_APP_URL_SERVICES + atributos.url);
            setComponentStation(objetosEstacion.data.data);

            setTimeout(() => {
               
                cargarObjetos(estacion, objetos, componentStation, atributos.div, atributos.nombre, atributos.id, atributos.idRelacion)
            }, 2000);
        }

        consultarElementoEstacion();
       
        const array = []       
        componentStation.map(elemento => (         
            array.push(elemento[atributos.id])
        ))

        setCompoState(array)       

    },[ready]);


    const actualizarState = () => {      

        compoState.map(compo => {           
           cargarObjetosDesdeState(compo, objetos, atributos.div, atributos.nombre, estacion)
        })      
    };


    const guardado = async (e) => {         
         await guardadoIndividual(e, atributos.div, atributos.id, atributos.url)
         limpiarBoxObjetos(atributos.div) //remueve todo
         actualizarState();
         setReady(ready+1);        
    };

    const eliminarObjetosRepetidos = () => {        
        const unicos = []
        compoState.map(elemento => {
            if(!unicos.includes(elemento)){
                unicos.push(elemento)
            }
        })       
    }

    const agregarElemento = (e) => {

        //alert("objetoEstacion id estacion"+ estacion)
       
        agregarObjeto2(0, objetosDisponibles, atributos.div, atributos.nombre, atributos.id,setCompoState, estacion, setReady())
        eliminarObjetosRepetidos()
       
        let elementosAgregar = []
        let elementosSinRepetir = []
        let childNodes = document.getElementById(atributos.div).childNodes
      
        childNodes.forEach(el => {
           
            if (el.type === "select-one") {
               
                elementosAgregar.map(elemento => {
                    if(!elementosSinRepetir.includes(elemento)){
                        elementosSinRepetir.push(elemento)                    
                    }
                })
                setCompoState(elementosSinRepetir)
            }
        })

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

    async function eliminarObjetosDOM(e, nombre, div, idEstacion, idRelacion) {


        // console.log("ACABA DE ENTRAR EN ELIMINAR OBJETOS DOM")
        // console.log(e, "ESTO ES E")
        // console.log(nombre, "ESTO ES NOMBRE")
        // console.log(div, "ESTO ES DIV")
        // console.log(idEstacion, "ESTO ES ID ESTACION")
        // console.log(idRelacion, "ESTO ES IDRELACION")
        // console.log(actualizarState, "ESTO ES ACTUALIZAR STATE")
        // console.log("==================================================")

       // alert(idEstacion + "idEstacion")
    
        //diferenciar entre el boton y el icon
        let nombreObjeto = e.target.id
        if (nombreObjeto.charAt(0) === "i") {
            nombreObjeto = nombreObjeto.substring(1)
        }
        //capturar elemento del dom
        let id = nombreObjeto.charAt(nombreObjeto.length - 1)
        let selectEliminar = document.getElementById(`${nombre}${id}`)
        let botonEliminar = document.getElementById(nombreObjeto)
        let iconEliminar = document.getElementById(`i${nombreObjeto}`)
    
    
        let ide = `id${nombre.charAt(0).toUpperCase() + nombre.slice(1)}Estacion`
    
    
        let unassign = await unassignElementStation({ "idEstacion": idEstacion, ide: selectEliminar.value }, nombre)
    
        if (unassign) {
            //*unassign es un array que viene del swal y trae[motivoCambio, idNuevoEstado, nombreNuevoEstado, idElemento]
            let url = process.env.REACT_APP_URL_SERVICES + "/componenteEstacionEliminar/"
            //alert(url)
            let data = {"idComponenteEstacion":idRelacion,"motivoCambio": unassign[0], "estadoSiguiente":unassign[2], "idComponente":parseInt(unassign[3])}
            //axiosDelete(unassign[3], url, data)
            axiosDesasignarElemento(url, data)
            limpiarBoxObjetos(div)
    
            setReady(ready+1)
            
           
            
        } else {
        }
    
    
    }

    function cargarObjetos(idEstacion, objetos, relacionObjetos, div, nombre, id, idRelacion) {


    

        let bloque = document.getElementById(div);
    
     
        if (relacionObjetos !== null && bloque !== null) {
    
            relacionObjetos.forEach((element, index) => {
             
               
    
                if (bloque !== null) {
    
                    //crear boton de eliminar
                    let boton = document.createElement('button')
                    boton.setAttribute("class", "btn btn-md d-inline btn-danger   mb-3 mt-3")
                    //boton.setAttribute("i", "far fa-trash-alt")
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
                        //console.log(noSensores[i])
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
    

    const agregarObjeto2 = (cantidad, objetos, div, nombre, id, setCompo, idEstacion, actualizarState) => {

        // console.log(objetos)
        // console.log(nombre, "nombre")
        // console.log(id, "id")
        //console.log(objetos)
    
       // alert("entro en agregar objeto 2")
    
        
    
        let bloque = document.getElementById(div);
    
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
            //console.log(objetos[i][nombre][id])
            let option = document.createElement("option");
            option.value = objetos[i][nombre][id];
            option.text = objetos[i][nombre]['nombre'];
            select.appendChild(option);
        }
    
        //agregar evento onclick al boton
        boton.onclick = (e => { eliminarObjetosDOM(e, nombre, div, idEstacion, actualizarState) });
        // boton.onclick = function(e) {                   
        //    //console.log(e.target)
        //    //console.log(cantidad, "CANTIDAD")
        // }
        select.onchange = function (e) {
    
    
    
    
    
            let elementosAgregar = []
            let elementosSinRepetir = []
            let newArray = []
            let childNodes = document.getElementById(div).childNodes
            //console.log(childNodes, "childnodes hasta el momento")
            childNodes.forEach(el => {
                //console.log("jijijij", el.type)
                if (el.type === "select-one") {
                    // console.log(el.options[el.selectedIndex].text)
                    // console.log(el.value, "val val val")
                    // console.log(el.options.selectedIndex)
    
    
    
                    let elementoNuevo = {idComponente: el.value, nombre:el.options[el.selectedIndex].text}
                    
    
                        
                        elementosAgregar.push(elementoNuevo)
                        const array = eliminarDuplicados(elementosAgregar)
    
                        //console.log(array, "esto es elementos a agregar")
                        
                        setCompo(array)
                       // limpiarBoxObjetos('divComponentes')
                  
                }
            })
            
            //console.log(e.target.value)
            this.disabled = "true"
            //return e.target.value
    
        }
    
        return cantidad + 1
    }
    


async function  cargarObjetosDesdeState(componentesAsignados, listadoComponentes,div, nombre, idEstacion) {

    //alert("CARGAR OBJETOS DESDE STATE")


    // console.log(componentesAsignados, "componentes asignados")
    // console.log(listadoComponentes,"listadoComponentes")
    // console.log(div, "div")
    // console.log(nombre, "nombre")
    // console.log("===============================================")
    
       let  componentexd =  await buscarComponentes(nombre, componentesAsignados)




       
        let bloque = document.getElementById(div);
       


       
    
    
       
    
            // componentesAsignados.forEach((element, index) => {
    
                 if (bloque !== null) {
    
            //         //crear boton de eliminar
                      let boton = document.createElement('button')
                      boton.setAttribute("class", "btn btn-md d-inline btn-danger   mb-3 mt-3")
            //         // //boton.setAttribute("i", "far fa-trash-alt")
                      boton.innerHTML = '<i class="far fa-trash-alt" id="iboton' + nombre + componentexd.idComponente + '" ></i>';
                      boton.type = 'button';
                      boton.id = "boton" + nombre + componentexd.idComponente;
    
            //         // //crear select
                      let select = document.createElement('select');
                      select.setAttribute("class", "custom-select custom-select-md mr-sm-2 col-xs-1 col-md-11 col-sm-11 col-lg-11");
                      select.setAttribute("disabled", "true")
                      select.id = nombre + componentexd.idComponente;
    
            //         // //agregar boton y select al dom                
                      bloque.appendChild(select);
                      bloque.appendChild(boton)
                      boton.onclick = (e => { eliminarObjetosDOM(e, nombre, div, idEstacion, atributos.idRelacion) });
    
            //         // //agregar evento onclick al boton
    
            //         // //
    
    
            //         // boton.onclick = (e => { eliminarObjetosDOM(e, nombre, div, idEstacion, element[idRelacion]) });
            //         // // boton.onclick = function(e) { 
            //         // //     let nombreObjeto = e.target.id
            //         // //     let id = nombreObjeto.charAt(nombreObjeto.length-1)
            //         // //     let selectEliminar = document.getElementById(`${nombre}${id}`)
            //         // //    //console.log(selectEliminar , "selecteleiminar")
            //         // //    //console.log(nombreObjeto, "nombre") 
            //         // //    //console.log(id, "id")
            //         // //    //console.log(nombre, "nombre que vieene")
            //         // //     // let id =                  
            //         // //     ////console.log(e.target.id)
            //         // //     //console.log(relacionObjetos.length)
            //         // // }
    
            //         // //agregar las opciones al select
            //         for (let i = 0; i < listadoComponentes.length; i++) {
            //             //console.log(noSensores[i])
            //             console.log(listadoComponentes[i]) 
            //console.log(componente, "compup")  
                          let option = document.createElement("option");
                          option.value = componentexd.idComponente;
                          option.text = componentexd.nombre;
                          select.appendChild(option);
                     }
    
            //         // //console.log(element[nombre][id], "element, el que debe ser el value")
    
            //         // select.value = element[nombre][id]
            //         // //select.value = element[idRelacion]
            //         // ////console.log(idRelacion, "idrelacion")
            //         // ////console.log(select.value, "selectvalue")
            //         // //console.log(element[idRelacion])
            //         // //console.log(select.value, "select.value")
            //         // //console.log(boton.id , "boton.value")
            //         // //console.log(element[nombre][id])
    
            //     }
    
            // })
    
    
    
        
    }

    return (
        <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12">               
            
            <div className="card-header"><strong>{(atributos.titulo).toUpperCase()}</strong></div>
            <div className="card-body mb-4" id={atributos.div} name={atributos.div}></div>  
            {/* <hr/> */}
            
            <div>               
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-2" style={{ "textAlign": "center", "justifyContent": "center" }}>
                    <button type="button" onClick={agregarElemento}  className="btn  btn-outline-success btn-inline "   > + </button>
                </div>
                <div className="row mt-3 mb-3" style={{ "textAlign": "center", "justifyContent": "center" }}>
                    <div className='col-sm-3' >
                        <input
                            className="btn btn-md  btn-secondary row-md-20 btn-block"
                            type="button"
                            name="guardarComponentes"
                            value={`Guardar ${atributos.nombre}`}
                            onClick={ e => guardado() }
                        />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ObjetoEstacion
