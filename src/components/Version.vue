<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
const response = await fetch("http://localhost:3000/api/version", { method: 'GET' }, {});
const data = await response.json();
</script>
<template>
  <p>Backend Version: {{ data.version }}</p>
  <br>
  <p>Frontend Version: {{ APP_VERSION }}</p>
</template>
