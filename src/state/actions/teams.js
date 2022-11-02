import queryString from 'query-string'
import Axios from '../../Axios'
import teamsTypes from '../types/teams'
import config from '../../config'
// import { dispatch } from 'react-hot-toast/dist/core/store'

const getTeams = (pagefilter) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/equipos?${queryString.stringify(
        pagefilter
      )}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: teamsTypes.GET_TEAMS,
          payload: data.equipos.rows
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

const createTeam = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.prestaciones}/equipos`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const editTeam = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.prestaciones}/equipos/${id}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const DeleteTeam = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.prestaciones}/equipos/eliminar/${id}`)
      .then((response) => {
        const { data } = response
        dispatch({ type: teamsTypes.DELETE_ONE_TEAM, payload: id })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const getOneTeam = (id) => () =>
  new Promise((resolve, reject) => {
    Axios.get(`${config.services.prestaciones}/equipos/${id}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const createTeamMate = (id, values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(
      `${config.services.prestaciones}/equipos/integrantes/${id}`,
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

const deleteTeamMate = (idTeam, memberId) => () =>
  new Promise((resolve, reject) => {
    Axios.put(
      `${config.services.prestaciones}/equipos/eliminar/integrantes/${idTeam}`,
      { id_integrante: memberId }
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const editTeamMate = (idTeam, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(
      `${config.services.prestaciones}/equipos/integrantes/${idTeam}`,
      { integrantes: values } // [{ rut nombre apellidos}]
    )
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const teamsActions = {
  getTeams,
  createTeam,
  editTeam,
  DeleteTeam,
  getOneTeam,
  createTeamMate,
  deleteTeamMate,
  editTeamMate
}

export default teamsActions
