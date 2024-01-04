<script setup>
import * as config from "../../config.js"
  import { ref, onMounted } from "vue"
  import { useRouter } from "vue-router"
  import TextInput from "./TextInput.vue"

  const title = ref("")
  const description = ref("")
  const username = ref("")

  const router = useRouter()

  async function submit(){
    if (title.value.trim().length === 0 || description.value.trim().length === 0){
      return 0;
    }
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
    <button @click="submit">Submit!</button>
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
