import { ipcMain } from 'electron'
import store from './store'
// import { da } from 'element-plus/es/locales.mjs'
const onLoginOrRegister = (callback) => {
  ipcMain.on('loginOrRegister', (e, isLogin) => {
    // console.log('Get render message:',isLogin)
    callback(isLogin)
  })
}

const onLoginSuccess = (callback) => {
  ipcMain.on('openChat', (e, config) => {
    store.initUserId(config.userId)
    store.setUserData('token', config.token)
    // TODO 增加用户配置
    callback(config)
    // TODO 初始化ws连接
  })
}
const closeWindow = (callback) => {
  ipcMain.on('closeWindow', (e) => {
    callback()
  })
}
const minimizeWindow = (callback) => {
  ipcMain.on('minimizeWindow', (e) => {
    callback()
  })
}
const maximizeWindow = (callback) => {
  ipcMain.on('maximizeWindow', (e) => {
    callback()
  })
}
const winTitleOp = (callback) => {
  ipcMain.on('winTitleOp', (e, data) => {
    callback(e, data)
  })
}
export {
  onLoginOrRegister,
  onLoginSuccess,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  winTitleOp
}
