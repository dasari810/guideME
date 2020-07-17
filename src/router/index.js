import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Topics from '../views/Topics.vue'
import Topic from '../views/Topic.vue'
import CreateTopic from '../views/CreateTopic.vue'
import AddwebLink from '../views/AddwebLink.vue'
import AddSuggestion from '../views/AddSuggestion.vue'
import AddvideoLink from '../views/AddvideoLink.vue'
import Contributors from '../views/Contributors.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/topics',
    name: 'Topics',
    component: Topics
  },
  {
    path: '/topic/:id',
    name: 'Topic',
    props:true,
    component: Topic
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateTopic
  },
  {
    path: '/addweblink/:id',
    props:true,
    name: 'Addweblink',
    component: AddwebLink
  },
  {
    path: '/addvideolink/:id',
    props:true,
    name: 'Addvideolink',
    component: AddvideoLink
  },
  {
    path: '/addsuggestion/:id',
    props:true,
    name: 'Addsuggestion',
    component: AddSuggestion
  },
  {
    path: '/contributors',
    name: 'Contributors',
    component: Contributors
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
