<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
  import { ref } from 'vue';
  const links = ref([
    {url: '/', text: 'Home'},
    {url: '/', text: 'Home'},
    {url: '/', text: 'Home'},
    //{url: '/posts', text: 'Posts'},
  ]);
</script>

<template>
  <ul class="navbar">
    <li class="navbar-item" v-for="link in links">
      <router-link :to="link.url">
        <button>{{ link.text }}</button>
      </router-link>
    </li>
  </ul>
</template>

<style scoped>

</style>
