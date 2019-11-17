<template>
  <div class="App bg-beige text-roboto-sm position-relative" id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
      <Navigation />
    </div>
    <div class="bg-beige" id="app-body">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';

@Component({
  name: 'App',
  components: {
    Navigation,
    Footer
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.capitalize {
  text-transform: capitalize;
}

.App {
  text-align: center;
  min-height: 100vh;
}
.dropdown-item:active {
  background: none;
}
#app-body {
  /* min-height: calc(100vh - 70px); */
  padding-bottom: 100px;
}

.overflow-wrap {
  overflow-wrap: break-word;
}
.text-roboto {
  font-family: "Roboto", sans-serif;
}
.text-roboto-sm {
  font-family: "Roboto Condensed", sans-serif;
}
.text-open-sans {
  font-family: "Open Sans", sans-serif;
}
.text-lato {
  font-family: "Lato", sans-serif;
}
.text-oswald {
  font-family: "Oswald", sans-serif;
}
.text-source-sans-pro {
  font-family: "Source Sans Pro", sans-serif;
}
.text-zcool {
  font-family: "ZCOOL KuaiLe", cursive;
}

.pointer {
  cursor: pointer;
}
.jumbotron {
  background-color: inherit;
}
.bg-purple-xlt {
  background-color: #e1e9ff;
}
.bg-purple-lt {
  background-color: #d4e0ff;
}
.bg-green-lt {
  background-color: #d4ffde;
}
.bg-blue-lt {
  background-color: #ccd8ff;
}
.bg-teal {
  background-color: #e0ffd4;
}
.text-teal {
  color: #e0ffd4;
}
.bg-beige {
  /* background-color: #f5e7d0 */
  background-color: #e8f2ee;
}
.text-popcorn {
  color: #fff3d4;
}
.bg-red-lt {
  background-color: #ff447f;
}
.text-red-lt {
  color: #ff447f;
}
.nav-bg {
  background-color: #449878;
}
.bg-light-green {
  background-color: #7fc2a8;
}
.nav-pills .nav-link.active {
  background-color: #449878;
}
a {
  color: #449878;
}
a:hover {
  color: #28644c;
}
.btn-outline-secondary {
  border-color: #449878;
  color: #449878;
}
.btn-outline-secondary:hover {
  border-color: #449878;
  color: #f5f5f5;
  background-color: #449878;
}
.bg-purple {
  background-color: #352352;
}
.btn-outline-dark {
  border-color: #352352;
  color: #352352;
}
.btn-outline-dark:hover {
  border-color: #352352;
  background-color: #352352;
  color: #f5f5f5;
}

.circle-background,
.circle-progress {
  fill: none;
}

.circle-background {
  stroke: #ddd;
}

.circle-progress {
  stroke: #352352;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.circle-text {
  font-size: 1.5em;
  font-weight: bold;
  fill: #352352;
}
</style>
