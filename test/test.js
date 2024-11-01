const axios = require('axios')
axios({
  method: 'POST',
  url: '/api/account/checkCode',
  baseURL: 'http://xg-3.frp.one:57316/',
  data: {}
}).then((response) => {
  console.log(response)
})
