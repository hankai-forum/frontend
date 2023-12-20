<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
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
    username.value = username.value.replace(/\n/g,'')
    wrong.value = false
  })

  async function loginSubmit(){
    if (username.value.length !== 0 && password.value.length !== 0){
      const response = await fetch("http://localhost:3000/api/auth/user/signin", {
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
      <TextInput v-model="username" placeholder="Your username 🧑🏻‍🦱" type="username" rows="1" :styles="{'resize': 'none', 'overflow': 'hidden', 'overflow-x': 'scroll'}" />
    </div>
    <div class="input-block">
      <label>
        Password:
      </label>
      <TextInput v-model="password" placeholder="Your password 🔑" type="password" rows="1" :styles="{'resize': 'none', 'overflow': 'hidden'}" />
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