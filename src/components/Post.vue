<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import * as config from "../../config.js"
import {onMounted, ref} from "vue"
import {useRoute, useRouter} from "vue-router";
import CommentCard from "./CommentCard.vue";
import TextInput from "@/components/TextInput.vue";
import {mdiArrowDownBold, mdiArrowDownBoldOutline, mdiArrowUpBold, mdiArrowUpBoldOutline} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

const route = useRoute()
  const router = useRouter()
  const postId = route.params.postId
  const title = ref("")
  const description = ref("")
  const postComments = ref([])
  const commentUsernames = ref([])
  const newComment = ref("")
  const loggedIn = ref(false)
  const isOP = ref(false)
  const jwtToken = ref("")
  const username = ref("")
  const OPUsername = ref("")
  const votes = ref(0)
  const upVoted = ref(false)
  const downVoted = ref(false)

  async function getPost(){
    const response = await fetch(`${config.BACKEND}/api/posts/${postId}`)
    const post = (await response.json())[0]
    title.value = post.q
    description.value = post.d
    OPUsername.value = post.username
  }

  async function getPostComments(){
    const res = await fetch(`${config.BACKEND}/api/posts/comments/${postId}`)
    const response = await res.json()
    postComments.value = response.comments
  }

  async function submit(){
    if (newComment.value.trim().length === 0){
      return 0;
    }
    const response = await fetch(`${config.BACKEND}/api/posts/comments/add`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentId: postId,
          parentPost: true,
          content: newComment.value,
          username: username.value,
          tokes: jwtToken.value
        }),
      })
    await getPostComments()
    newComment.value = ""
  }

  async function deleteComment(commentId){
    const response = await fetch(`${config.BACKEND}/api/posts/comments/del/${commentId}`, {
      method: "DELETE",
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    await getPostComments()
  }

  async function deletePost() {
    for (const comment of postComments.value) {
      await deleteComment(comment._id)
    }

    const response = await fetch(`${config.BACKEND}/api/posts/del/${postId}`, {
      method: "DELETE",
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    await router.replace("/")
  }

  async function checkIsOP(){
    if (username.value !== ""){
      isOP.value = username.value === OPUsername.value || username.value === 'mod'
    }
  }

  function isLoggedIn(){
    const token = localStorage.getItem('token')
    if (!!token){
      jwtToken.value = token
      loggedIn.value = true
      username.value = localStorage.getItem("username")
      checkIsOP()
    }else{
      console.log("Not logged In")
    }
  }

  async function newVote(type){
    const response = await fetch(`${config.BACKEND}/api/votes/add`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          postId: postId,
          commentId: "",
          type: type
        }),
      })
  }

  async function removeVote(){
    const response = await fetch(`${config.BACKEND}/api/votes/posts/del/${username.value}/${postId}`, {
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
        newVote(0)
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
    console.log("username: ", username.value)
    const response = await fetch(`${config.BACKEND}/api/votes/${username.value}/${postId}`)
    const data = await response.json()
    console.log("upvoted", data)
    if (data.length !== 0){
      data[0].type ? upVoted.value = true : downVoted.value = true
    }
  }

  async function getVotes(){
    const response = await fetch(`${config.BACKEND}/api/votes/posts/${postId}`)
    const data = await response.json()
    votes.value = data.upvotes.length - data.downvotes.length
  }

  onMounted(async () => {
    await getPost()
    isLoggedIn()
    getPostComments()
    getVotes()
    getUserVote()
  })
</script>


<template>
  <div class="left-column" style="display: flex; flex-direction: column; width: 100%; align-items: center;">
    <p>Posted by <span style="text-decoration: underline">{{ OPUsername }}</span></p>
    <button v-if="isOP" class="side-button" @click="deletePost">Delete Post</button>
  </div>
  <div class="middle-column ">
    <div class="post-data">
      <h1>
        {{ title }}
      </h1>
      <p class="question-description">
        {{ description }}
      </p>
    </div>
    <div class="post-comments">
      <div v-if="loggedIn" class="add-comment">

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

        <TextInput class="input-area" rows="2" v-model="newComment" placeholder="Add a comment!" :styles="{'margin': '0'}" />
        <button class="side-button submit-button" @click="submit">Submit!</button>
      </div>
      <p v-if="postComments.length === 0" style="color:#9ccc65">No comments</p>
      <CommentCard v-else @deleteComment="(commentId) => deleteComment(commentId)" v-for="(comment, i, j) in postComments" :comment="comment" :username="username" />
    </div>
  </div>
</template>


<style scoped>
.input-area {
  font-size: large;
  width: 100%;
  resize: vertical;
  min-height: 1.6em;
}

.question-description{
  font-size: medium;
  font-weight: 400;
}

.add-comment {
  display: flex;
  align-items: center;
  height: 100%;
  margin-bottom: 25px;
  gap: 10px;
}

.vote-block{
  margin-right: auto;
  padding: 0;
}

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
</style>
