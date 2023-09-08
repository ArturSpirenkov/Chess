import { createWebHistory, createRouter } from 'vue-router'

const Home = () => import('../views/MainView.vue')
const Settings = () => import('../views/SettingsView.vue')

const history = createWebHistory()

const routes = [
  {
    path: '/main',
    name: 'main',
    component: Home,
  },
  {
    path: '/',
    name: 'settings',
    component: Settings,
  },
]

const router = createRouter({
  history,
  routes,
})

export default router
