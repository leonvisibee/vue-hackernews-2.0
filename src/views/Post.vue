<template>
    <div v-if="!$fetchState.pending" class="outline p-2 rounded mt-2">
        <h1 class="text-3xl">{{ post.title }}</h1>
        <div class="">by {{ user.username }} ({{ user.email }})</div>
        <p class="mt-2">{{ post.body }}</p>
    </div>
</template>
<script>
export default {
    async fetch() {
        const id = this.$route.params.id
        this.post = await (await fetch(`http://localhost:8080/api/posts/${id}`)).json()
        this.user = await (await fetch(`http://localhost:8080/api/users/${this.post.userId}`)).json()
    },
    data() {
        return {
            post: null,
            user: null,
        }
    }
}
</script>