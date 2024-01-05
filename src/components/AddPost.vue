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

<script setup>
import * as config from "../../config.js"
  import { ref, onMounted } from "vue"
  import { useRouter } from "vue-router"
  import TextInput from "./TextInput.vue"

  const title = ref("")
  const description = ref("")
  const username = ref("")
  const canUseSubmitButton = ref(true)

  const router = useRouter()

  async function submit(){
    if (title.value.trim().length === 0 || description.value.trim().length === 0){
      return 0;
    }
    canUseSubmitButton.value = false
    const response = await fetch(`${config.BACKEND}/api/posts/add`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: title.value,
          d: description.value,
          votes: 0,
          username: username.value
        }),
      });
    console.log(await response.json())
    await router.push("/")
  }

  onMounted(async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${config.BACKEND}/api/auth/user/details`, {
      method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "token": token
        }),
    });
    const data = await response.json()
    username.value = data.username
  })
</script>

<template>
  <div class="middle-column" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%">
    <div class="new-obj">
      <p>
        Post title:
      </p>
      <TextInput max-width="100%" v-model="title" rows="1" placeholder="What topic do you want to post about?" />
    </div>
    <div class="new-obj">
      <p>
        Post description:
      </p>
      <TextInput max-width="100%" v-model="description" rows="8" placeholder="Care to elaborate more?" />
    </div>
    <button v-if="canUseSubmitButton" @click="submit">Submit!</button>
    <button v-else style="color: rgba(255, 255, 255, 0.1);" >Submit!</button>
  </div>
</template>

<style scoped>
p {
  text-align: left;
  font-size: large;
  margin-right: 10px;
  min-width: 230px
}

.new-obj {
  display: flex;
  align-items: center;
  width: 100%
}

</style>
