import axios from 'axios'
import { useState, useEffect } from 'react'

const baseUrl = 'https://banks-restapi.herokuapp.com/api/branches'

const GetBanksFromApi = async ({ city }) => {
	const request = axios.get(baseUrl + '/autocomplete', { params: { q: city } })
	const data = request.then(response => response.data)
	const data_1 = await data
	return data_1.result

}

const GetSearchCompletion = async ({ searched }) => {
	const request = axios.get(baseUrl, { params: { q: searched } })
	const data = request.then(response => response.data)
	const data_1 = await data
	return data_1.result
}

const FavoritesWithLocalStorage = (localStorageKey) => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem(localStorageKey)) || []
	)

	useEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(value))
	}, [value])

	return [value, setValue]
}

// const ResponseCache = (localStorageResponseKey) => {
// 	const [response, setResponse] = useState(
// 		JSON.parse(localStorage.getItem(localStorageResponseKey)) || {}
// 	)

// 	useEffect(() => {
// 		localStorage.setItem(localStorageResponseKey, JSON.stringify(response))
// 	}, [response])
	
// 	return [response, setResponse]
// }

export default {
	GetBanksFromApi,
	GetSearchCompletion,
	FavoritesWithLocalStorage,
	// ResponseCache
}