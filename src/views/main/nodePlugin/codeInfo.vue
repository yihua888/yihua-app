<template>
    <div class="code-info">
        <div class="top">
            <span>{{ nodeCodeInfo.name }}</span>
            <span>
                <el-button type="primary" size="small" @click="goback">返回</el-button>
            </span>
        </div>
        <div class="code-content">
            <div v-for="codeItem in codeArr" :key="codeItem.fileName">
                <div class="copy-box">
                    <el-button type="success" :icon="CopyDocument" circle @click="copyStr(codeItem.codeStr)" />
                </div>
                <codeMirror :code="codeItem.codeStr"></codeMirror>
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
const nodeCodeInfo = computed(() => {
    let info = store.state.nodeCodeModule.nodeCodeInfo
    if (!info.name) {
        info = getCache("nodeCodeInfo")
        store.commit('nodeCodeModule/changeNodeCodeInfo', info)
    }
    return info
})

const codeArr = useCodeArr(nodeCodeInfo.value.codeUrl)

const goback = () => router.go(-1)
</script>

  
<style scoped lang="scss">
.code-info {
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

    .code-content {
        flex: 1;
        overflow: auto;
    }
    .copy-box{
        text-align: end;
        margin : 24px;
    }
}

.json-box ::v-deep .el-textarea__inner {
    height: 600px;
    margin-bottom: 24px;
}
</style>