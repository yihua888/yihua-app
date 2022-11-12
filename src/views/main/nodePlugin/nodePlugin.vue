<template>
    <basePage v-bind="config" :tableData="nodelist">
        <template #handler="{ row }">
            <el-button @click="showCode(row)">查看</el-button>
        </template>
    </basePage>
</template>

<script setup>
import { useStore } from 'vuex'
import router from "@/router";
import basePage from '@/highCpn/basePage/index.vue'
import nodelist from '@plugin/info.json'
import config from  './mycase.config'

const store = useStore()
const showCode = row => {
    store.commit('nodeCodeModule/changeNodeCodeInfo', row)
    router.push('/main/codeInfo')
}
</script>