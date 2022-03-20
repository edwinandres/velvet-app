
import {useState, useEffect} from 'react'


const useFetch = url => {

    const [ data, setData] = useState([])
    const [ loading, setLoading] = useState(true)
    const [ error, setError] = useState(null)


    useEffect(() => {
        
        const fetchResource = async () => {

            try {
                let res = await fetch(url)
                let data = await res.json()
                setData(data)
                setLoading(false)
                      
    
            } catch (error) {
               setLoading(false)
               setError(error)
                
            }
        }
        fetchResource()

    }, [url])

    return {data, loading, error}


}

export default useFetch






// fetch('https://jsonplaceholder.typicode.com/todos', {
//     method: 'PUT',
//     body: JSON.stringify({
//         id: 1,             
//         name: "Taylor",
//         surname: "Swift"
//     }),
//     headers: {
//         "Content-type": "application/json"
//     })
// .then(response => response.json())
// .then(json => console.log(json))