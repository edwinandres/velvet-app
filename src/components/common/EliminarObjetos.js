import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



export const eliminarNoSensores = (cantidadNoSensores, noSensores) =>{
    if(cantidadNoSensores > 0){
        let bloque = document.getElementById('divNoSensores');
        bloque.removeChild(bloque.lastChild);
        return cantidadNoSensores-1
    }else{
        return 0
    }


}

export const eliminarConsumibles = (cantidadConsumibles) =>{
    //alert(cantidadConsumibles)
    if(cantidadConsumibles > 0){
        let bloque = document.getElementById('divConsumibles');
        bloque.removeChild(bloque.lastChild);
        return cantidadConsumibles-1
    }else{
        return 0
    }


}

/*const agregarComponente = (e) =>{


    if (e.target.value == 'componente'){


        guardarCantidadComponentes(cantidadComponentes +1);

        var bloque = document.getElementById('padre');

        var elemento = document.createElement('select');
        elemento.setAttribute("class", "componenteAgregar custom-select custom-select-sm-1 mb-3");
        elemento.setAttribute("name", "componenteAgregar");
        elemento.id = 'componente'+cantidadComponentes;
        elemento.name = 'nombre'

        bloque.appendChild(elemento);
    }

    for (var i = 0; i < componentes.length; i++) {
        console.log(componentes[i]['idComponente'])
        var option = document.createElement("option");
        option.value = componentes[i]['idComponente'];
        option.text = componentes[i]['nombre'];
        elemento.appendChild(option);
    }
}*/


export async function axiosPost (urlPost, datos, setFieldError, urlRetorno, history) {



    await axios.post(urlPost,datos, {timeout:2000}
    ).then(response => {


        if(response.data.error){
            response.data.columnas.forEach((columna)=>{
                setFieldError(columna.nombre, columna.mensaje);
            })

        }else{
            //confirmiar y redirigir
            toast.success(response.data.mensaje)
            setTimeout(()=>{
                history.push(urlRetorno)
            },1000)

        }

        //validar unique
        // if(response.data.error){
        //     console.log(response)
        //     alert("esta entrando en axios post error")
        //     response.data.columnas.forEach((columna)=>{
        //         setFieldError(columna.nombre, columna.mensaje);
        //         if(columna.nombre === 'color'){
        //             console.log('colorcito')
        //             //columna.nombre = 'color2'
        //         }
        //         console.log(columna.nombre)
        //         console.log(response)
        //     })

        // }else{

        //     //confirmar y redirigir
        //     toast.success(response.data.mensaje)
        //     setTimeout(()=>{
        //         history.push(urlRetorno)
        //     },1000)
        // }

    }).catch(error => {
        if(error){
            toast.error("Problemas con el servidor")
        }
    });

}

export async function axiosPut (urlPost,datos, setFieldError,urlRetorno, history) {


    await axios.put(urlPost, datos, {timeout:2000}
    ).then(response => {

        //validar unique
        if(response.data.error){
            response.data.columnas.forEach((columna)=>{
                setFieldError(columna.nombre, columna.mensaje);
            })

        }else{
            //confirmiar y redirigir
            toast.success(response.data.mensaje)
            setTimeout(()=>{
                history.push(urlRetorno)
            },1000)

        }

    }).catch(error => {
        if(error){
            toast.error("Problemas con el servidor")
        }

    });

}

export async function axiosGet (urlGet, history, urlRetorno, id) {


    try {
        const response = await axios.get(urlGet);

        //validar unique
        if(response.data.error){
            toast.error(response.data.mensaje)
            history.push(urlRetorno)
        }
        //validar estado inactivo
        if(response.data.data.estado === 'I'){
            toast.error(`El registro con id:${id} se encuentra inactivo`)
            history.push(urlRetorno)
        }



        const respuesta = response.data.data
        return respuesta

    } catch (error) {
        console.error("El servidor no responde");
    }

}

export async function axiosDelete(id, url, data) {


    try {
        const eliminado =  await axios.delete(url, data);
        if(eliminado.data){
            toast.success(eliminado.data.mensaje)
        }

        // setTimeout(() => {
        //     window.location.reload(false);
        // }, 3000);

    } catch (error) {
        console.error("El servidor no responde");
    }

}

export async function axiosGetColor (urlGet, newColor) {
    //console.log('paso por aqui', newColor)


    try {
        const response = await axios.get(urlGet);
        let respuesta = []

        response.data.data.map(dato => {
                //console.log(dato.color)
                //console.log(color)
                return respuesta.push(dato.color)
                //return respuesta
            }
        )
        return respuesta
        //console.log(respuesta)

        //return respuesta

        // //validar unique
        // if(response.data.error){
        //     toast.error(response.data.mensaje)

        // }
        // //validar estado inactivo
        // if(response.data.data.estado === 'I'){

        // }



        // const respuesta = response.data.data
        // return respuesta

    } catch (error) {
        console.error("El servidor no responde");
    }

}



