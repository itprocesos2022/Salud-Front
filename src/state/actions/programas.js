import queryString from 'query-string'
import Axios from '../../Axios'
import programasTypes from '../types/programas'
import config from '../../config'

const getProgramas = (pagefilter) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.programs}/programas?${queryString.stringify(
        pagefilter
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: programasTypes.GET_PROGRAMAS,
          payload: data.programas
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getOnePrograma = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.programs}/programas/${id}`)
      .then((response) => {
        // console.log(response)
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

// const editPrestador = (id, values) => () =>
//   new Promise((resolve, reject) => {
//     Axios.put(`${config.services.prestaciones}/prestadores/${id}`, values)
//       .then((response) => {
//         const { data } = response
//         resolve(data)
//       })
//       .catch((err) => {
//         reject(err.response.data.detail)
//       })
//   })

// const getPrestacionByPrestador = (id) => () =>
//   new Promise((resolve, reject) => {
//     Axios.get(`${config.services.prestaciones}/prestadores/prestaciones/${id}`)
//       .then((response) => {
//         const { data } = response
//         resolve(data)
//       })
//       .catch((err) => {
//         reject(err.response.data.detail)
//       })
//   })

// const getPrestacionNoAsignadas = (id) => () =>
//   new Promise((resolve, reject) => {
//     Axios.get(
//       `${config.services.prestaciones}/prestadores/get-prestaciones/${id}`
//     )
//       .then((response) => {
//         const { data } = response
//         resolve(data)
//       })
//       .catch((err) => {
//         reject(err.response.data.detail)
//       })
//   })

// const asignarPrestacion = (id, prestaciones) => () =>
//   new Promise((resolve, reject) => {
//     Axios.post(
//       `${config.services.prestaciones}/prestadores/add-prestaciones/${id}`,
//       prestaciones
//     )
//       .then((response) => {
//         const { data } = response
//         resolve(data)
//       })
//       .catch((err) => {
//         reject(err.response.data.detail)
//       })
//   })

const deletePrograma = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.programs}/programas/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({
          type: programasTypes.DELETE_PROGRAMA,
          payload: id
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const createPrograma = (values) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.programs}/programas/create-programa`, values)
      .then((response) => {
        const { data } = response
        dispatch({
          type: programasTypes.NEW_PROGRAMA,
          payload: data.programa
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const editPrograma = (values) => {
  const { id } = values
  delete values.id
  return Axios.put(`${config.services.programs}/programas/${id}`, values)
}

// const updatePrestadores = (value) => (dispatch) =>
//   dispatch({
//     type: prestacionesTypes.UPDATE_PRESTADORES,
//     payload: value
//   })

// const prestacionesActions = {
//   getPrestadores,
//   getOnePrestador,
//   editPrestador,
//   getPrestacionByPrestador,
//   getPrestacionNoAsignadas,
//   asignarPrestacion,
//   createPrestador,
//   deletePrestador,
//   updatePrestadores
// }

const programasActions = {
  getProgramas,
  createPrograma,
  getOnePrograma,
  deletePrograma,
  editPrograma
}

export default programasActions
