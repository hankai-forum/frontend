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
import { ref, watch } from "vue"
const props = defineProps(['rows', 'placeholder', 'type', 'modelValue', 'maxWidth', 'styles', 'maxlength'])
const emits = defineEmits(['update:modelValue'])
const rows = ref(props.rows || 1)
</script>

<template>
  <span :style="{'width': `${maxWidth}`}">
    <input v-if="type === 'password' || type === 'username'" class="input area" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" :style="styles" v-bind="$props" />

    <textarea v-else class="input area" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" :style="styles" v-bind="$props" />
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
