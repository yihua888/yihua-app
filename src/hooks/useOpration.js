import { useStore } from 'vuex'
import { getCache } from '@/utils/cache'

export const isOpration = (flag) => {
  const store = useStore()
  let opration = store.state.login.operation
  if (!opration || !opration.length) {
    opration = getCache('opration')
    store.commit('login/changeOperation', opration)
  }
  return opration.includes(flag)
}
