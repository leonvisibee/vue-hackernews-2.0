<template>
    <button class="outline px-4 rounded" @click="count++">{{ count }}</button>
</template>
<script>
export default {
    asyncData() {
        throw 'never'
    },
    fetch() {
        console.log('Counter fetch')
        this.count = Math.trunc(Math.random() * 1000)
    },
    data() {
        return { count: 0 }
    }
}
</script>