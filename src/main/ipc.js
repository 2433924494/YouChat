import { ipcMain } from 'electron'

const onLoginOrRegister = (callback) => {
  ipcMain.on('loginOrRegister', (e, isLogin) => {
    // console.log('Get render message:',isLogin)
    callback(isLogin)
  })
}

const onLoginSuccess = (callback) => {
  ipcMain.on('openChat', (e, config) => {
    callback(config)
  })
}
export { onLoginOrRegister, onLoginSuccess }
