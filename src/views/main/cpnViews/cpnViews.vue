<template>
  <div class="content">
    <h2>组件库</h2>
    <el-table :data="cpnList" border>
      <el-table-column type="index" width="50" />
      <el-table-column prop="label" label="名称" />
      <el-table-column prop="name" label="type" />
      <el-table-column label="操作" :align="eventAligin">
        <template #default="{ row }">
          <el-button type="primary" @click="showCpn(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import dragcpn from '/src/components/dragCpn/test.vue'
import dragCpnInfo from '/src/components/dragCpn/info.json'
import svgicon from '/src/components/svgIcon/test.vue'
import svgIconInfo from '/src/components/svgIcon/info.json'
import { useStore } from 'vuex'
import router from "@/router";

const eventAligin = 'center'
const cpnList = [
  { name: 'dragcpn', id: 1, label: '可拖拽树形组件', info: dragCpnInfo , cpn:dragcpn },
  { name: 'svgicon', id: 2, label: 'svg组件', info: svgIconInfo ,  cpn:svgicon}
]

const store = useStore()

const showCpn = (row) => {
  store.commit('cpnModule/changeCpnInfo',row)
  router.push('/main/cpninfo')
}
</script>

