<template>
  <div class="Navigation sticky-top nav-bg">
    <nav class="navbar navbar-dark navbar-expand-lg">
      <img class="brand-img" :src="popcorn" alt="Pop Media" />
      <router-link class="navbar-brand" to="/">Pop Media</router-link>
      <button
        :class="togglerClass"
        @click="toggleCollapse"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div :class="targetClass" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="toggleCollapse">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/discover" @click="toggleCollapse">Discover</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/results" @click="toggleCollapse">Search</router-link>
          </li>
          <span v-if="1">
            <li class="nav-item">
              <router-link class="nav-link" to="/account" @click="toggleCollapse">Account</router-link>
            </li>
          </span>
        </ul>
        <ul class="navbar-nav ml-auto">
          <span v-if="1 === 0">
            <AuthDropdown @click="toggleCollapse" />
          </span>
          <span v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/login" @click="toggleCollapse">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register" @click="toggleCollapse">Register</router-link>
            </li>
          </span>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Popcorn from '@/img/popcorn.png';

export default class Navigation extends Vue {
  public popcorn = Popcorn;
  public collapsed = true;
  public togglerClass = `navbar-toggler ${this.collapsed && 'collapsed'}`;
  public targetClass = `collapse navbar-collapse ${!this.collapsed && 'show'}`;

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
</script>

<style lang="scss">
.Navigation {
  color: #f5f5f5;
  /* min-height: 70px; */
}
.nav-bg {
  background-color: #449878;
}
.bg-navy {
  background-color: rgb(41, 31, 133);
}

.brand-img {
  max-height: 45px;
  margin-right: auto;
}
.navbar-dark .navbar-brand {
  margin: 0 auto;
}
.navbar-dark .navbar-toggler {
  margin-left: auto;
}

@media only screen and (min-width: 992px) {
  .brand-img {
    margin-right: 0.75rem;
  }
}
</style>
