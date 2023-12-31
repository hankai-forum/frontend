<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from "vue-router"
  import TextInput from "@/components/TextInput.vue";

  const router = useRouter()
  const route = useRoute()

  const links = ref([
    { url: '/', text: 'Home' },
    // { url: '/', text: 'Home' },
    // { url: '/', text: 'Home' },
  ]);

  const loggedIn = ref(false)
  const username = ref("")

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

  function logoutClick(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    location.replace("/")
  }

  function loginClick(){
    router.push("/login")
  }

  onMounted(() => {
    isLoggedIn()
  })
</script>

<template>
<!-- TODO: chessburger menu -->
  <div class="navbar main-body">
    <div class="links">
        <router-link :to="link.url" class="link left-column" v-for="link in links">
          <button>{{ link.text }}</button>
        </router-link>
    </div >

    <TextInput class="middle-column" rows="1" :styles="{'min-height': '1', 'resize': 'none', 'font-size': 'small'}" />

    <div class="right-column" style="justify-self: flex-end" >
      <div v-if="loggedIn" class="log-block">
        <p style="margin-right: 2rem;">Logged in as <span style="text-decoration: underline">{{ username }}</span></p>
        <button @click="logoutClick">Logout</button>
      </div>

      <div v-else class="log-block">
        <p style="margin-right: 2rem;">Not logged in</p>
        <button @click="loginClick">Login</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.log-block{
  display: flex;

}

.main-body {
  display: grid;
  grid-template-columns: 30% auto 30%;
}

.navbar {
  background-color: rgba(48, 48, 48, 1);
  width: 100%;
  height: 100%;
  align-items: center;
  position: sticky;
  top: 0;
  border-bottom: 1px white solid;
  //margin-bottom: 0.6rem;
  padding: 0.5rem 0.8rem 0.5rem 0.8rem;
}

ul.links {
  padding: 0;
  margin: 0;
}

.links {
  display: flex;
  gap: 1rem;
}
</style>
