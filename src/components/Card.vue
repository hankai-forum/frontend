<!-- vim: set ts=2 sts=2 sw=2: -->
<script setup>
  const props = defineProps({
    question: String,
    description: String,
    postUrl: String
  })
</script>


<template>
    <div class="card-wrapper">
      <router-link :to="postUrl">
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

.card-wrapper {
  margin-bottom: 15px;
  width: 100%;
  border: 2px white solid;
  border-radius: 10px;
}
</style>
