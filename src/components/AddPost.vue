<script setup>
  import { ref, onMounted } from "vue"
  import { useRouter } from "vue-router"
  import TextInput from "./TextInput.vue"

  const title = ref("")
  const description = ref("")
  const userId = ref("")

  const router = useRouter()

  async function submit(){
    const response = await fetch("http://localhost:3000/api/posts/add", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: title.value,
          d: description.value,
          userId: userId.value,
          votes: 0,
        }),
      });
    console.log(await response.json())
    await router.push("/")
  }

  onMounted(async () => {
    const token = localStorage.getItem('token')
    const response = await fetch("http://localhost:3000/api/auth/user/details", {
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
    userId.value = data.userId
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
