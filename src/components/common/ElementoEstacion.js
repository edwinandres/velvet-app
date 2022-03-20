import axios from 'axios';
import React, { useEffect, useState } from 'react'
//import { eliminarObjeto, agregarObjeto, cargarObjetos, cargarCoordenadas } from "../../common/ObjetosDinamicos";
import { agregarObjeto2, cargarObjetos, cargarObjetosDesdeState } from './ObjetosDinamicos';
import { limpiarBoxObjetos } from './ObjetosDinamicos';




const ElementoEstacion = ({componentesDisponibles, agregarInput, guardadoIndividual, estacion, componentes, componentesEstacion}) => {

    //const [prueba, setPrueba] = useState(0)
    const [ready , setReady]=useState(0)
    const [componentStation, setComponentStation] = useState(componentesEstacion)

    const [compoState, setCompoState]= useState([])


    // useEffect(() => {
    //     //alert("hola")
    //     limpiarBoxObjetos('divComponentes')
    //     cargarObjetosDesdeState(compoState, componentes,  'divComponentes','componente')
    // }, [compoState])

   
    useEffect(()=>{
        //console.log("CAMBIO")
        
        const consultarElementoEstacion = async () =>{

            const componentesEstacion = await axios.get(process.env.REACT_APP_URL_SERVICES + '/componenteEstacion/');

            setComponentStation(componentesEstacion.data.data)
            setTimeout(() => {
                //console.log(componentesEstacion.data.data, "COMPOOOOOOOOOOOOO")

                cargarObjetos(estacion, componentes, componentStation, "divComponentes", "componente", "idComponente", "idComponenteEstacion")
            }, 2000);
        }
        consultarElementoEstacion();
        //limpiarBoxObjetos('divComponentes')
        const array = []
        componentStation.map(elemento => (
            array.push(elemento.idComponente)
        ))
        setCompoState(array)
        

    },[])




    const actualizarState = () => {
        //console.log(compoState,"compoState")


        //console.log(compoState)

        compoState.map(compo => 
            (cargarObjetosDesdeState(compo, componentes, 'divComponentes'))
        )

       // cargarObjetosDesdeState(compoState, componentes, 'divEstacion')
        // alert("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        // let cantidad = 0
        // compoState.map(compo => {
        //     let elemento = compo.idComponente
        //     compoState.map((compo2,index) => {
        //         if ((elemento) = compo2.idComponente){
        //             cantidad ++
        //             if (cantidad>1){
        //                 compoState.splice(index, 1)
        //             }
        //         }


        //     })
        // })
    }



    const guardado = async (e) => {   
        
         await guardadoIndividual(e, "divComponentes", "idComponente", "/componenteEstacion/")
         limpiarBoxObjetos("divComponentes")    
         actualizarState();
         setReady(ready+1)
        // setPrueba(prueba +1)
        // 
        // const componentesEstacion = await axios.get(process.env.REACT_APP_URL_SERVICES + '/componenteEstacion/');
        // console.log(componentesEstacion.data.data, "YEAAAAAAAAAAAAAA")
    }

    const eliminarObjetosRepetidos = () => {
        //console.log(compoState, "esto es compoState")
        const unicos = []
        compoState.map(elemento => {
            if(!unicos.includes(elemento)){
                unicos.push(elemento)
            }

        })

        //console.log(unicos, "esto es unicos")
    }

    const agregarElemento = (e) => {
        //agregarInput(e);
        
        agregarObjeto2(0, componentesDisponibles, "divComponentes", "componente", "idComponente",setCompoState)
        eliminarObjetosRepetidos()
        //console.log(e.target)
        let elementosAgregar = []
        let elementosSinRepetir = []
        let childNodes = document.getElementById('divComponentes').childNodes
       // console.log(childNodes)
        childNodes.forEach(el => {
            //console.log("jijijij", el.type)
            if (el.type === "select-one") {
                // console.log(el.options[el.selectedIndex].text)
                // console.log(el.value, "val val val")
                // console.log(el.options.selectedIndex)

                
                //elementosAgregar.push({estacion: estacion, idComponente: el.value, nombre:el.options[el.selectedIndex].text})

              //  console.log(elementosAgregar, "esto es elementos a a gragera")
                elementosAgregar.map(elemento => {
                    if(!elementosSinRepetir.includes(elemento)){
                        elementosSinRepetir.push(elemento)
                     //   console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    }
                })
                setCompoState(elementosSinRepetir)
            }
        })

    }

    

    
    return (
        <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card-header"><strong>COMPONENTES DESDE ELEMENTO DE LA ESTACION</strong></div>
            <div className="card-body" id="divComponentes" name='divComponentes'>
                {/*ESPACIO DONDE SE AGREGAN SELECTS DE MANERA DINAMICA*/}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-2" style={{ "textAlign": "center", "justifyContent": "center" }}>
                <button type="button" onClick={agregarElemento} value="componentes" className="btn  btn-outline-success btn-inline "   > + </button>
                {/*<button type="button" onClick={borrarInput} value="componentes" className="btn  btn-outline-danger btn-inline ml-2 mr-2"  > - </button>*/}
            </div>
            <div className="row mt-3 mb-3" style={{ "textAlign": "center", "justifyContent": "center" }}>
                <div className='col-sm-3' >
                    <input
                        className="btn btn-md  btn-secondary row-md-20 btn-block"
                        type="button"
                        name="guardarComponentes"
                        value="Guardar componentes"
                        onClick={ e => guardado() }

                    />
                </div>
            </div>
        </div>
    )
}

export default ElementoEstacion
