import { getFile } from '@/serve/getFile.js'
import { ref, watchEffect } from 'vue'

const changeCode = (url, fileName, codeArr) => {
  getFile(`/self${url}`).then(res => {
    codeArr.value.push({
      fileName,
      codeStr: res
    })
  }).catch(err => {
    console.log(err)
  })
}

export const useCodeArr = (urlArr) => {
  const codeArr = ref([])
  watchEffect(() => {
    if (typeof urlArr === 'string') {
      changeCode(urlArr, 'index.js', codeArr)
    }else if (Array.isArray(urlArr)) {
      urlArr.forEach(item => {
        changeCode(item.url, item.name, codeArr)
      })
    }
  })
  return codeArr
}
