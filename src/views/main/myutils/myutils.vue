<template>
    <div class="page-box">
        <div class="top">
            <h2>工具</h2>
        </div>
        <div class="content">
            <el-table :data="utilsList" border>
                <el-table-column type="index" width="50" />
                <el-table-column prop="name" label="名称" />
                <el-table-column label="操作" :align="eventAligin">
                    <template #default="{ row }">
                        <el-button type="primary" @click="showUtils(row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
  
<script setup>
import { useStore } from 'vuex'
import router from "@/router";
import jsonToExcel from '@/myutilscase/jsonToExcel/index.vue'
import ExcelToJson from '@/myutilscase/ExcelToJson/index.vue'

const eventAligin = 'center'
const utilsList = [
    { id: 1, name: 'json转excel', cpn: jsonToExcel },
    { id: 2, name: 'excel转json', cpn: ExcelToJson }
]

const store = useStore()

const showUtils = (row) => {
    store.commit('myutilsModule/changeUtilsinfo', row)
    router.push('/main/utilsInfo')
}
</script>
  
  