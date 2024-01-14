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
  import { useRouter } from "vue-router"
  import { onMounted, ref, defineEmits } from "vue"
  import SvgIcon from '@jamescoyle/vue-icon'
  import {mdiArrowUpBoldOutline, mdiPlusCircleOutline} from '@mdi/js'
  import * as config from "../../config.js";


  const router = useRouter()

  const props = defineProps({
    comment: Object,
    username: String
  })

  const emit = defineEmits(["deleteComment"])

  const commentId = props.comment._id

  const isOP = ref(false)
  const showEmojiPopup = ref(false)
  const reactions = ref()
  const emojis = ref(["6️⃣", "🆗", "🤷‍♀️", "🖕", "😠", "❤️"])

  const toggleEmojiPopup = () => {
    showEmojiPopup.value = !showEmojiPopup.value;
  }

  async function addReaction(emoji){
    showEmojiPopup.value = false; // Hide the popup after selecting an emoji
    const response = await fetch(`${config.BACKEND}/api/reaction/add`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: props.username,
          content: emoji,
          commentId: commentId
        }),
      });
    await getReactions()
  }

  async function getReactions(){
    const response = await fetch(`${config.BACKEND}/api/reaction/${commentId}`)
    reactions.value = await response.json()
    reactions.value = reactions.value.map(obj => ({...obj, displayReactionUsername: false}))
    console.log("Reactions: ", JSON.parse(JSON.stringify(reactions.value)))
  }
  async function removeReaction(reactionId){
    if (props.username){
      const response = await fetch(`${config.BACKEND}/api/reaction/del/${reactionId}/${props.username}`, {
        method: "DELETE",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
      })
      await getReactions()
    }
  }

  onMounted(() => {
    isOP.value = props.comment.username === props.username || props.username === 'mod'
    getReactions()
  })
</script>


<template>
  <div class="comment-card-wrapper">
    <div class="name-reaction-wrap">
      <router-link :to="`/profile/${props.comment.username}`" style="color: inherit" >
        <p class="commentor">{{ props.comment.username }}</p>
      </router-link>
      <div class="reaction-wrapper">
        <div v-for="reaction in reactions" style="padding: 0; margin: 0;">
          <p v-if="reaction.displayReactionUsername" class="reaction-username" >{{ reaction.username }}</p>
          <p class="reaction" @click="removeReaction(reaction._id)" style="cursor: pointer;" v-on:mouseover="reaction.displayReactionUsername = !reaction.displayReactionUsername" >{{ reaction.content }}</p>
        </div>
        <button v-if="props.username" class="add-button" @click="toggleEmojiPopup">
        <SvgIcon class="add" type="mdi" :path="mdiPlusCircleOutline" />
        </button>
        <div v-if="showEmojiPopup" class="emoji-popup">
          <p class="emoji" v-for="emoji in emojis" @click="addReaction(emoji)">{{ emoji }}</p>
        </div>
      </div>
    </div>
    <div class="comment-content-wrapper">
      <p class="">
        {{ props.comment.content }}
      </p>
      <button v-if="isOP" class="delete-button" @click="$emit('deleteComment', commentId)">Delete</button>
    </div>
  </div>
</template>


<style scoped>
.reaction-username{
  padding: 0;
  margin: 0;
}

.emoji-popup {
  left: 0;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  padding: 0 0.2rem 0 0.2rem;
}

.emoji {
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.add-button{
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 100%;
}

.add-button:hover{
  background-color: rgba(0, 0, 0, 0);
}

.add{
  margin: 0 0 -0.22rem 0;
  padding: 0;
  height: 1.2rem;
}

.reaction {
  padding: 0;
  margin: 0;
}

.reaction-wrapper{
  margin-left: 1rem;
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.name-reaction-wrap{
  display: flex;
  align-items: center;
}

.commentor{
  text-decoration: underline;
  font-size: small;
  padding: 0;
  margin: 0 0 0.2rem 0.4rem;
}

.comment-card-wrapper{
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.delete-button{
  font-size: medium;
  margin-right: 0.3rem;
}

a,
a:active,
a:visited {
  color: white;
  text-decoration: none;
}

p {
  text-align: left;
  padding: 0 8px 0 8px
}

.comment-content-wrapper {
  width: 100%;
  border: 1px lightgreen solid;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
