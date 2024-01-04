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
  import { useRouter } from "vue-router"
  import { onMounted, ref, defineEmits } from "vue"

  const router = useRouter()

  const props = defineProps({
    comment: Object,
    username: String
  })

  const emit = defineEmits(["deleteComment"])

  const commentId = props.comment._id

  const isOP = ref(false)

  onMounted(() => {
    console.log("abc")
    isOP.value = props.comment.username === props.username || props.username === 'mod'
  })
</script>


<template>
  <div class="comment-card-wrapper">
    <p class="commenter">{{ props.comment.username }}</p>
    <div class="comment-content-wrapper">
      <p class="">
        {{ props.comment.content }}
      </p>
      <button v-if="isOP" class="delete-button" @click="$emit('deleteComment', commentId)">Delete</button>
    </div>
  </div>
</template>


<style scoped>
.commenter{
  text-decoration: underline;
  font-size: small;
  padding: 0.1em
}

.comment-card-wrapper{
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.delete-button{
  font-size: medium;
  margin-right: 0.3rem;
}

a,
a:active,
a:visited {
  color: white;
  text-decoration: none;
}

p {
  text-align: left;
  padding: 0 8px 0 8px
}

.comment-content-wrapper {
  width: 100%;
  border: 1px lightgreen solid;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
