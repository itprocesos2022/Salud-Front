import programasTypes from '../types/programas'

const initialState = {
  list: []
}

const programasReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case programasTypes.GET_PROGRAMAS:
      return { ...state, list: payload }
    case programasTypes.DELETE_PROGRAMA:
      return {
        ...state,
        list: {
          ...state.list,
          rows: state.list.rows.filter((row) => row.id !== payload)
        }
      }
    case programasTypes.NEW_PROGRAMA:
      return {
        ...state,
        list: {
          ...state.list,
          rows: [...state.list.rows, payload]
        }
      }
    // case prestacionesTypes.GET_SELECTED_PRESTACION:
    //   return { ...state, prestacion: payload }
    // case prestacionesTypes.GET_ETAPAS:
    //   return { ...state, etapas: payload }
    // case prestacionesTypes.GET_BENEFICIARY_TYPE:
    //   return { ...state, beneficiary_types: payload }
    // case prestacionesTypes.GET_TYPE:
    //   return { ...state, type: payload }

    default:
      return state
  }
}

export default programasReducer
