import axios from 'axios'
import { useState, useEffect } from 'react'
import Api from './Axios'

const GetBanksFromApi = async ({ city }) => {
	const request = Api.get('/autocomplete', {params: {q: city}})
	const data = request.then(response => response.data)
	const data_1 = await data
	return data_1

}

const GetSearchCompletion = async ({ searched }) => {
	const request = Api.get({ params: { q: searched } })
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

const ResponseCache = (localStorageResponseKey) => {
	const [response, setResponse] = useState(
		JSON.parse(localStorage.getItem(localStorageResponseKey)) || {}
	)

	useEffect(() => {
		localStorage.setItem(localStorageResponseKey, JSON.stringify(response))
	}, [response])

	return [response, setResponse]
}


export default {
	GetBanksFromApi,
	GetSearchCompletion,
	FavoritesWithLocalStorage,
	ResponseCache
}