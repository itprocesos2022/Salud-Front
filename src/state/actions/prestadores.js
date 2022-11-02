import queryString from 'query-string'
import Axios from '../../Axios'
import prestacionesTypes from '../types/prestadores'
import config from '../../config'

const getPrestadores = (pagefilter) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/prestadores?${queryString.stringify(
        pagefilter
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: prestacionesTypes.GET_PRESTADORES,
          payload: data.prestadores
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getOnePrestador = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/prestadores/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const editPrestador = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.prestaciones}/prestadores/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getPrestacionByPrestador = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/prestadores/prestaciones/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getPrestacionNoAsignadas = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/prestadores/get-prestaciones/${id}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const asignarPrestacion = (id, prestaciones, precios) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestadores/add-prestaciones/${id}`,
      { ...prestaciones, precios }
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deletePrestador = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.prestaciones}/prestadores/eliminar/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createPrestador = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestadores/create-prestador`,
      values
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updatePrestadores = (value) => (dispatch) =>
  dispatch({
    type: prestacionesTypes.UPDATE_PRESTADORES,
    payload: value
  })

const prestacionesActions = {
  getPrestadores,
  getOnePrestador,
  editPrestador,
  getPrestacionByPrestador,
  getPrestacionNoAsignadas,
  asignarPrestacion,
  createPrestador,
  deletePrestador,
  updatePrestadores
}

export default prestacionesActions
