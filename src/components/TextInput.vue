<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import { ref } from "vue"
const props = defineProps(['rows', 'placeholder', 'type', 'label', 'modelValue'])
const emits = defineEmits(['update:modelValue'])
const rows = ref(props.rows || 1);
console.log(rows.value);
</script>

<template>
  <span v-if="rows === 1">
    <label class="label">
      {{ label }}
    </label>
    <input class="input line" :value="modelValue" :type="type" @input="$emit('update:modelValue', $event.target.value)" />
  </span>
  <span v-else>
    <textarea class="input area" :rows="rows" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
  </span>
</template>

<style scoped>
.label {
  font-size: xx-large;
  font-weight: bold;
}

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
  flex-grow: 2;
  width: 100%;
}

/*
.line {
  
}
*/
</style>
