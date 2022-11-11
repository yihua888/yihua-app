<template>
    <div class="content">
        <h2>工具</h2>
        <el-table :data="nodeStrArr" border>
            <el-table-column type="index" width="50" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="info" label="介绍">
                <template #default="{ row }">
                    <div>
                        {{ row.info.info }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" :align="eventAligin">
                <template #default="{ row }">
                    <el-button type="primary" @click="showCode(row)">查看代码</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { readPlugins } from '@plugin/index.js'
import { useStore } from 'vuex'
import router from "@/router";
const nodeStrArr = readPlugins()
const store = useStore()
const showCode = row => { 
    store.commit('nodeCodeModule/changeNodeCodeInfo',row)
    router.push('/main/codeInfo')
}
</script>