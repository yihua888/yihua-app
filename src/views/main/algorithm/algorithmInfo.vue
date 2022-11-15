<template>
    <div class="algorithm-info">
        <div class="top">
            <span>{{ algorithmInfo.name }}</span>
            <span>
                <el-button type="primary" size="small" @click="goback">返回</el-button>
            </span>
        </div>
        <div class="title">
           <span class="f-bold">题目：</span> {{ algorithmInfo.info }}
        </div>
        <div class="code-content">
            <div v-for="codeItem in codeArr" :key="codeItem.fileName">
                <div class="copy-box">
                    <span>{{ codeItem.fileName }}</span>
                    <el-button type="success" :icon="CopyDocument" circle @click="copyStr(codeItem.codeStr)" />
                </div>
                <codeMirror :code="codeItem.codeStr" ></codeMirror>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex';
import router from '@/router'
import { CopyDocument } from '@element-plus/icons-vue'
import codeMirror from '@/components/codeMirror/index.vue'
import { getCache } from "@/utils/cache";
import { getFile } from '@/serve/getFile.js'
import {useCodeArr} from '@/hooks/useCodeArr.js'
import { copyStr } from '@/utils/copy'

const store = useStore()

const changeCode = (url) => {
    getFile(`/self${url}`).then(res => {
        codeStr.value = res
    }).catch(err => {
        console.log(err);
    })
}
const algorithmInfo = computed(() => {
    let info = store.state.algorithmModule.algorithmInfo
    if (!info.name) {
        info = getCache("algorithmInfo")
        store.commit('algorithmModule/changeAlgorithmInfo', info)
    }
    return info
})

console.log(algorithmInfo.value);
const codeArr = useCodeArr(algorithmInfo.value.codeUrl)

const goback = () => router.go(-1)
</script>

  
<style scoped lang="scss">
.algorithm-info {
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

    .title{
        border-bottom: 1px #ccc dashed ;
        padding-bottom: 24px;
    }

    .code-content {
        flex: 1;
        overflow: auto;
    }
    .copy-box{
        display: flex;
        justify-content: space-between;
        margin : 24px;
    }
}

.json-box ::v-deep .el-textarea__inner {
    height: 600px;
    margin-bottom: 24px;
}
</style>