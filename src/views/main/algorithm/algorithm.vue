<template>
    <basePage v-bind="config" :tableData="list">
        <template #handler="{ row }">
            <el-button @click="showCode(row)">查看</el-button>
        </template>
    </basePage>
</template>

<script setup>
import { useStore } from 'vuex'
import router from "@/router";
import basePage from '@/highCpn/basePage/index.vue'
import nodelist from '@static/plugin/info.json'
import config from  './algorithm.config'

const store = useStore()

const infos  = import.meta.globEager("@static/algorithm/**/info.json");
const list = []

Object.keys(infos).forEach(path=>{
    const item = infos[path].default
    // console.log(item);
    if(item.children && item.children.length){
        item.children.forEach(o=>{
            list.push({
                ...o,
                type:item.type,
                typeName:item.name
            })
        })
    }
})

const showCode = row => {
    store.commit('algorithmModule/changeAlgorithmInfo', row)
    router.push('/main/algorithmInfo')
}
</script>