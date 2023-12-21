<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiArrowUpBoldOutline, mdiArrowDownBoldOutline, mdiArrowUpBold, mdiArrowDownBold } from '@mdi/js'
  import { ref } from "vue"

  const props = defineProps({
    question: String,
    description: String,
    postUrl: String,
    votes: Number
  })

  const votes = ref(props.votes)
  const upVoted = ref(false)
  const downVoted = ref(false)

  function addVote(amount){
    if (!downVoted.value){
      if (!upVoted.value){
        votes.value = votes.value + amount
      }else{
        votes.value = votes.value - amount
      }
      upVoted.value = !upVoted.value
    }
  }

  function reduceVote(amount){
    if (!upVoted.value){
      if (!downVoted.value){
        votes.value = votes.value - amount
      }else{
        votes.value = votes.value + amount
      }
      downVoted.value = !downVoted.value
    }
  }
</script>


<template>
  <div class="content-wrapper">
    <div class="vote-block">
      <button v-if="!upVoted" @click="addVote(1)" class="vote-button">
        <SvgIcon class="arrow" type="mdi" :path="mdiArrowUpBoldOutline" />
      </button>
      <button v-else @click="addVote(1)" class="vote-button">
        <SvgIcon class="arrow" type="mdi" :path="mdiArrowUpBold" />
      </button>

      <p class="vote-count">{{ votes }}</p>

      <button v-if="!downVoted" @click="reduceVote(1)" class="vote-button">
        <SvgIcon class="arrow" type="mdi" :path="mdiArrowDownBoldOutline" />
      </button>
      <button v-else @click="reduceVote(1)" class="vote-button">
        <SvgIcon class="arrow" type="mdi" :path="mdiArrowDownBold" />
      </button>
    </div>
    <div class="card-contents">
      <router-link :to="postUrl">
        <p class="question-title">
          {{ question }}
        </p>
        <p>
          {{ description }}
        </p>
      </router-link>
    </div>
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
