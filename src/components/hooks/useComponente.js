import axios from 'axios'
import React ,{useState} from 'react'

const useComponente = async () => {

    const [componente, setComponente] = useState([])

    const componentes = await axios.get(process.env.REACT_APP_URL_SERVICES + '/componente/');
    setComponente(componentes)

    return componente
}

export default useComponente
