import queryString from 'query-string'
import medidasTypes from '../types/medidas'
import config from '../../config'
import Axios from '../../Axios'

const getMedidas = (filter) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/medidas?${queryString.stringify(filter)}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: medidasTypes.GET_MEDIDAS,
          payload: data.medidas
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getMedidasByEtapa = (id, filter) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${
        config.services.prestaciones
      }/medidas/asociation/${id}?${queryString.stringify(filter)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createMedida = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.prestaciones}/medidas`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const updateMedida = (idMedida, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/medidas/${idMedida}/actualizar`,
      values
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
const deleteMedida = (idMedida) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.prestaciones}/medidas/${idMedida}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getTipoMedida = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/medidas/tipos-medidas`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getTipoDato = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/medidas/tipo-datos`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const getUnidadMedida = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/medidas/unidad-medidas`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const asignarMedida = (id, etapas) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.prestaciones}/medidas/asociation`, {
      id_etapa: id,
      medidas: etapas
    })
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
export default {
  createMedida,
  getMedidas,
  updateMedida,
  deleteMedida,
  getMedidasByEtapa,
  asignarMedida,
  getTipoMedida,
  getTipoDato,
  getUnidadMedida
}
