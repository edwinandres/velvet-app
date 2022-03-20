import axios from "axios";

import React from 'react'

export default class EstacionesService {
    constructor(){
        //alert("entro en constructor de estacionesService")
        this.url = process.env.REACT_APP_URL_SERVICES + "estacion"
    }

    async list(){
        try {
            return await axios.get(this.url)
        } catch (error) {
            throw error
        }
    }
}