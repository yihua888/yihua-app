<template>
  <div class="cpn-info">
    <div class="top">
      <el-button :icon="ArrowLeft"  type="primary" size="small" @click="goback">返回</el-button>
    </div>
    <div class="cpn-content">
      <div>
        <div class="f-bold">组件示例：</div>
        <div class="center">
          <component :is="cpnInfo.cpn"></component>
        </div>
      </div>
      <div>
        <div v-if="cpnInfo.label">
          <div class="f-bold info-text">组件名称：</div>
          <div class="ml24">{{ cpnInfo.label }}</div>
        </div>
        <div v-if="cpnInfo.info.blog">
          <div class="f-bold info-text">博客地址：</div>
          <div class="ml24">
            <a :href="cpnInfo.info.blog" target="_blank">{{cpnInfo.label}}</a>
          </div>
        </div>
        <div v-if="cpnInfo.info.info ">
          <div class="f-bold info-text">组件介绍：</div>
          <div class="ml24">{{ cpnInfo.info.info }}</div>
        </div>
        <div v-if="cpnInfo.info.attr && cpnInfo.info.attr.length">
          <div class="f-bold info-text">组件属性：</div>
          <li class="ml24"
              v-for="item in cpnInfo.info.attr"
              :key="item">{{ item }}</li>
        </div>
        <div v-if="cpnInfo.info.methods && cpnInfo.info.methods.length">
          <div class="f-bold info-text">组件方法：</div>
          <li class="ml24"
              v-for="item in cpnInfo.info.methods"
              :key="item">{{ item }}</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import router from '@/router'

const store = useStore()
const cpnInfo = computed(() => store.state.cpnModule.cpnInfo)
const goback = () => router.go(-1)
</script>

<style lang="scss" scoped>
.cpn-info {
  text-align: left;
  line-height: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .top {
    height: 48px;
    border-bottom: 1px #ccc dashed;
    margin-bottom: 10px;
    text-align: end;
  }
  .cpn-content {
    flex: 1;
    overflow: auto;
  }
  .info-text {
    border-top: 1px #ccc dashed;
    margin-top: 24px;
    padding-top: 24px;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.content {
  padding: 20px;
}
</style>