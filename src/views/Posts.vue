<template>
    <div>
        Posts
        <div v-for="post in posts">
            <router-link class="hover:underline" :to="{ name: 'post', params: { id: post.id } }">
                <div>{{ post.id }} {{ post.title }}</div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    async fetch() {
        this.posts = await (await fetch('http://localhost:8080/api/posts')).json()
    },
    data() {
        return {
            /** @type {any[]} */
            posts: []
        }
    }
}
</script>