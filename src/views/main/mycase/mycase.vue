<template>
   <basePage v-bind="config" :tableData="caselist">
    <template #handler="{ row }">
     <el-button @click="showCase(row)" v-if="isOpration('viewCase')">查看</el-button>
    </template>
  </basePage>
</template>

<script setup>
import { useStore } from 'vuex'
import router from "@/router";
import { isOpration } from '@/hooks/useOpration'
import basePage from '@/highCpn/basePage/index.vue'
import caselist from '@/case/info.json'
import config from  './mycase.config'

const store = useStore()
const showCase = (row) => {
  store.commit('mycaseModule/changeCaseinfo', row)
  router.push('/main/caseinfo')
}
</script>

