<template>
  <div id="app">
    <header>
      <nav class="flex">
        <router-link class="[&.router-link-active]:underline p-2" to="/" exact>
          Home
        </router-link>
        <router-link class="[&.router-link-active]:underline p-2" to="/about">About</router-link>
        <router-link class="[&.router-link-active]:underline p-2" to="/404">Not Found</router-link>
        <router-link class="[&.router-link-active]:underline p-2" to="/posts">Posts</router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="px-2"></router-view>
    </transition>
  </div>
</template>