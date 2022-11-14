<template>
  <div class="cpn-info">
    <div class="top">
      <el-button   type="primary" size="small" @click="goback">返回</el-button>
    </div>
    <div class="cpn-content">
      <div>
        <div class="f-bold">组件示例：</div>
        <div class="center">
          <component :is="cpnInstance"></component>
        </div>
      </div>
      <div>
        <div v-if="cpnInfo.label">
          <div class="f-bold info-text">组件名称：</div>
          <div class="ml24">{{ cpnInfo.label }}</div>
        </div>
        <div v-if="cpnInfo.blog">
          <div class="f-bold info-text">博客地址：</div>
          <div class="ml24">
            <a :href="cpnInfo.blog" target="_blank">{{cpnInfo.label}}</a>
          </div>
        </div>
        <div v-if="cpnInfo.info ">
          <div class="f-bold info-text">组件介绍：</div>
          <div class="ml24">{{ cpnInfo.info }}</div>
        </div>
        <div v-if="cpnInfo.attr && cpnInfo.attr.length">
          <div class="f-bold info-text">组件属性：</div>
          <li class="ml24"
              v-for="item in cpnInfo.attr"
              :key="item">{{ item }}</li>
        </div>
        <div v-if="cpnInfo.methods && cpnInfo.methods.length">
          <div class="f-bold info-text">组件方法：</div>
          <li class="ml24"
              v-for="item in cpnInfo.methods"
              :key="item">{{ item }}</li>
        </div>
         <div v-if="cpnInfo.slots && cpnInfo.slots.length">
          <div class="f-bold info-text">插槽：</div>
          <li class="ml24"
              v-for="item in cpnInfo.slots"
              :key="item">{{ item }}</li>
        </div>
      <div class="info-text">
        代码区：
      </div>
      <div v-for="codeItem in codeArr"
           :key="codeItem.fileName">
        <div class="copy-box">
          <span>文件名：{{codeItem.fileName}}</span>
          <span>
            <el-button type="success" :icon="CopyDocument" circle @click="copyStr(codeItem.codeStr)" />
          </span>
        </div>
        <codeMirror :code="codeItem.codeStr"
                    :height="700"></codeMirror>
      </div>
      </div>
    </div>
    <el-backtop target=".cpn-info .cpn-content" :right="60" :bottom="60"></el-backtop>
  </div>
</template>

<script setup>
import { computed , defineAsyncComponent , ref} from 'vue'
import { useStore } from 'vuex';
import router from '@/router'
import { CopyDocument } from '@element-plus/icons-vue'
import codeMirror from '@/components/codeMirror/index.vue'
import { getCache } from "@/utils/cache";
import { useCodeArr } from '@/hooks/useCodeArr.js'
import { copyStr } from '@/utils/copy'

const cpnInstance = ref('')
const store = useStore()
const cpnInfo = computed(() => {
  let info = store.state.cpnModule.cpnInfo
  if(!info.name){
    info = getCache("cpnInfo")
    store.commit('cpnModule/changeCpnInfo',info)
  }
  cpnInstance.value = defineAsyncComponent(()=>import(info.cpnUrl))
  return info
})

const codeArr = useCodeArr(cpnInfo.value.cpnCodes)
const goback = () => router.go(-1)
</script>

<style lang="scss" scoped>
.cpn-info {
  text-align: left;
  line-height: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .top {
    height: 48px;
    border-bottom: 1px #ccc dashed;
    margin-bottom: 10px;
    text-align: end;
  }
  .cpn-content {
    flex: 1;
    overflow: auto;
  }
  .info-text {
    border-top: 1px #ccc dashed;
    margin-top: 24px;
    padding-top: 24px;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
   .copy-box{
      display: flex;
      justify-content: space-between;
      margin: 24px;
    }
}

.content {
  padding: 20px;
}
</style>