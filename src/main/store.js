import Store from 'electron-store'

const store = new Store()
let userId = null
let email = null

const initUserId = (_userId) => {
  userId = _userId
}
const initEmail = (_email) => {
  email = _email
}

const getEmail = () => {
  return email
}
const getUserId = () => {
  return userId
}
const setData = (key, value) => {
  store.set(key, value)
}

const getData = (key) => {
  return store.get(key)
}

const setUserData = (key, value) => {
  setData(userId + key, value)
}

const getUserData = (key) => {
  return getData(userId + key)
}
const deleteUserId = (key) => {
  store.delete(userId + key)
}
export default {
  setData,
  getData,
  initUserId,
  initEmail,
  getEmail,
  getUserId,
  setUserData,
  getUserData,
  deleteUserId
}
