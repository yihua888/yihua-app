import { ElMessage } from 'element-plus'

export const copyStr = (data) => {
  let inputElement = document.createElement('input')
  inputElement.value = data
  document.body.appendChild(inputElement)
  inputElement.select(); // 选中文本
  document.execCommand('copy'); // 执行浏览器复制命令
  inputElement.remove()
  ElMessage.success('复制成功')
}
