<template>
  <div class="NotFound">
    <h1>Oops!</h1>
    <p>
      Sorry, the page you requested cannot be found.
      <router-link to="/">Click here </router-link>to return to the home page.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {}
</script>

<style scoped>
</style>