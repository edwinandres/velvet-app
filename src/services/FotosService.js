import axios from "axios";

import React from 'react'

export default class FotosService {
    constructor(){
        this.url = process.env.REACT_APP_URL_SERVICES + "portalesDivididos/itagui"
    }

    async list(){
        try {
            return await axios.get(this.url)
        } catch (error) {
            throw error
        }
    }
}