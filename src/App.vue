<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import Navbar from "./components/Navbar.vue"
import Version from "./components/Version.vue"
</script>

<template>
  <div id="wrapper">
    <Navbar style="grid-row: 1" />
    <div class="main-body" style="grid-row: 2">
      <router-view></router-view>
    </div>
    <Suspense><Version /></Suspense>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
}
#wrapper {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 0.5rem;
  min-height: 100vh;
  font-family: Trispace, monospace;
  color: white;
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
  height: 100%;
}

*, *:before, *:after {
  box-sizing: border-box;
}
</style>
