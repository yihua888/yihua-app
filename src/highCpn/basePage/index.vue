<template>
  <div class="page-box">
    <div class="top">
      <yh-form v-bind="formConfig" v-model="formData">
        <template #footer>
          <div class="handle-btns">
            <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
            <el-button type="primary" :icon="Search" @click="handleQueryClick">搜索</el-button>
          </div>
        </template>
      </yh-form>
    </div>
    <div class="content">
      <yh-table :listData="listData" :propList="tableCol" :showFooter="false" v-bind="tableConfig" :showIndexColumn="true">
        <template v-for="item in tableSlots" :key="item.prop" #[item.slotName]="scope">
          <template v-if="item.slotName">
            <slot :name="item.slotName" :row="scope.row"></slot>
          </template>
        </template>
      </yh-table>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

import yhForm from '@/components/form/index.vue'
import yhTable from '@/components/table/index.vue'

const props = defineProps({
  formConfig: {
    type: Object,
    required: true
  },
  tableData: {
    type: Array,
    required: true
  },
  tableCol: {
    type: Array,
    required: true
  },
  tableConfig:{
     type: Object,
     default: () => {}
  }
})

const formItems = props.formConfig.formItems ?? []
const formOriginData = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}

const formData = ref(formOriginData)
const listData = ref(props.tableData)

// 插槽绑定
const tableSlots = props.tableCol.filter(item=>item.slotName)

// 重置
const handleResetClick = () => {
  formData.value = formOriginData
  listData.value = props.tableData
}
// 搜索
const handleQueryClick = () => {
  listData.value = props.tableData.filter(item => {
    const keys = Object.keys(formData.value)
    let flag = true
    keys.some(key => {
      flag = item[key].includes(formData.value[key])   || formData.value[key].trim() === ''
      if (!flag) {
        return true
      }
    })
    return flag
  })
}
</script>

<style scoped>
.header {
  color: rgb(12, 11, 11);
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>