import queryString from 'query-string'
import yearsTypes from '../types/years'
import config from '../../config'
import Axios from '../../Axios'

const getYears = (filter) => (dispatch) =>
  new Promise((resolve, reject) => {
    Axios.get(
      `${config.services.prestaciones}/years?${queryString.stringify(filter)}`
    )
      .then((response) => {
        const { data } = response
        dispatch({
          type: yearsTypes.GET_YEARS,
          payload: data.years
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })

const createYear = (values) => () =>
  new Promise((resolve, reject) => {
    Axios.post(`${config.services.prestaciones}/years`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err.response.data.detail)
      })
  })
const updateYear = (idYear, values) => () =>
  new Promise((resolve, reject) => {
    Axios.put(`${config.services.prestaciones}/years/${idYear}`, values)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
const deleteYear = (idYear) => () =>
  new Promise((resolve, reject) => {
    Axios.delete(`${config.services.prestaciones}/years/${idYear}`)
      .then((response) => {
        const { data } = response
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export default {
  getYears,
  createYear,
  updateYear,
  deleteYear
}
