import { toyService } from './toy.reducer.js'
import { store } from '../store.js'
import {
  SET_TOYS,
  ADD_TOY,
  UPDATE_TOY,
  REMOVE_TOY,
  SET_FILTER,
  SET_IS_LOADING
} from './toy.reducer.js'

export async function loadToys() {
  try {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const toys = await toyService.query(filterBy)
    store.dispatch({ type: SET_TOYS, toys })
  } catch (err) {
    console.error('Error loading toys:', err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.error('Error removing toy:', err)
    throw err
  }
}

export async function saveToy(toyToSave) {
  try {
    const savedToy = await toyService.save(toyToSave)
    const type = toyToSave.id ? UPDATE_TOY : ADD_TOY
    store.dispatch({ type, toy: savedToy })
    return savedToy
  } catch (err) {
    console.error('Error saving toy:', err)
    throw err
  }
}

export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER, filterBy })
}
