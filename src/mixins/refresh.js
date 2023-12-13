import { getChildrenComponentInstancesUsingFetch, getMatchedComponentsInstances, globalHandleError, promisify } from "./utils"
import Vue from 'vue'

export default {
    created() {
        Vue.prototype.$refresh = this.$root.$options.refresh.bind(this.$root)
    },
    async refresh() {
        const pages = getMatchedComponentsInstances(this.$route)

        if (!pages.length) {
            return
        }
        this.$loading.start()

        const promises = pages.map(async (page) => {
            let p = []

            // Old fetch
            if (page.$options.fetch && page.$options.fetch.length) {
                p.push(promisify(page.$options.fetch, this.context))
            }

            if (page.$options.asyncData) {
                p.push(
                    promisify(page.$options.asyncData, this.context)
                        .then((newData) => {
                            for (const key in newData) {
                                Vue.set(page.$data, key, newData[key])
                            }
                        })
                )
            }

            // Wait for asyncData & old fetch to finish
            await Promise.all(p)
            // Cleanup refs
            p = []

            if (page.$fetch) {
                p.push(page.$fetch())
            }
            // Get all component instance to call $fetch
            for (const component of getChildrenComponentInstancesUsingFetch(page.$vnode.componentInstance)) {
                p.push(component.$fetch())
            }

            return Promise.all(p)
        })
        try {
            await Promise.all(promises)
        } catch (error) {
            this.$loading.fail(error)
            globalHandleError(error)
            this.error(error)
        }
        this.$loading.finish()
    },
}
