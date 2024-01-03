<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiArrowUpBoldOutline, mdiArrowDownBoldOutline, mdiArrowUpBold, mdiArrowDownBold } from '@mdi/js'
  import { ref, onMounted } from "vue"

  const props = defineProps({
    question: String,
    description: String,
    postId: String,
    loggedIn: Boolean,
    username: String
  })

  const votes = ref(0)
  const upVoted = ref(false)
  const downVoted = ref(false)

  async function newVote(type){
    const response = await fetch(`http://localhost:3000/api/votes/add`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: props.username,
          postId: props.postId,
          commentId: "",
          type: type
        }),
      })
  }

  async function removeVote(){
    const response = await fetch(`http://localhost:3000/api/votes/posts/del/${props.username}/${props.postId}`, {
      method: "DELETE",
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      }
    })
  }

  function addVote(){
    if (!downVoted.value){
      if (!upVoted.value){
        votes.value = votes.value + 1
        newVote(1)  // upvote type 1
      }else{
        votes.value = votes.value - 1
        removeVote()
      }
      upVoted.value = !upVoted.value
    }else{
      votes.value = votes.value + 2
      upVoted.value = !upVoted.value
      downVoted.value = !downVoted.value
      newVote(1)
      removeVote()
    }
  }

  function reduceVote(){
    if (!upVoted.value){
      if (!downVoted.value){
        votes.value = votes.value - 1
        removeVote()
      }else{
        votes.value = votes.value + 1
        newVote(0)  // downvote type 0
      }
      downVoted.value = !downVoted.value
    }else{
      votes.value = votes.value - 2
      upVoted.value = !upVoted.value
      downVoted.value = !downVoted.value
      newVote(0)
      removeVote()
    }
  }

  async function getUserVote(){
    const response = await fetch(`http://localhost:3000/api/votes/${props.username}/${props.postId}`)
    const data = await response.json()
    console.log(data)
    if (data.length !== 0){
      data[0].type ? upVoted.value = true : downVoted.value = true
    }
  }

  async function getVotes(){
    const response = await fetch(`http://localhost:3000/api/votes/posts/${props.postId}`)
    const data = await response.json()
    votes.value = data.upvotes.length - data.downvotes.length
  }

  onMounted(() => {
    getVotes()
    getUserVote()
  })
</script>


<template>
  <div class="content-wrapper">
    <div class="vote-block">
      <button v-if="!upVoted" @click="addVote" class="vote-button">
        <SvgIcon class="arrow" type="mdi" :path="mdiArrowUpBoldOutline" />
      </button>
      <button v-else @click="addVote " class="vote-button">
        <SvgIcon class="arrow" type="mdi" :path="mdiArrowUpBold" />
      </button>

      <p class="vote-count">{{ votes }}</p>

      <button v-if="!downVoted" @click="reduceVote" class="vote-button">
        <SvgIcon class="arrow" type="mdi" :path="mdiArrowDownBoldOutline" />
      </button>
      <button v-else @click="reduceVote" class="vote-button">
        <SvgIcon class="arrow" type="mdi" :path="mdiArrowDownBold" />
      </button>
    </div>
    <router-link class="card-contents" :to="`/post/${postId}`">
      <p class="question-title">
        {{ question }}
      </p>
      <p>
        {{ description }}
      </p>
    </router-link>
  </div>
</template>


<style scoped>
.vote-button{
  margin: 0;
  padding: 0 0.3em 0 0.3em;
  border: 0;
}

.vote-button:hover{
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
}

.arrow{
  height: 2rem;
  margin: 0;
  padding: 0;
}

.vote-count{
  font-size: large;
  margin: 0.16rem 0 0.16rem 0
}

.content-wrapper {
  margin-bottom: 15px;
  width: 100%;
  border: 2px white solid;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem 0 1rem;
}

.card-contents{
  justify-self: center;
  margin-right: auto;
  margin-left: -2em;
  width: 100%;
}

.vote-block{
  margin-right: auto;
  padding: 0;
}

.question-title {
  font-size: x-large;
  font-weight: 500;
}

a,
a:active,
a:visited {
  text-decoration: none;
}

a {
  color: white;
}

a:active,
a:visited {
  color: lightgrey;
}
</style>
