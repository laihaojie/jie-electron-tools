<script setup lang="ts">
import { localRemove } from '@djie/utils'

import useDrag from '../../hooks/drag'

const { drag } = useDrag()
drag.run()

const floating = ref<HTMLDivElement | null>(null)
const userInfo = reactive({} as UserInfo)

const isLogin = computed(() => !!userInfo.nickName)
const handleClick = () => {
  window.api.mainMinimize()
}

const handleNotification = () => {
  if (!isLogin.value)
    window.api.unAuth()
}

const handleMenu = () => {
  window.api.menu(JSON.stringify({ ...userInfo }))
}

onMounted(() => {
  // floating.value?.addEventListener('click', handleNotification)
  floating.value?.addEventListener('contextmenu', handleMenu)
})

window.api.onLogin(() => {
})
window.api.onLogout(() => {
  localRemove('token')
  localRemove('userInfo')
  location.reload()
})
</script>

<template>
  <div ref="floating" class="fc bg-blue500 w-full h-full cursor-pointer rounded-50% titlebar text-white">
    <div v-if="isLogin">{{ userInfo.nickName }}</div>
    <div v-else>未登录</div>
  </div>
</template>

<style lang='scss' scoped></style>
