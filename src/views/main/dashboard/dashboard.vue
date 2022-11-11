<template>
  <div class="page-content">
    <h2>yihua-app</h2>
    <div class="system-info">
      <p>
        欢迎来到yihua-app，本系统搭建于2022年11月10日。主要用于存放作者平时积累的组件、案例。
      </p>
      <p>作者：yihua</p>
      <p>技术栈：vue3、vuex、vue-router</p>
      <p>组件库：element-plus</p>
      <p>本地服务：json-server</p>
      <p>
        作者博客：<a href="https://blog.csdn.net/weixin_45737062?spm=1008.2028.3001.5343">yihua的csdn</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-content {
  background: url("@/assets/img/info-bg.jpg");
  color: #fff;
  padding-top: 24px;
}

.system-info {
  padding: 24px 200px;
  text-align: left;

  a {
    color: #fff;
  }
}
</style>