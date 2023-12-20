<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
import {onMounted, ref} from "vue"
import {useRoute, useRouter} from "vue-router";
import CommentCard from "./CommentCard.vue";
import TextInput from "@/components/TextInput.vue";

const route = useRoute()
  const router = useRouter()
  const postId = route.params.postId
  const title = ref("")
  const description = ref("")
  const postUserId = ref("")
  const postComments = ref([])
  const commentUsernames = ref([])
  const newComment = ref("")
  const loggedIn = ref(false)
  const isOP = ref(false)
  const jwtToken = ref("")
  const userId = ref("")
  const loaded = ref(false)
  const username = ref("")

  async function getPost(){
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`)
    const post = (await response.json())[0]
    title.value = post.q
    description.value = post.d
    postUserId.value = post.userId
    await getPostComments()
    await isLoggedIn()
  }

  async function getUsername(userId){
    const response = await fetch(`http://localhost:3000/api/auth/user/getUser/${userId}`)
    return (await response.json())[0]
  }

  async function getPostComments(){
    const response = await fetch(`http://localhost:3000/api/posts/comments/${postId}`)
    postComments.value = await response.json()
    commentUsernames.value = []
    for (const comment of postComments.value){
      const username = (await getUsername(comment.userId)).username
      commentUsernames.value.push(username)
    }
  }

  async function submit(){
    const response = await fetch("http://localhost:3000/api/posts/comments/add", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentId: postId,
          parentPost: true,
          content: newComment.value,
          userId: userId.value
        }),
      })
    await getPostComments()
    newComment.value = ""
  }

  async function deleteComment(commentId){
    console.log(commentId)
    const response = await fetch(`http://localhost:3000/api/posts/comments/del/${commentId}`, {
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

    const response = await fetch(`http://localhost:3000/api/posts/del/${postId}`, {
      method: "DELETE",
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    await router.replace("/")
  }

  async function checkIsOP(){
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
    if (userId.value === postUserId.value){
      isOP.value = true
    }
    loaded.value = true
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

  onMounted(() => {
    getPost()
  })
</script>


<template>
  <div v-if="isOP" class="left-column" style="display: flex; flex-direction: column; width: 100%; align-items: center;">
    <button class="side-button" @click="deletePost">Delete Post</button>
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
        <TextInput class="input-area" rows="2" v-model="newComment" placeholder="Add a comment!" :styles="{'margin': '0'}" />
        <button class="side-button submit-button" @click="submit">Submit!</button>
      </div>
      <p v-if="postComments.length === 0" style="color:#9ccc65">No comments</p>
      <CommentCard v-else-if="loaded" @deleteComment="(commentId) => deleteComment(commentId)" v-for="(comment, i, j) in postComments" :comment="comment" :userId="userId" :username="commentUsernames[i]" />
      <CommentCard v-else v-for="(comment, i, j) in postComments" :comment="comment" :userId="userId" :username="commentUsernames[i]" />
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
</style>
