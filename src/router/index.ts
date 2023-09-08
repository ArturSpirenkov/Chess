import { createWebHistory, createRouter } from 'vue-router'

const Home = () => import('../views/MainView.vue')
const Settings = () => import('../views/SettingsView.vue')

const history = createWebHistory()

const routes = [
  {
    path: '/',
    redirect: {
      name: 'main',
    },
  },
  {
    path: '/main',
    name: 'main',
    component: Home,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
]

const router = createRouter({
  history,
  routes,
})

export default router
