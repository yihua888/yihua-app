<template>
  <basePage v-bind="config" :tableData="cpnList">
    <template #handler="{ row }">
      <el-button v-if="isOpration('viewCpn')"  @click="showCpn(row)">查看</el-button>
    </template>
  </basePage>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from "@/router";
import basePage from '@/highCpn/basePage/index.vue'
import  cpns from '@/components/index.js'
import { isOpration } from '@/hooks/useOpration'
import config from './cpnViews.config'

const cpnList = ref(cpns)

const store = useStore()

const showCpn = (row) => {
  store.commit('cpnModule/changeCpnInfo', row)
  router.push('/main/cpninfo')
}
</script>

