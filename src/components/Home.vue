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
    for (const post of posts.reverse()){
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
    <Card v-for="item in cards" :question="item.q" :description="item.d" :postId="item.postId" :loggedIn="loggedIn" :username="item.username" />
  </div>
<!--  <div v-if="!loggedIn" class="right-column" style="margin-top: 15px">-->
<!--    <button @click="loginClick" class="side-button">Login</button>-->
<!--  </div>-->
<!--  <div v-else class="right-column" style="margin-top: 15px">-->
<!--    <h3>Logged in as {{ username }}</h3>-->
<!--    <button @click="logoutClick" class="side-button">Logout</button>-->
<!--  </div>-->
</template>


<style />
