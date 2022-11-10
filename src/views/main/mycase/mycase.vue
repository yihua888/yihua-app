<template>
  <div class="content">
    <h2>案例</h2>
    <el-table :data="cpnList" border>
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="名称" />
      <el-table-column label="操作" :align="eventAligin">
        <template #default="{ row }">
          <el-button type="primary" @click="showCpn(row)" v-if="isOpration('viewCase')">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import goDB from '/src/storage/goDB/index.vue'
import indexedDB from '/src/storage/indexedDB/index.vue'
import { isOpration } from '@/hooks/useOpration'
import { useStore } from 'vuex'
import router from "@/router";

const eventAligin = 'center'
const cpnList = [
  // {  id: 1, name: '原生indexedDB',  cpn:indexedDB },
  { id: 2, name: 'goDB',  cpn:goDB}
]

const store = useStore()

const showCpn = (row) => {
  store.commit('mycaseModule/changeCaseinfo',row)
  router.push('/main/caseinfo')
}
</script>

