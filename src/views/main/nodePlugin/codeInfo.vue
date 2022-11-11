<template>
    <div class="code-info">
        <div class="top">
            <span>{{ nodeCodeInfo.name }}</span>
            <span>
                <el-button type="success" :icon="CopyDocument" circle  @click="copyCode" />
                <el-button size="small" @click="goback">返回</el-button>
            </span>
        </div>
        <div class="code-content">
            <codeMirror :code="nodeCodeInfo.info.codeStr" :height="700"></codeMirror>
        </div>
    </div>
</template>

<script setup>
import codeMirror from '@/components/codeMirror/index.vue'
import { computed } from 'vue'
import { useStore } from 'vuex';
import router from '@/router'
import { getCache } from "@/utils/cache";
import {CopyDocument} from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";

const store = useStore()
const nodeCodeInfo = computed(() => {
    let info = store.state.nodeCodeModule.nodeCodeInfo
    if (!info.name) {
        info = getCache("utilsinfo")
        store.commit('nodeCodeModule/changeNodeCodeInfo', info)
    }
    return info
})

const goback = () => router.go(-1)

const copyCode = () => {
    const data = nodeCodeInfo.value.info.codeStr
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