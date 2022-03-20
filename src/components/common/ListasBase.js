import axios from 'axios'

export async function listademarcas(){

    
    const marca = await axios.get(process.env.REACT_APP_URL_SERVICES + '/base/marca/') 
    //console.log(marca.data.data)
    const data  = marca.data.data
    return data           
    //guardarMarcas(marca.data.data)
}

export async function listaTiemposGarantia(){

    const tiemposGarantia = await axios.get(process.env.REACT_APP_URL_SERVICES + '/tiempoGarantia/')    
    return tiemposGarantia.data.data
}