import yearsTypes from '../types/years'

const initialState = {
  list: [],
  total: 0
}

const medidasReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case yearsTypes.GET_YEARS:
      return { ...state, list: payload }
    default:
      return state
  }
}

export default medidasReducer
