import { generateAxios } from './request'
const instance = generateAxios({
  timeout: 60000
})

const getFile = url => new Promise((reslove, reject) => {
  instance({
    url,
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'showLoading': false
    }
  }).then(res => {
    const reader = new FileReader()
    reader.readAsText(res, 'utf-8')
    reader.onload = function (e) {
      reslove(reader.result)
    }
  }).catch(err => {
    reject(err)
  })
})
export { getFile }
