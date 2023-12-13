import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'
import fetchMixin from './mixins/fetch.client'
import { applyAsyncData, flatMapComponents, getMatchedComponents, resolveRouteComponents, sanitizeComponent } from './mixins/utils'

// global progress bar
const bar = Vue.prototype.$loading = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

if (!Vue.__fetch__mixin__) {
  Vue.mixin(fetchMixin)
  Vue.__fetch__mixin__ = true
}

Vue.mixin({
  async beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path) {
      return next()
    }

    console.log('beforeRouteUpdate', this.$options.name)
    const { asyncData } = this.$options
    if (asyncData) {
      bar.start()
      asyncData({ store: this.$store, route: to })
        .then((data) => {
          console.log(this.data, data)
          bar.finish()
          next()
        }).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

const INITIAL_STATE = window.__INITIAL_STATE__
if (INITIAL_STATE && INITIAL_STATE.store) {
  store.replaceState(INITIAL_STATE.store)
}

router.onReady(async () => {
  await Promise.all(resolveComponents(router.currentRoute))
  router.beforeResolve(callHooks)
  app.$mount('#app')
})


/** @type {import('vue-router').NavigationGuard} */
function callHooks(to, from, next) {
  const matched = getMatchedComponents(to)
  const prevMatched = getMatchedComponents(from)
  let diffed = false
  const activated = matched.filter((c, i) => {
    return diffed || (diffed = (prevMatched[i] !== c))
  })

  const Components = activated.map(sanitizeComponent).filter(c => c.options.asyncData)

  if (!Components.length) {
    return next()
  }

  bar.start()
  Promise.all(Components.map(async (Component) => {
    if (Component.options.asyncData) {
      const data = await Component.options.asyncData({ store, route: to })
      applyAsyncData(Component, data)
    }
  }))
    .then(() => {
      bar.finish()
      next()
    })
    .catch(next)
}

function applySSRData(Component, ssrData) {
  if (INITIAL_STATE && ssrData) {
    applyAsyncData(Component, ssrData)
  }

  Component._Ctor = Component
  return Component
}

function resolveComponents(route) {
  return flatMapComponents(route, async (Component, _, match, key, index) => {
    if (typeof Component === 'function' && !Component.options) {
      Component = await Component()
    }
    const _Component = applySSRData(sanitizeComponent(Component), INITIAL_STATE.data ? INITIAL_STATE.data[index] : null)
    match.components[key] = _Component
    return _Component
  })
}
