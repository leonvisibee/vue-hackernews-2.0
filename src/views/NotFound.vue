<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ text }}</p>
    </div>
</template>
<script>

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
}
</script>