<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import { ref } from "vue"
const response = await fetch("http://localhost:3000/api/version", { method: 'GET', mode: 'cors'});
const backend_version = await response.text();
const version = ref(APP_VERSION);
</script>
<template>
  <p>Version: Backend: {{ backend_version }}, Frontend: {{ version }}</p>
</template>
