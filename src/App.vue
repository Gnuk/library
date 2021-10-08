<template>
  <div id="app">
    <BookVue />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BookVue } from "./infrastructure/primary/book";

@Component({
  components: {
    BookVue,
  },
})
export default class App extends Vue {}
</script>
