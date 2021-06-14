import axios from 'axios'

const Api = axios.create({baseURL: 'https://banks-restapi.herokuapp.com/api/branches'
})

export default Api