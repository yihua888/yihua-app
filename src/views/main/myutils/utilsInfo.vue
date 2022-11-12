<template>
  <div class="case-info">
    <div class="top">
      <span>{{ utilsinfo.name }}</span>
      <span>
        <el-button type="primary" size="small" @click="goback">返回</el-button>
      </span>
    </div>
    <div class="case-content">
      <component :is="cpnInstance"></component>
    </div>
  </div>
</template>
  
<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { useStore } from 'vuex';
import router from '@/router'
import { getCache } from "@/utils/cache";

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
  }
}
</style>