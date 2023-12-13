<template>
    <div>
        <div>
            layout: {{ layout }}, fetch: {{ result }}
        </div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    asyncData() {
        console.log('Layout asyncData')
        return {
            layout: 'hello'
        }
    },
    fetch() {
        console.log('Layout fetch')
        console.log(this.result)
        this.result = 'fetched'
    },
    data() {
        console.log('Layout data')
        return {
            result: 'initial'
        }
    }
}
</script>