import { generateAxios } from './request'
import { createdReturn } from './utils'
const instance = generateAxios({
  timeout: 60000,
})

const getFile = url => new Promise(async (reslove, reject) => {
  const rst = await instance.get(url)
  createdReturn(rst, reslove, reject)
})
export { getFile }
