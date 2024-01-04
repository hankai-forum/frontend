/*
 * A forum software for use in a school in China.
 * Copyright (C) 2023-2024 Fustigate & YZ9551(YXZ)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import * as config from "../../config.js"
  import { ref, watch } from "vue"
  import { useRouter } from "vue-router"
  import TextInput from "./TextInput.vue"

  const router = useRouter()

  const username = ref("")
  const password = ref("")
  const wrong = ref(false)

  function signUpClick(){
    router.push("/signup")
  }

  watch(username, async (newUsername, oldUsername) => {
    wrong.value = false
  })

  async function loginSubmit(){
    if (username.value.length !== 0 && password.value.length !== 0){
      const response = await fetch(`${config.BACKEND}/api/auth/user/signin`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        }),
      });
      const data = await response.json()
      if (data === false){
        console.log("Username or password incorrect")
        wrong.value = true
      }else{
        wrong.value = false
        const token = data.token
        localStorage.setItem("token", token)
        localStorage.setItem("username", username.value)
        window.location.replace("/")
        // TODO: instead of
      }
    }else{
      console.log("Username or password incorrect")
      wrong.value = true
    }
  }
</script>


<template>
  <div class="middle-column">
    <div style="display: flex; flex-direction: row;  justify-content: space-between; align-items: center; gap: 40px;">
      <h1>
        Login
      </h1>
      <button @click="signUpClick" class="side-button" style="margin-top: 0">No account? <span style="color: yellow; text-decoration: underline">Sign Up</span> here! 🖐️</button>
    </div>
    <div class="input-block">
      <label>
        Username:
      </label>
      <TextInput v-model="username" maxlength="25" placeholder="Your username 🤡" type="username" rows="1" resize="none" overflow="hidden" />
    </div>
    <div class="input-block">
      <label>
        Password:
      </label>
      <TextInput v-model="password" maxlength="16" placeholder="Your password 🔑" type="password" rows="1" resize="none" overflow="hidden" />
    </div>
    <p v-if="wrong" style="color: red; margin-top: -5px">Username or password incorrect</p>
    <button @click="loginSubmit" class="side-button" style="margin-top: 0">Submit!</button>
  </div>
</template>

<style scoped>
label {
  font-size: xx-large;
  font-weight: bold;
  min-width: 10rem;
}

.middle-column {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.input-block{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
