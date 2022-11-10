<template>
  <div class="content">
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
    <el-dialog :title="cpnInfo.label" v-model="showCpnE" width="80%">
      <div class="cpn-info">
        <div class="left">
          <div class="f-bold">组件示例：</div>
          <div class="center">
            <component :is="cpnInfo.name"></component>
          </div>
        </div>
        <div class="right">
          <div class="f-bold">组件名称：</div>
          <div class="ml24">{{ cpnInfo.label }}</div>
          <div class="f-bold">组件介绍：</div>
          <div class="ml24">{{ cpnInfo.info.info }}</div>
          <div class="f-bold">组件属性：</div>
          <li class="ml24" v-for="item in cpnInfo.info.attr" :key="item">{{ item }}</li>
          <div class="f-bold">组件方法：</div>
          <li class="ml24" v-for="item in cpnInfo.info.methods" :key="item">{{ item }}</li>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dragCpn from '/src/components/dragCpn/test.vue'
import dragCpnInfo from '/src/components/dragCpn/info.json'

const eventAligin = 'center'
const cpnList = [
  { name: 'dragCpn', id: 1, label: '可拖拽树形组件', info: dragCpnInfo }
]

const cpnInfo = ref({})
const showCpnE = ref(false)
const showCpn = (row) => {
  cpnInfo.value = row
  showCpnE.value = true
}
</script>

<style lang="scss" scoped>
.cpn-info {
  text-align: left;
  display: flex;

  .left {
    width: 30%;
    .center{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  .right {
    width: 70%;
    line-height: 30px;
    border-left: 1px #CCC dashed;
    padding-left: 24px;
    overflow-y: auto;
    max-height: 600px;
  }
}

.content {
  padding: 20px;
}
</style>