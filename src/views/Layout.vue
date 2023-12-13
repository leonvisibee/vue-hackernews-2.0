<template>
    <div>
        <div>
            layout: {{ layout }}, fetch: {{ fetch }}
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
        this.fetch = 'fetched'
    },
    data() {
        return {
            fetch: 'initial'
        }
    }
}
</script>