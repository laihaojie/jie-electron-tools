import { createRouter, createWebHashHistory } from 'vue-router'

const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/home/index.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../pages/test/index.vue'),
    },
  ],
})

export default routes
