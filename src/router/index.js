import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/', component: () => import('../views/Layout.vue'),
        children: [
          { path: '/', component: () => import('../views/Home.vue') },
          { path: '/about', component: () => import('../views/About.vue') },
          { path: '/posts', component: () => import('../views/Posts.vue') },
          { path: '/posts/:id', component: () => import('../views/Post.vue'), name: 'post' },
        ]
      },
      { path: '*', component: () => import('../views/NotFound.vue') },
    ]
  })
}
