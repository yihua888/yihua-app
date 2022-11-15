<template>
    <basePage v-bind="config" :tableData="utilslist">
        <template #handler="{ row }">
            <el-button  @click="showUtils(row)">查看</el-button>
        </template>
    </basePage>
</template>
  
<script setup>
import { useStore } from 'vuex'
import router from "@/router";
import basePage from '@/highCpn/basePage/index.vue'
import utilslist from '@/myutilscase/info.json'
import config from './myutils.config'

const store = useStore()

const showUtils = (row) => {
    store.commit('myutilsModule/changeUtilsinfo', row)
    router.push('/main/utilsInfo')
}
</script>
  
  