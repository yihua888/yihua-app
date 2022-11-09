<template>
  <div class="nav-header">
    <component :is="isFold ? 'Fold' : 'Expand'" @click="handleFoldClick" style="color:black;width:16px;height:16px;">
    </component>
    <div class="content">
      <div></div>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
            </el-avatar>
            <span class="user-name">{{ name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { deleteCache } from '@/utils/cache'
const emit = defineEmits(['defineEmits'])
const store = useStore()
const router = useRouter()
const isFold = ref(false)
const name = computed(() => store.state.login.userInfo.username)

const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
const handleExitClick = () => {
  deleteCache('token')
  router.push('/main')
}

</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;

    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .user-name {
      margin-left: 20px;
    }
  }
}
</style>