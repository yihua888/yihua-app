<template>
  <div class="box">
    找不到页面...
    <div class="back" @click="goback">
      返回
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
const goback = () => router.go(-1)
</script>

<style lang="scss" scoped>
.box{
  height: 100%;
  background: #CCC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: rgb(255, 77, 0);
  .back{
    font-size: 16px;
    margin: 20px;
    padding-top: 24px;
    color: #00ff40;
    cursor: pointer;
  }
}
</style>