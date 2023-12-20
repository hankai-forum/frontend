<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import { ref, watch } from "vue"
const props = defineProps(['rows', 'placeholder', 'type', 'modelValue', 'minHeight', 'fontSize', 'resize', 'maxWidth'])
const emits = defineEmits(['update:modelValue'])
const rows = ref(props.rows || 1);

</script>

<template>
  <span :style="{'width': `${maxWidth}`}">
    <input v-if="type" class="input area" :placeholder="placeholder" :value="modelValue" :type="type"
      @input="$emit('update:modelValue', $event.target.value)" :style="{'min-height': `${minHeight}rem`, 'font-size': fontSize, 'resize': resize}" />
    <textarea v-else class="input area" :rows="rows" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" :style="{'min-height': `${minHeight}rem`, 'font-size': fontSize, 'resize': resize}" />
  </span>
</template>

<style scoped>
.input {
  outline: none;
  font-size: large;
  min-height: 1.6em;
  margin: 1em;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 0.1rem white solid;
  border-radius: 0.6rem;
  padding: 0.4rem 0.6rem;
}

.input:focus {
  background-color: rgba(255, 255, 255, 0.1);
}

.area {
  resize: vertical;
  width: 100%;
}
</style>
