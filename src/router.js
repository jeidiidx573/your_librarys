import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashbord from './views/Dashbord.vue'
import Note from './views/Note.vue'
import NoteForm from './views/NoteForm.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashbord',
      name: 'dashbord',
      component: Dashbord
    },
    {
      path: '/note',
      name: 'note',
      component: Note
    },
    {
      path: '/note/:note_id?/edit',
      name: 'note_edit',
      component: NoteForm
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})