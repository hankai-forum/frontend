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
  import { ref, onMounted, watch } from "vue"
  import {useRoute, useRouter} from "vue-router";
  import * as config from "../../config.js";
  import TextInput from "@/components/TextInput.vue";

  const router = useRouter()
  const route = useRoute()

  const about = ref("abc")
  const username = ref(route.params.username ? route.params.username : "")
  const userDescription = ref("")
  const loggedIn = ref(false)
  const newDescription = ref("")
  const descriptionBoxShow = ref(false)

  async function getUserInfo() {
    const response = await fetch(`${config.BACKEND}/api/auth/user/detailsbyusername/${username.value}`)
    const data = await response.json()
    try{
      if (data.username){
        userDescription.value = data.description.length > 0 ? data.description : "This user doesn't have a description set"
      }else{
        userDescription.value = "User doesn't exist"
      }
    }catch{
      // old users that don't have userDescription in database collection
      userDescription.value = "This user doesn't have a description set"
    }
    isLoggedIn()
  }

  function isLoggedIn(){
    const token = localStorage.getItem('token')
    const response = fetch(`${config.BACKEND}/api/auth/user/detailsbytoken`, {
      method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "token": token
        }),
    })
        .then(response => {
          return response.json()
        })
        .then(data => {
          // console.log(data.username)
          if (data.username === username.value){
            loggedIn.value = true
          }
          // console.log("Logged in :", loggedIn.value)
        })
  }

  function editDescriptionClick(){
    descriptionBoxShow.value = !descriptionBoxShow.value
  }

  async function descriptionSubmit(){
    const response = await fetch(`${config.BACKEND}/api/auth/user/description`, {
      method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": username.value,
          "description": newDescription.value
        }),
    })
    await getUserInfo()
    descriptionBoxShow.value = false
  }

  watch(() => route.params.username, async (newUsername) => {
    username.value = newUsername ? newUsername : "";
    await getUserInfo();
    newDescription.value = userDescription.value;
  })

  onMounted(async () => {
    await getUserInfo()
    newDescription.value = userDescription.value
  })
</script>

<template>
  <div class="middle-column profile-wrapper">
    <p class="username-text">{{ username }}</p>
    <p class="user-description">{{ userDescription }}</p>
    <div v-if="loggedIn" class="description-edit">
      <button @click="editDescriptionClick" style="font-size: x-small">Edit Description</button>
      <TextInput v-if="descriptionBoxShow" placeholder="Introduce yourself" styles="font-size: 1rem; margin-left: 0" rows="10" v-model="newDescription" />
      <button v-if="descriptionBoxShow" @click="descriptionSubmit" style="font-size: x-small">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.user-description {
  font-size: medium;
}

.profile-wrapper {
  text-align: left;
}

.username-text {
  font-size: x-large;
  text-decoration: #fcd1d7 underline 0.17rem;
  text-decoration-skip-ink: none;
}
</style>
