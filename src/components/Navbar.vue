<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import { ref } from 'vue';
const links = ref([
  { url: '/', text: 'Home' },
  { url: '/', text: 'Home' },
  { url: '/', text: 'Home' },
  //{url: '/posts', text: 'Posts'},
]);
</script>

<template>
  <div class="navbar main-body">
    <ul class="links">
      <li class="link left-column" v-for="link in links">
        <router-link :to="link.url">
          <button>{{ link.text }}</button>
        </router-link>
      </li>
    </ul>
    <input class="middle-column"/>
    <button class="right-column"/>
  </div>
</template>

<style scoped>
.navbar {
  background-color: rgba(48, 48, 48, 0.8);
  width: 100%;
  height: 100%;
  align-items: center;
  position: sticky;
  top: 0;
}
ul.links {
  padding: 0;
  margin: 0;
}
.links {
  display: flex;
}
li.link {
  list-style-type: none;
  margin: 0.2rem 0.4rem;
}
</style>
