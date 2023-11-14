import.meta.env.VITE_BASE_URL_1



import React, { useRef, useEffect, useState } from "react";
import useSWR from 'swr'

const getNewAccessToken = async () => {
  // pegar novo access token
  const headers = {
    'Content-type': 'application/json'
  }
  const getAccessToken = {
    query: `
      mutation getAccessToken($refreshToken: String!){
        accessToken(refreshToken: $refreshToken)
      }
    `,
    variables: {
      refreshToken: localStorage.getItem('refreshToken')
    }
  }
  const resAccessToken = await fetch(import.meta.env.VITE_BASE_URL_1, {
    headers,
    method: 'POST',
    body: JSON.stringify(getAccessToken)
  })
  try {
    const jsonAccessToken = await resAccessToken.json()
    return jsonAccessToken
  } catch (err) {}
}

const fetcher = async query => {
  const accessToken = localStorage.getItem('accessToken')
  const headers = {
    'Content-type': 'application/json'
  }
  if (accessToken) {
    headers['authorization'] = 'Bearer ' + accessToken
  }
  const res = await fetch(import.meta.env.VITE_BASE_URL_1, {
    headers,
    method: 'POST',
    body: query
  })
  const json = await res.json()
  if (
    !(
      json.errors &&
      json.errors[0] &&
      json.errors[0].message === 'Forbidden resource'
    )
  ) {
    return json
  }
  const jsonAccessToken = await getNewAccessToken()
  if (jsonAccessToken.data) {
    const newAccessToken = jsonAccessToken.data.accessToken
    localStorage.setItem('accessToken', newAccessToken)

    const res2 = await fetch(import.meta.env.VITE_BASE_URL_1, {
      headers: {
        'Content-type': 'application/json',
        authorization: 'Bearer ' + newAccessToken
      },
      method: 'POST',
      body: query
    })
    const json2 = await res2.json()
    if (!json2.errors) {
      return json2
    }
  }
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  window.location = '/'
  return null
}
const uploader = async formData => {
  const accessToken = localStorage.getItem('accessToken')
  const headers = {}
  if (accessToken) {
    headers['authorization'] = 'Bearer ' + accessToken
  }
  const res = await fetch(import.meta.env.VITE_BASE_URL_1, {
    headers,
    method: 'POST',
    body: formData
  })
  const json = await res.json()
  if (!json.errors) {
    return json
  }

  const jsonAccessToken = await getNewAccessToken()
  if (jsonAccessToken.data) {
    const newAccessToken = jsonAccessToken.data.accessToken
    localStorage.setItem('accessToken', newAccessToken)
    const res2 = await fetch(import.meta.env.VITE_BASE_URL_1, {
      headers: {
        authorization: 'Bearer ' + newAccessToken
      },
      method: 'POST',
      body: formData
    })
    const json2 = await res2.json()
    if (!json2.errors) {
      return json2
    }
  }
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  window.location = '/'
  return null
}

const useQuery = queryStr => {
  const query = {
    query: queryStr
  }
  const allData = useSWR(JSON.stringify(query), fetcher, {
    refreshInterval: 100000  })
  const { data, ...rest } = allData
  return { data: data ? data.data : null, ...rest }
}
const useMutation = query => {
  const [data, setData] = useState(null)
  const mutate = async variables => {
    const mutation = {
      query,
      variables
    }
    try {
      const returnedData = await fetcher(JSON.stringify(mutation))
      setData(returnedData)
      return returnedData
    } catch (err) {}
  }
  return [data, mutate]
}

const useUpload = query => {
  const [data, setData] = useState(null)
  const mutate = async variables => {
    const mutation = {
      query,
      variables: {
        ...variables,
        file: null
      }
    }
    const map = {
      0: ['variables.file']
    }
    const formData = new FormData()
    formData.append('operations', JSON.stringify(mutation))
    formData.append('map', JSON.stringify(map))
    formData.append(0, variables.file)

    try {
      const returnedData = await uploader(formData)
      setData(returnedData)
      return returnedData
    } catch (err) {}
  }
  return [data, mutate]
}

export { useQuery, useMutation, fetcher, useUpload }
