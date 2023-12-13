import Vue from 'vue'
import { createApp } from './app'
import fetchMixin from './mixins/fetch.server'
import { applyAsyncData, sanitizeComponent } from './mixins/utils'

const isDev = process.env.NODE_ENV !== 'production'

// Fetch mixin
if (!Vue.__fetch__mixin__) {
  Vue.mixin(fetchMixin)
  Vue.__fetch__mixin__ = true
}

export default async context => {
  context.fetchCounters = {}
  context.fetch = {}

  const s = isDev && Date.now()
  const { app, router, store } = createApp()

  const { url } = context
  const { fullPath } = router.resolve(url).route

  if (fullPath !== url) {
    throw { url: fullPath }
  }

  context.asyncData = {}
  router.push(url)

  await new Promise(router.onReady.bind(router))

  const Components = router.getMatchedComponents()
  if (!Components.length) {
    throw { code: 404 }
  }

  const data = await Promise.all(Components.map(async (Component) => {
    Component = sanitizeComponent(Component)
    if (!Component.options.asyncData) return;
    const data = await Component.options.asyncData({ store, route: router.currentRoute })
    context.asyncData[Component.cid] = data
    applyAsyncData(Component)
    return data
  }))

  context.state = {
    store: store.state,
    fetch: context.fetch,
    data: data,
  }

  isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
  return app
}
