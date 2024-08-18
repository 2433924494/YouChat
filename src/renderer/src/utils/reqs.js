const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:5050'

function getCheckCode() {
  axios({
    method: 'POST',
    url: '/api/account/checkCode',
    data: {}
  }).then(
    (response) => {
      console.log(response.data)
      return response.data
    },
    (error) => {
      console.log('错误', error.message)
    }
  )
}

export default { getCheckCode }
// import './src/renderer/src/utils/Requests.js'
// let result = await Request({
//   url: '/account/checkCode'
// })
// console.log(result.data)
