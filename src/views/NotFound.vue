<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ text }}</p>
        <Counter />
    </div>
</template>
<script>
import Counter from '../components/Counter.vue'

export default {
    asyncData() {
        console.log('Not Found asyncData');
        return {
            title: `Not Found ${Math.random()}`
        };
    },
    fetch() {
        console.log('Not Found fetch');
        this.text = `Not Found text at ${new Date()}`;
    },
    data() {
        return {
            title: null,
            text: null
        };
    },
    components: { Counter }
}
</script>