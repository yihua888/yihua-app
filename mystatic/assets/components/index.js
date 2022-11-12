import yhCodeMirror from './codeMirror/index.vue'
import yhDragCpn from './dragCpn/index.vue'
import yhForm from './form/index.vue'
import yhLabelInput from './labelInput/index.vue'
import yhSvgIcon from './svgIcon/index.vue'
import yhTable from './table/index.vue'

const cpnInfos = import.meta.globEager("@/components/**/info.json");

const cpns = Object.keys(cpnInfos).map(path=>{
  return {
    ...cpnInfos[path],
    cpnUrl:path.replace('info.json','test.vue')
  }
})

export default cpns

// 可以方便全局注册组件
export {
  yhCodeMirror,
  yhDragCpn,
  yhForm,
  yhLabelInput,
  yhSvgIcon,
  yhTable
}

