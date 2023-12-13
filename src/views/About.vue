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
    asyncData() {
        console.log('About asyncData')
        return {
            title: `About ${Math.random()}`
        }
    },
    fetch() {
        console.log('About fetch')
        this.text = `About text at ${new Date()}`
    },
    data() {
        return {
            title: null,
            text: null
        }
    }
}
</script>