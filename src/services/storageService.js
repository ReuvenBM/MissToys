export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

const ENTITY_TYPE = 'toyDB'

function query(delay = 100) {
  const entities = JSON.parse(localStorage.getItem(ENTITY_TYPE)) || []
  return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get(entityId) {
  const entities = await query()
  const entity = entities.find(entity => entity.id === entityId)
  if (!entity) throw new Error(`Get failed, cannot find toy with id: ${entityId}`)
  return entity
}

async function post(newEntity) {
  const entity = { ...newEntity, id: _makeId() }
  const entities = await query()
  entities.push(entity)
  _save(entities)
  return entity
}

async function put(updatedEntity) {
  const entities = await query()
  const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
  if (idx < 0) throw new Error(`Update failed, cannot find toy with id: ${updatedEntity.id}`)
  entities.splice(idx, 1, updatedEntity)
  _save(entities)
  return updatedEntity
}

async function remove(entityId) {
  const entities = await query()
  const idx = entities.findIndex(entity => entity.id === entityId)
  console.log(entities)
  console.log(idx)
  if (idx < 0) throw new Error(`Remove failed, cannot find toy with id: ${entityId}`)
  entities.splice(idx, 1)
  _save(entities)
}

// Private

function _save(entities) {
  localStorage.setItem(ENTITY_TYPE, JSON.stringify(entities))
}

function _makeId(length = 5) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
