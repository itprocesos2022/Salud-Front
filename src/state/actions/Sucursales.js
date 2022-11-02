import queryString from 'query-string'
import Axios from '../../Axios'
import sucursalesTypes from '../types/sucursales'
import config from '../../config'
// crear sucursal, listar sucursales por prestador,

const getSucursales = (pagefilter) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/sucursales?${queryString.stringify(
        pagefilter
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: sucursalesTypes.GET_SUCURSALES,
          payload: data.sucursales
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getOneSucursal =
  (id, handleDispatch = true) =>
  (dispatch) =>
    new Promise((resolve, reject) => {
      Axios.get(`${config.services.prestaciones}/sucursales/one/${id}`)
        .then((response) => {
          const { data } = response
          if (handleDispatch) {
            dispatch({
              type: sucursalesTypes.GET_SUCURSALES_DETAILS,
              payload: data
            })
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err.response.data.detail)
        })
    })

const createSucursal = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.prestaciones}/sucursales`, {
      direccion_sucursal: values.direccion_sucursal,
      region_sucursal: values.region_sucursal,
      comuna_sucursal: values.comuna_sucursal,
      tipo_sucursal: values.tipo_sucursal,
      telefono_sucursal: parseInt(values.telefono_sucursal, 10),
      email_sucursal: values.email_sucursal,
      prestador_id: parseInt(values.prestador_id, 10),
      nombre_prestador: values.nombre_prestador,
      nombre_sucursal: values.nombre_sucursal
    })
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getSucursalesByPrestador = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/sucursales/prestador?prestador_id=${id}`
    )
      .then((response) => {
        const { data } = response
        resolve(data.sucursal)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const editSucursal = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.prestaciones}/sucursales/edit/${id}`, {
      direccion_sucursal: values.direccion_sucursal,
      region_sucursal: values.region_sucursal,
      comuna_sucursal: values.comuna_sucursal,
      tipo_sucursal: values.tipo_sucursal,
      telefono_sucursal: parseInt(values.telefono_sucursal, 10),
      email_sucursal: values.email_sucursal,
      prestador_id: parseInt(values.prestador_id, 10),
      nombre_prestador: values.nombre_prestador,
      nombre_sucursal: values.nombre_sucursal
    })
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const deleteSucursal = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.prestaciones}/sucursales/delete/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const asignarPrestacion = (id, prestaciones) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/prestaciones/sucursal/${id}`,
      prestaciones
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const asignarEquipo = (id, equipo) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.prestaciones}/equipos/sucursal/${id}`, equipo)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const sucursalActions = {
  getSucursales,
  getOneSucursal,
  createSucursal,
  getSucursalesByPrestador,
  editSucursal,
  deleteSucursal,
  asignarPrestacion,
  asignarEquipo
}

export default sucursalActions
