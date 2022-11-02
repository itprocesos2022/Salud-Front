import queryString from 'query-string'
import Axios from '../../Axios'
import config from '../../config'

const getOperativosTerreno = (filters) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${
        config.services.prestaciones
      }/operativo-terreno?${queryString.stringify(filters)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getOperativosTerrenoDetails = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/operativo-terreno/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getOperativosDerivacion = () => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/operativo-derivacion`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createDerivation = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.prestaciones}/operativo-derivacion`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createObras = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.prestaciones}/operativo-terreno`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const deleteOperativoTerreno = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.prestaciones}/operativo-terreno/cancel/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getOperativosTerrenoByPrestadorId = (filters) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${
        config.services.prestaciones
      }/operativo-terreno/visits?${queryString.stringify(filters)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const updateOperativoTerreno = (operativoId, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(
      `${config.services.prestaciones}/operativo-terreno/${operativoId}`,
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

const createAtentcion = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.prestaciones}/atenciones`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getAtenciones = (filters) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/Atenciones?${queryString.stringify(
        filters
      )}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getOneAtencion = (filters) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${
        config.services.prestaciones
      }/atenciones/visits?${queryString.stringify(filters)}`
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const editAtencion = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.prestaciones}/Atencion/${id}`, {
      prestacion_id: values.prestacion_rut,
      etapa: values.etapa,
      medidas_id: values.medidas_id,
      trabajador_id: values.trabajador_id
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
  getOperativosTerreno,
  getOperativosDerivacion,
  createDerivation,
  createObras,
  getOperativosTerrenoDetails,
  deleteOperativoTerreno,
  getOperativosTerrenoByPrestadorId,
  updateOperativoTerreno,
  createAtentcion,
  getAtenciones,
  getOneAtencion,
  editAtencion
}
