<template>
    <div class="login">
        <div class="login-panel">
            <h1 class="title">yihuaApp</h1>
            <div class="login-account">
                <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="account.username" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="account.password" show-password />
                    </el-form-item>
                </el-form>
            </div>
            <div class="account-control">
                <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
                <el-link type="primary">忘记密码</el-link>
            </div>

            <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { getCache, setCache, deleteCache } from '@/utils/cache'

const isKeepPassword = ref(false)
const formRef = ref(null)
const account = reactive({
    username: getCache('username') ?? '',
    password: getCache('password') ?? ''
})

const store = useStore()
const handleLoginClick = (isKeepPassword) => {
    formRef.value?.validate((valid) => {
        if (valid) {
            // 1.判断是否需要记住密码
            if (isKeepPassword) {
                // 本地缓存
                setCache('username', account.username)
                setCache('password', account.password)
            } else {
                deleteCache('username')
                deleteCache('password')
            }

            // 2.开始进行登录验证
            store.dispatch('login/accountLoginAction', { ...account })
        }
    })
}

</script>

<style scoped lang="scss">
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url('../../assets/svg/login-bg.svg');

    .login-panel {
        margin-bottom: 150px;
        width: 320px;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0px 0px 1px 1px #CCC;

        .title {
            text-align: center;
        }

        .account-control {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
        }

        .login-btn {
            width: 100%;
            margin-top: 10px;
        }
    }
}
</style>