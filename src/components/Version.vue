<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import * as config from "../../config.js"
import { ref } from "vue"
const response = await fetch(`${config.BACKEND}/api/version`, { method: 'GET', mode: 'cors'});
const backend_version = await response.text();
const version = ref(APP_VERSION);
</script>
<template>
  <p style="font-size: x-small;">Version: Backend: {{ backend_version }}, Frontend: {{ version }}</p>
</template>
