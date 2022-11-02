import prestacionesTypes from '../types/prestadores'

const initialState = {
  list: [],
  updateList: false
}

const prestacionesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case prestacionesTypes.GET_PRESTADORES:
      return { ...state, list: payload }
    case prestacionesTypes.UPDATE_PRESTADORES:
      return { ...state, updateList: payload }

    default:
      return state
  }
}

export default prestacionesReducer
