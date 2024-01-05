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

<script setup>
  import * as config from "../../config.js"
  import { ref, watch } from "vue"
  import { useRouter } from "vue-router"
  import TextInput from "@/components/TextInput.vue";

  const router = useRouter()

  const username = ref("")
  const password = ref("")
  const userExists = ref(false)
  const tooShort = ref(true)
  const pp = ""
  const canUseSubmitButton = ref(false)

  function loginClick(){
    router.push("/login")
  }

  watch(username, async (newUsername, oldUsername) => {
    if (username.value.length < 3){
      tooShort.value = true
    }else if (username.value.length >= 3 && username.value.length <= 16){
      tooShort.value = false
      const response = await fetch(`${config.BACKEND}/api/auth/user/exists/${newUsername}`)
      const exists = await response.json()
      if (exists){
        userExists.value = true
        console.log("exists")
      }else{
        userExists.value = false
        canUseSubmitButton.value = true
      }
    }else {
      username.value = oldUsername
    }
  })

  async function signupSubmit(){
    canUseSubmitButton.value = false
    const response = await fetch(`${config.BACKEND}/api/auth/user/signup`, {
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
    // console.log(await response.json())

    // login after sign up
    const response2 = await fetch(`${config.BACKEND}/api/auth/user/signin`, {
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
    const data = await response2.json()
    const token = data.token
    localStorage.setItem("token", token)
    localStorage.setItem("username", username.value)
    // await router.push("/")
    window.location.replace(`/`)
  }
</script>


<template>
  <div class="middle-column">
    <div style="display: flex; flex-direction: row;  justify-content: space-between; align-items: center; gap: 20px;">
      <h1>
        Sign Up
      </h1>
      <button @click="loginClick" class="side-button" style="margin-top: 0">Registered? <span style="color: yellow; text-decoration: underline">Login</span> here! 🖐️</button>
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
    <p v-if="tooShort" class="user-exists-text">Username has to be greater than 3 characters!</p>
    <p v-else-if="userExists" class="user-exists-text">Username already exists, pick another one!</p>
    <button v-else-if="canUseSubmitButton" @click="signupSubmit" class="side-button" style="margin-top: 0">Submit!</button>
    <button v-else class="side-button" style="margin-top: 0; color: rgba(255, 255, 255, 0.1);">Submit!</button>
  </div>
</template>


<style scoped>
label {
  font-size: xx-large;
  font-weight: bold;
  min-width: 10rem;
}

.user-exists-text {
  color: red;
}

.input-block{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-area {
  font-size: large;
  min-height: 1.4em;
  margin-left: 9px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 1px white solid;
  border-radius: 10px;
  padding: 6px 8px 6px 8px;
}

.input-area:focus{
  outline: none;
  border-color: yellow;
  caret-color: lightyellow;
}

.input-area-red {
  font-size: large;
  min-height: 1.4em;
  margin-left: 9px;
  color: red;
}

.middle-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
