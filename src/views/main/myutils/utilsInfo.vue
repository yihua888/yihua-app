<template>
  <div class="case-info">
    <div class="top">
      <span>{{ utilsinfo.name }}</span>
      <span>
        <el-button type="primary"
                   size="small"
                   @click="goback">返回</el-button>
      </span>
    </div>
    <div class="case-content">
      <component :is="cpnInstance"></component>
      代码区：
      <div class="info-text"></div>
      <div v-for="codeItem in codeArr"
           :key="codeItem.fileName">
        <div class="copy-box">
          <span>文件名：{{codeItem.fileName}}</span>
          <span>
            <el-button type="success" :icon="CopyDocument" circle @click="copyStr(codeItem.codeStr)" />
          </span>
        </div>
        <codeMirror :code="codeItem.codeStr"></codeMirror>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { useStore } from 'vuex';
import router from '@/router'
import { CopyDocument } from '@element-plus/icons-vue'
import codeMirror from '@/components/codeMirror/index.vue'
import { getCache } from "@/utils/cache";
import { useCodeArr } from '@/hooks/useCodeArr.js'
import { copyStr } from '@/utils/copy'

const store = useStore()
const cpnInstance = ref('')
const utilsinfo = computed(() => {
  let info = store.state.myutilsModule.utilsinfo
  if (!info.name) {
    info = getCache("utilsinfo")
    store.commit('myutilsModule/changeUtilsinfo', info)
  }
  cpnInstance.value = defineAsyncComponent(() => import(info.caseCode))
  return info
})

const codeArr = useCodeArr(utilsinfo.value.cpnCodes)
const goback = () => router.go(-1)
</script>
  
<style scoped lang="scss">
.case-info {
  text-align: left;
  line-height: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;

  .top {
    height: 48px;
    border-bottom: 1px #ccc dashed;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .case-content {
    flex: 1;
    overflow: auto;
    .info-text {
      border-top: 1px #ccc dashed;
      margin-top: 24px;
      padding-top: 24px;
    }
    .copy-box{
      display: flex;
      justify-content: space-between;
      margin: 24px;
    }
  }
}
</style>