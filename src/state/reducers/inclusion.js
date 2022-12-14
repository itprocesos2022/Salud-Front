import inclusionTypes from '../types/inclusion'

const initialState = {
  stats: {},
  inclusionCases: [],
  chargeMethods: [],
  totalPages: 0,
  approbation: null,
  rejection: null,
  inclusionCaseDetails: null
}

const inclusionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case inclusionTypes.GET_INCLUSION_CASES:
      return { ...state, inclusionCases: payload }
    case inclusionTypes.GET_INCLUSIONCASE_DETAILS:
      return { ...state, inclusionCaseDetails: payload }
    case inclusionTypes.GET_CHARGE_METHODS:
      return { ...state, chargeMethods: payload }
    case inclusionTypes.GET_CASE_APPROBATION_DETAILS:
      return { ...state, approbation: payload }
    case inclusionTypes.GET_CASE_REJECTION_DETAILS:
      return { ...state, rejection: payload }
    case inclusionTypes.GET_DASHBOARD_STATS:
      return { ...state, stats: payload }
    default:
      return state
  }
}

export default inclusionReducer
