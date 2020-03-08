import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '../pages/PageHome'
import PageThreadShow from '../pages/PageThreadShow'
import ThreadCreate from '../pages/PageThreadCreate'
import PageNotFound from '../pages/PageNotFound'
import PageForum from '../pages/PageForum'
import PageCategory from '../pages/PageCategory'
import PageProfile from '../pages/PageProfile'
import ThreadEdit from '../pages/PageThreadEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: PageCategory,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: PageForum,
      props: true
    },
    {
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: ThreadCreate,
      props: true
    },
    {
      path: '/thread/:id',
      name: 'ThreadShow',
      component: PageThreadShow,
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: ThreadEdit,
      props: true
    },
    {
      path: '/me',
      name: 'Profile',
      component: PageProfile,
      props: true
    },
    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: PageProfile,
      props: {edit: true}
    },
    {
      path: '*',
      name: 'NotFound',
      component: PageNotFound
    }
  ],
  mode: 'history'
})
