<template>
  <div class="home">
    <TodoList />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
//import HomePage from "@/components/HomePage.vue";
import TodoList from "@/components/TodoList.vue";

@Options({
  components: {
    TodoList,
  },
})
export default class HomeView extends Vue {}
</script>
