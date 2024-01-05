<!--
  -- A forum software for use in a school in China.
  -- Copyright (C) 2023-2024 Fustigate & YZ9551(YXZ)
  --
  -- This program is free software: you can redistribute it and/or modify
  -- it under the terms of the GNU General Public License as published by
  -- the Free Software Foundation, either version 3 of the License, or
  -- (at your option) any later version.
  --
  -- This program is distributed in the hope that it will be useful,
  -- but WITHOUT ANY WARRANTY; without even the implied warranty of
  -- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  -- GNU General Public License for more details.
  --
  -- You should have received a copy of the GNU General Public License
  -- along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

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
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.03);
}

button:active {
  transform: scale(.98);
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
  grid-template-columns: 15% 70% 15%;
  height: 100%;
}

*, *:before, *:after {
  box-sizing: border-box;
  font-family: Trispace, monospace;
}
</style>
