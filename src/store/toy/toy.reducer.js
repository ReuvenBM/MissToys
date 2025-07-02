const initialState = {
  toys: [],
  filterBy: null,
  isLoading: false
}

export function toyReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOYS':
      return { ...state, toys: action.toys }

    case 'ADD_TOY':
      return { ...state, toys: [...state.toys, action.toy] }

    case 'REMOVE_TOY':
      return { ...state, toys: state.toys.filter(t => t.id !== action.toyId) }

    case 'UPDATE_TOY':
      return {
        ...state,
        toys: state.toys.map(t => (t.id === action.toy.id ? action.toy : t))
      }

    case 'SET_FILTER':
      return { ...state, filterBy: action.filterBy }

    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.isLoading }

    default:
      return state
  }
}
