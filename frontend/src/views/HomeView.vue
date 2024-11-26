<template>
  <div class="home">
    <HomePage />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HomePage from "@/components/HomePage.vue";

@Options({
  components: {
    HomePage,
  },
})
export default class HomeView extends Vue {}
</script>
