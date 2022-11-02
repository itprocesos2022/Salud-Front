import medidasTypes from '../types/medidas'

const initialState = {
  list: [],
  total: 0
}

const medidasReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case medidasTypes.GET_MEDIDAS:
      return { ...state, list: payload }
    default:
      return state
  }
}

export default medidasReducer
