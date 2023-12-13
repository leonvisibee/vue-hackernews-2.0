<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ text }}</p>
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
    fetch() {
        console.log('Home fetch')
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