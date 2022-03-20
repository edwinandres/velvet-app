import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import {  unassignElementStation } from './MySwal'
import {  axiosDesasignarElemento } from './AxiosCrud'




/*
@params
    let cantidad = cantidad de objetos a anexar al formulario
    let objetos = un arreglo con la información  de los objetos a agregar
    let div = la sección en la que deben agregarse esos objetos
    let nombre = el nombre del objeto(componente, sensor... etc)
    let id = el nombre del id en la BD de cada objeto(idConsumible, idComponente...etc
 */

export const agregarObjeto = (cantidad, objetos, div, nombre, id) => {

    // console.log(objetos)
    // console.log(nombre, "nombre")
    // console.log(id, "id")
    //console.log(objetos)

    //alert("se creo el boton")

   

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

    for (let i = 0; i < objetos.length; i++) {
        //console.log(objetos[i][nombre][id])
        let option = document.createElement("option");
        option.value = objetos[i][nombre][id];
        option.text = objetos[i][nombre]['nombre'];
        select.appendChild(option);
    }

    //agregar evento onclick al boton
    boton.onclick = (e => { eliminarObjetosDOM(e, nombre, div) });
    // boton.onclick = function(e) {                   
    //    //console.log(e.target)
    //    //console.log(cantidad, "CANTIDAD")
    // }
    select.onchange = function (e) {
        //console.log(e.target)
        this.disabled = "true"

    }

    return cantidad + 1
}




export const agregarObjeto2 = (cantidad, objetos, div, nombre, id, setCompo, idEstacion, actualizarState) => {

    // console.log(objetos)
    // console.log(nombre, "nombre")
    // console.log(id, "id")
    //console.log(objetos)

    //alert("entro en agregar objeto 2")

    

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
       // let elementosSinRepetir = []
        //let newArray = []
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

async function eliminarObjetosDOM(e, nombre, div, idEstacion, idRelacion, actualizarState) {


    //alert(idEstacion , "idEstacion")

    //diferenciar entre el boton y el icon
    let nombreObjeto = e.target.id
    if (nombreObjeto.charAt(0) === "i") {
        nombreObjeto = nombreObjeto.substring(1)
    }
    //capturar elemento del dom
    let id = nombreObjeto.charAt(nombreObjeto.length - 1)
    let selectEliminar = document.getElementById(`${nombre}${id}`)
    //let botonEliminar = document.getElementById(nombreObjeto)
    //let iconEliminar = document.getElementById(`i${nombreObjeto}`)


    //let ide = `id${nombre.charAt(0).toUpperCase() + nombre.slice(1)}Estacion`


    let unassign = await unassignElementStation({ "idEstacion": idEstacion, ide: selectEliminar.value }, nombre)

    if (unassign) {
        //*unassign es un array que viene del swal y trae[motivoCambio, idNuevoEstado, nombreNuevoEstado, idElemento]
        let url = process.env.REACT_APP_URL_SERVICES + "/componenteEstacionEliminar/"
        //alert(url)
        let data = {"idComponenteEstacion":idRelacion,"motivoCambio": unassign[0], "estadoSiguiente":unassign[2], "idComponente":parseInt(unassign[3])}
        //axiosDelete(unassign[3], url, data)
        axiosDesasignarElemento(url, data)
        limpiarBoxObjetos(div)
       
        
    } else {
    }


}

export const eliminarDuplicados = (arr) => {

   
    let ids = []

    arr.map(el => {
        return(
            ids.push(el.idComponente)
        )
    })

   
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

export const eliminarIdDuplicado = (arr) => {
 


    const unicos = [];
    arr.forEach( (elemento) => {
      if (!unicos.includes(elemento)) {
        
        unicos.push(elemento);
      }
    });
   
    return unicos;
}

export function cargarObjetos(idEstacion, objetos, relacionObjetos, div, nombre, id, idRelacion) {


    

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

export const eliminarObjeto = (cantidad, div) => {

    //console.log(cantidad, "cantidad")
    //console.log(div, "div")

    if (cantidad > 0) {
        let bloque = document.getElementById(div);
        bloque.removeChild(bloque.lastChild);
        return cantidad - 1
    } else {
        return 0
    }


}

export function cargarCoordenadas(objetos, relacionObjetos, div, nombre, id) {


    ////console.log(objetos, "objetos")
    // console.log(relacionObjetos, "relacionObjetos")
    // console.log(div, "div")
    // console.log(nombre, "nombre")
    // console.log(id, "id")


    if (div === "divUbicacion") {
        // console.log("Entro en div ubicacion")
        // console.log(objetos, "objetos")
        // console.log(relacionObjetos[0]['ubicacion'], "relacionObjetos")
        // console.log(div, "div")
        // console.log(nombre, "nombre")
        // console.log(id, "id")
        let bloque2 = document.getElementById(div);

        let elemento = document.createElement('select');
        elemento.setAttribute("class", "custom-select custom-select-sm-1 mb-3");
        elemento.id = nombre;
        bloque2.appendChild(elemento);
        //let relacion2 = relacionObjetos[0]['ubicacion']
        objetos.forEach((element, index) => {
            //console.log(objetos[index]['latitud'], "OBJETOS")




            //console.log(noSensores[i])
            let option = document.createElement("option");
            option.value = objetos[index][id];
            option.text = objetos[index]['latitud'];
            elemento.appendChild(option);


            //console.log(element[nombre][id], "element, el que debe ser el value")
            elemento.value = element['latitud'][id]
            //console.log(element[nombre][id])

        })


        let bloque = document.getElementById(div);

        if (relacionObjetos !== null && bloque !== null) {

            relacionObjetos.forEach((element, index) => {

                if (bloque !== null) {

                    let elemento = document.createElement('select');
                    elemento.setAttribute("class", "custom-select custom-select-sm-1 mb-3");
                    elemento.id = nombre + index;
                    bloque.appendChild(elemento);

                    for (let i = 0; i < objetos.length; i++) {
                        //console.log(noSensores[i])
                        let option = document.createElement("option");
                        option.value = objetos[i][id];
                        option.text = objetos[i]['nombre'];
                        elemento.appendChild(option);
                    }

                    //console.log(element[nombre][id], "element, el que debe ser el value")
                    elemento.value = element[nombre][id]
                    //console.log(element[nombre][id])

                }

            })



        }

    }
    if (div === "divUbicacion") {
        // console.log("Entro en div ubicacion")
        // console.log(objetos, "objetos")
        // console.log(relacionObjetos[0]['ubicacion'], "relacionObjetos")
        // console.log(div, "div")
        // console.log(nombre, "nombre")
        // console.log(id, "id")
        let bloque2 = document.getElementById(div);

        let elemento = document.createElement('select');
        elemento.setAttribute("class", "custom-select custom-select-sm-1 mb-3");
        elemento.id = nombre;
        bloque2.appendChild(elemento);
        //let relacion2 = relacionObjetos[0]['ubicacion']
        objetos.forEach((element, index) => {
            //console.log(objetos[index]['latitud'], "OBJETOS")




            //console.log(noSensores[i])
            let option = document.createElement("option");
            option.value = objetos[index][id];
            option.text = objetos[index]['latitud'];
            elemento.appendChild(option);


            //console.log(element[nombre][id], "element, el que debe ser el value")
            elemento.value = element['latitud'][id]
            //console.log(element[nombre][id])

        })


        let bloque = document.getElementById(div);

        if (relacionObjetos !== null && bloque !== null) {

            relacionObjetos.forEach((element, index) => {

                if (bloque !== null) {

                    let elemento = document.createElement('select');
                    elemento.setAttribute("class", "custom-select custom-select-sm-1 mb-3");
                    elemento.id = nombre + index;
                    bloque.appendChild(elemento);

                    for (let i = 0; i < objetos.length; i++) {
                        //console.log(noSensores[i])
                        let option = document.createElement("option");
                        option.value = objetos[i][id];
                        option.text = objetos[i]['nombre'];
                        elemento.appendChild(option);
                    }

                    //console.log(element[nombre][id], "element, el que debe ser el value")
                    elemento.value = element[nombre][id]
                    //console.log(element[nombre][id])

                }

            })



        }

    }



    let bloque = document.getElementById(div);

    if (relacionObjetos !== null && bloque !== null) {

        relacionObjetos.forEach((element, index) => {

            if (bloque !== null) {

                let elemento = document.createElement('select');
                elemento.setAttribute("class", "custom-select custom-select-sm-1 mb-3");
                elemento.id = nombre + index;
                bloque.appendChild(elemento);

                for (let i = 0; i < objetos.length; i++) {
                    //console.log(noSensores[i])
                    let option = document.createElement("option");
                    option.value = objetos[i][id];
                    option.text = objetos[i]['nombre'];
                    elemento.appendChild(option);
                }

                //console.log(element[nombre][id], "element, el que debe ser el value")
                elemento.value = element[nombre][id]
                //console.log(element[nombre][id])

            }

        })



    }
}

export function limpiarBoxObjetos(div){
    let bloque = document.getElementById(div)
    while(bloque.firstChild){
        bloque.removeChild(bloque.firstChild)
    }
}

export async function buscarComponentes(elemento ,array){

    const compo = await  axios.get(process.env.REACT_APP_URL_SERVICES + '/'+ elemento +'/'+ array)
    //console.log(compo.data.data, "mirando compo")
    return compo.data.data

}


export  async function  cargarObjetosDesdeState(componentesAsignados, listadoComponentes,div, nombre) {


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



