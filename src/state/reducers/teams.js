import teamsTypes from '../types/teams'

const initialState = {
  list: []
}

const teamsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case teamsTypes.GET_TEAMS:
      return { ...state, list: payload }
    case teamsTypes.DELETE_ONE_TEAM:
      return {
        ...state,
        list: state.list.filter((team) => team.id !== payload)
      }
    default:
      return state
  }
}

export default teamsReducer
