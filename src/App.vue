<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import { useRouter, useRoute } from "vue-router"
import Navbar from "./components/Navbar.vue"

const router = useRouter()
const route = useRoute()
</script>


<template>
  <div id="wrapper">
    <div class="navbar">
      <Navbar />
      <p> hi from navbar </p>
    </div>
    <div class="main-body">
      <router-view></router-view>
    </div>
  </div>
</template>


<style>
#wrapper {
  font-family: Trispace, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

button {
  font-size: large;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  padding: 10px;
  border: 2px white solid;
  border-radius: 10px;
}

button:hover {
  cursor: pointer;
}

.title-text {
  font-size: x-large;
  text-decoration: white;
}

.left-column {
  grid-column: 1;
}

.middle-column {
  grid-column: 2;
}

.right-column {
  grid-column: 3;
}

.main-body {
  display: grid;
  grid-template-columns: 300px auto 300px;
  height: 100vh;
}

*, *:before, *:after {
  box-sizing: border-box;
}
</style>
