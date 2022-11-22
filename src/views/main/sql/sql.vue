<template>
    <basePage v-bind="config" :tableData="sqlList">
        <template #handler="{ row }">
            <el-button @click="showCode(row)">查看</el-button>
        </template>
    </basePage>
</template>

<script setup>
import { useStore } from 'vuex'
import router from "@/router";
import basePage from '@/highCpn/basePage/index.vue'
import sqlList from '@static/sql/info.json'
import config from  './sql.config'

const store = useStore()
const showCode = row => {
    router.push('/main/sqlInfo?codeUrl='+ row.codeUrl)
}
</script>