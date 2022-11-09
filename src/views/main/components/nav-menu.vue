<template>
    <div class="nav-menu">
        <div class="logo">
            <Monitor  style="width:16px;height:16px;margin:0px 8px;color: #FFF;" />
            <span v-if="!collapse" class="title">yihua-app</span>
        </div>
        <el-menu class="el-menu-vertical" :default-active="defaultValue" :collapse="collapse" :unique-opened="true"
            background-color="#0c2135" text-color="#b7bdc3" active-text-color="#0a60bd">
            <template v-for="item in userMenus" :key="item.id">
                <template v-if="item.type === 1">
                    <el-sub-menu :index="item.id + ''">
                        <template #title>
                            <component v-if="item.icon" :is="item.icon"   style="width:16px;height:16px;margin-right: 8px;"  />
                            <span>{{ item.name }} </span>
                        </template>
                        <template v-for="subItem in item.children" :key="subItem.id">
                            <el-menu-item :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                                <component v-if="subItem.icon" :is="subItem.icon"  style="width:16px;height:16px;margin-right:8px;" />
                                <span>{{ subItem.name }} </span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else-if="item.type === 2">
                    <el-menu-item @click="handleMenuItemClick(item)" :index="item.id + ''">
                        <component v-if="item.icon" :is="item.icon" style="width:16px;height:16px;margin-right: 8px;"  />
                        <span>{{ item.name }} </span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
// import {} from 'element-plus/icons-vue'

const prop = defineProps({
    collapse: {
        type: Boolean,
        default: false
    }
})

const collapse = computed(()=>prop.collapse)
const store = useStore()
const userMenus = computed(() => store.state.login.userMenus)
console.log(userMenus.value);
const router = useRouter()
const route = useRoute()
const currentPath = route.path
const menu = pathMapToMenu(userMenus.value, currentPath)
const defaultValue = ref(menu?.id + '')

const handleMenuItemClick = (item) => {
    router.push({
        path: item.url ?? '/not-found'
    })
}
</script>

<style scoped lang="scss">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>