<template>
    <div class="code-info">
        <div class="top">
            <span>{{ nodeCodeInfo.name }}</span>
            <span>
                <el-button type="primary" size="small" @click="goback">返回</el-button>
            </span>
        </div>
        <div class="code-content">
            <el-input type="textarea" clearable class="json-box" v-model="nodeCodeInfo.info.codeStr" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import router from '@/router'
import { getCache } from "@/utils/cache";

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