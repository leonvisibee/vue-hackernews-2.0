<template>
    <div>
        <h1>{{ title }}</h1>
        <template v-if="$fetchState.pending">
            loading...
        </template>
        <template v-else>
            <p>{{ text }}</p>
        </template>
        <Counter />
    </div>
</template>
<script>
import Counter from '../components/Counter.vue';
export default {
    components: { Counter },
    aasyncData() {
        console.log('Home asyncData')
        return {
            title: `Home ${Math.random()}`
        }
    },
    fetchOnServer: false,
    fetchDelay: 1000,
    fetch() {
        console.log('Home fetch on client after 1000', document.title)
        this.text = `Home text at ${new Date()}`
    },
    data() {
        return {
            title: null,
            text: null
        }
    }
}
</script>