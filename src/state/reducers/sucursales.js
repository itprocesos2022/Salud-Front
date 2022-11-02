import sucursalesTypes from '../types/sucursales'

const initialState = {
  list: [],
  total: 0,
  sucursal: null
}

const sucursalesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case sucursalesTypes.GET_SUCURSALES:
      return { ...state, list: payload }
    case sucursalesTypes.GET_SUCURSALES_DETAILS:
      return { ...state, sucursal: payload }
    default:
      return state
  }
}

export default sucursalesReducer
