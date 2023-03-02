import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import UserListView from '../views/UserListView';
import LoginView from '../views/LoginView';
import NotFoundView from '../views/NotFoundView';
import UserProfileView from '../views/UserProfileView';
import RegisterView from '../views/RegisterView';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userprofile/:userId/',
    name: 'userprofile',
    component: UserProfileView
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: UserListView
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/404/',
    name: '404',
    component: NotFoundView
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/404/"
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
