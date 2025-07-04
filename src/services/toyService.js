import { storageService } from './storageService.js'
import { utilService } from './util.service.js'

export const toyService = {
  query,
  getById,
  remove,
  save,
  getDefaultFilter,
  getFilterFromSearchParams
}

const STORAGE_KEY = 'toyDB'
_createToys()

async function query(filterBy) {
  try {
    let toys = await storageService.query(STORAGE_KEY)

    // סינון לפי פילטרים
    if (filterBy) {
      const { name = '', labels = [], inStock, sortBy } = filterBy

      if (name) toys = toys.filter(toy => toy.name.toLowerCase().includes(name.toLowerCase()))
      if (labels?.length) toys = toys.filter(toy => labels.every(lbl => toy.labels.includes(lbl)))
      if (inStock !== undefined) toys = toys.filter(toy => toy.inStock === inStock)

      if (sortBy === 'price') toys.sort((a, b) => a.price - b.price)
      if (sortBy === 'name') toys.sort((a, b) => a.name.localeCompare(b.name))
      if (sortBy === 'created') toys.sort((a, b) => b.createdAt - a.createdAt)
    }

    return toys
  } catch (err) {
    console.error('Failed to query toys', err)
    throw err
  }
}

function getById(toyId) {
  return storageService.get(toyId)
}

function remove(toyId) {
  return storageService.remove(toyId)
}

function save(toy) {
  if (toy.id) return storageService.put(toy)
  else {
    toy.createdAt = Date.now()
    toy.inStock = true
    return storageService.post(toy)
  }
}

function getDefaultFilter() {
  return {
    name: '',
    labels: [],
    inStock: undefined,
    sortBy: 'created'
  }
}

function getFilterFromSearchParams(searchParams) {
  const filterBy = getDefaultFilter()
  for (const key in filterBy) {
    if (searchParams.has(key)) {
      if (key === 'labels') {
        filterBy.labels = searchParams.getAll('labels')
      } else if (key === 'inStock') {
        const val = searchParams.get(key)
        filterBy.inStock = val === 'true' ? true : val === 'false' ? false : undefined
      } else {
        filterBy[key] = searchParams.get(key)
      }
    }
  }
  return filterBy
}

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = [
      {
        id: utilService.makeId(),
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true
      },
      {
        id: utilService.makeId(),
        name: 'Art Box',
        price: 80,
        labels: ['Art', 'Box game'],
        createdAt: Date.now(),
        inStock: false
      }
    ]
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}
