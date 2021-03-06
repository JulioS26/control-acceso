import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Entrada from '../views/Entrada.vue'
import Salida from '../views/Salida.vue'

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

import Historial from '../views/Historial.vue'
import Operaciones from '../views/Operaciones.vue'

import Registro from '../views/Registro.vue'

import Admin from '../views/Admin.vue'
import DashboardAdmin from '../views/DashboardAdmin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/entrada',
    name: 'Entrada',
    component: Entrada
  },
  {
    path: '/salida',
    name: 'Salida',
    component: Salida
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/historial',
    name: 'Historial',
    component: Historial
  },
  {
    path: '/operaciones',
    name: 'Operaciones',
    component: Operaciones
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path:'/dashboard-admin',
    name:'DashboardAdmin',
    component: DashboardAdmin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
