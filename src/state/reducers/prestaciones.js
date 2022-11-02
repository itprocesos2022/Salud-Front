import prestacionesTypes from '../types/prestaciones'

const initialState = {
  list: [],
  prestacion: {},
  etapas: [],
  beneficiary_types: [],
  type: []
}

const prestacionesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case prestacionesTypes.GET_PRESTACIONES:
      return { ...state, list: payload }
    case prestacionesTypes.GET_SELECTED_PRESTACION:
      return { ...state, prestacion: payload }
    case prestacionesTypes.GET_ETAPAS:
      return { ...state, etapas: payload }
    case prestacionesTypes.GET_BENEFICIARY_TYPE:
      return { ...state, beneficiary_types: payload }
    case prestacionesTypes.GET_TYPE:
      return { ...state, type: payload }

    default:
      return state
  }
}

export default prestacionesReducer
