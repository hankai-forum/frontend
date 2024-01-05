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
import * as config from "../../config.js"
  import Card from "./Card.vue"
  import { ref, onMounted } from "vue"
  import { useRouter, useRoute } from "vue-router"

  const router = useRouter()
  const route = useRoute()

  const cards = ref([])
  const loggedIn = ref(false)
  const username = ref("")

  async function getPosts(){
    const response = await fetch(`${config.BACKEND}/api/posts`);
    const posts = await response.json();
    for (const post of posts){
      const title = post.q
      const description = post.d
      cards.value.push({q: title, d: description, postId: post._id, loggedIn: loggedIn.value, username: post.username})
    }
  }

  function isLoggedIn(){
    const token = localStorage.getItem('token')
    if (!!token){
      loggedIn.value = true
      // console.log("Logged In")
      username.value = localStorage.getItem("username")
    }else{
      // console.log("Not logged In")
    }
  }

  function loginClick(){
    router.push("/login")
  }

  function logoutClick(){
    localStorage.removeItem("token")
    router.go()
  }

  onMounted(() => {
    getPosts()
    isLoggedIn()
  })
</script>


<template>
  <div class="middle-column">
    <div id="page-title">
      <router-link v-if="loggedIn" to="/addpost">
        <button style="margin: 0 0 0.5rem 0">Add Post</button>
      </router-link>
      <p v-else style="font-size: x-large">Posts</p>
    </div>
    <Card v-for="item in cards" :question="item.q" :description="item.d" :postId="item.postId" :loggedIn="loggedIn" :username="username" />
  </div>
</template>


<style />
