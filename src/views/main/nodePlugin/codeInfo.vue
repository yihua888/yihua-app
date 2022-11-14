<template>
    <div class="code-info">
        <div class="top">
            <span>{{ nodeCodeInfo.name }}</span>
            <span>
                <el-button type="success" :icon="CopyDocument" circle @click="copyCode" />
                <el-button size="small" @click="goback">返回</el-button>
            </span>
        </div>
        <div class="code-content">
            <codeMirror :code="codeStr" :height="700"></codeMirror>
        </div>
    </div>
</template>

<script setup>
import codeMirror from '@/components/codeMirror/index.vue'
import { computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex';
import router from '@/router'
import { CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import { getCache } from "@/utils/cache";
import { getFile } from '@/serve/getFile.js'

const store = useStore()

const codeStr = ref("")
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

watchEffect(()=>{
    changeCode(nodeCodeInfo.value.codeUrl)
})
const goback = () => router.go(-1)

const copyCode = () => {
    const data = codeStr.value
    let inputElement = document.createElement("input");
    inputElement.value = data;
    document.body.appendChild(inputElement);
    inputElement.select(); //选中文本
    document.execCommand("copy"); //执行浏览器复制命令
    inputElement.remove();
    ElMessage.success("复制成功");
};
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
}

.json-box ::v-deep .el-textarea__inner {
    height: 600px;
    margin-bottom: 24px;
}
</style>