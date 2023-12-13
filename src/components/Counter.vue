<template>
    <div class="outline rounded p-4 grid gap-4 h-64">
        <template v-if="$fetchState.pending">
            counter loading...
        </template>
        <template v-else>
            <div>
                <button class="outline px-4 rounded" @click="$fetch">{{ count }}</button>
                <button class="outline px-4 rounded" @click="$refresh">$refresh</button>
            </div>
            <div class="outline rounded p-4 w-fit">
                <h1>Server Actions</h1>
                <button class="outline px-4 rounded" @click="decrement">decrement</button>
                <button class="outline px-4 rounded" @click="increment">increment</button>
            </div>
            <div class="outline rounded p-4 w-fit">
                <h1>Client Actions</h1>
                <button class="outline px-4 rounded" @click="count--">decrement</button>
                <button class="outline px-4 rounded" @click="count++">increment</button>
            </div>
        </template>
    </div>
</template>
<script>
const isServer = typeof window === 'undefined'
const base = isServer ? 'http://0.0.0.0:8080' : 'http://localhost:8080';

export default {
    asyncData() {
        throw 'never'
    },
    async fetch() {
        console.log('Counter fetch');
        const { count } = await (await fetch(base + '/count', { method: 'GET' })).json()
        this.count = count
    },
    data() {
        return { count: null }
    },
    methods: {
        async increment() {
            const { count } = await (await fetch(base + '/increment', { method: 'POST' })).json()
            this.count = count
        },
        async decrement() {
            const { count } = await (await fetch(base + '/decrement', { method: 'POST' })).json()
            this.count = count
        }
    }
}
</script>