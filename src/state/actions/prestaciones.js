import queryString from 'query-string'
import Axios from '../../Axios'
import prestacionesTypes from '../types/prestaciones'
import config from '../../config'

const getPrestaciones = (pagefilter) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/prestaciones?${queryString.stringify(
        pagefilter
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: prestacionesTypes.GET_PRESTACIONES,
          payload: data.prestaciones
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getPrestacionesWithoutDispatch = async () => {
  try {
    const { data } = await Axios.get(
      `${config.services.prestaciones}/prestaciones`
    )
    return data
  } catch (error) {
    throw new Error(error)
  }
}

const createPrestaciones = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestaciones/new-prestacion`,
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

const deletePrestaciones = (values, id) => () =>
  new Promise((resolve, reject) => {
    Axios.put(
      `${config.services.prestaciones}/prestaciones/delete-prestacion/${id}`,
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

const setPrestacion = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/prestaciones/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: prestacionesTypes.GET_SELECTED_PRESTACION,
          payload: data.prestacion
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const emptyPrestacion = () => (dispatch) =>
  dispatch({
    type: prestacionesTypes.GET_SELECTED_PRESTACION,
    payload: {}
  })

const editPrestacion = (description, id) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.prestaciones}/prestaciones/${id}`, description)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getEtapas = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/prestaciones/get-etapas/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: prestacionesTypes.GET_ETAPAS,
          payload: data.etapas
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getEmptyEtapas = () => (dispatch) =>
  dispatch({
    type: prestacionesTypes.GET_ETAPAS,
    payload: []
  })

const createEtapa = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestaciones/create-etapa`,
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

const asociateEtapa = (id, etapa) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestaciones/asociate-etapa/${id}`,
      { id_etapa: etapa }
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deletePrestacion = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.put(
      `${config.services.prestaciones}/prestaciones/delete-prestacion/${id}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const editEtapa = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestaciones/update-etapa/${id}`,
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

const deleteEtapa = (id, idEtapa) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestaciones/delete-etapa/${id}`,
      idEtapa
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getBeneficiaryType = () => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/prestaciones/beneficiary/type`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: prestacionesTypes.GET_BENEFICIARY_TYPE,
          payload: data.beneficiaryType
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createAsociationTypePrestacion = (id, idType) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestaciones/beneficiary/type/${id}`,
      idType
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getAsociationTypePrestacion = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/prestaciones/beneficiary/type/${id}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: prestacionesTypes.GET_TYPE,
          payload: data.type
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteAsociationTypePrestacion = (id, idBeneficiario) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestaciones/delete/beneficiary/type/${id}`,
      idBeneficiario
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: prestacionesTypes.GET_TYPE,
          payload: data.type
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const prestacionesActions = {
  getPrestaciones,
  createPrestaciones,
  deletePrestaciones,
  setPrestacion,
  emptyPrestacion,
  editPrestacion,
  getEtapas,
  getEmptyEtapas,
  createEtapa,
  asociateEtapa,
  editEtapa,
  deleteEtapa,
  deletePrestacion,
  getBeneficiaryType,
  createAsociationTypePrestacion,
  getAsociationTypePrestacion,
  deleteAsociationTypePrestacion,
  getPrestacionesWithoutDispatch
}

export default prestacionesActions
