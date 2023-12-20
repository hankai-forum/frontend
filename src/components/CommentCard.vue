<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
  import { useRouter } from "vue-router"
  import { onMounted, ref, defineEmits } from "vue"

  const router = useRouter()

  const props = defineProps({
    comment: Object,
    userId: String,
    username: String
  })

  const emit = defineEmits(["deleteComment"])

  const commentId = props.comment._id

  const isOP = ref(false)

  onMounted(() => {
    if (props.comment.userId === props.userId){
      isOP.value = true
    }
  })
</script>


<template>
  <div class="comment-card-wrapper">
    <p class="commenter">{{ props.username }}</p>
    <div class="comment-content-wrapper">
      <p class="">
        {{ props.comment.content }}
      </p>
      <button v-if="isOP" class="delete-button" @click="$emit('deleteComment', commentId)">Delete</button>
    </div>
  </div>
</template>


<style scoped>
.commenter{
  //border: 1px white solid;
  //border-radius: 6px;
  text-decoration: underline;
  font-size: small;
  padding: 0.1em
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
