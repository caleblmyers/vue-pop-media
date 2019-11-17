<template>
  <div class="Login container">
    <div class="row mb-3">
      <div class="col">
        <h1>Login</h1>
      </div>
    </div>
    <template v-if="created">
      <div class="row">
        <div class="col">
          <div class="alert alert-success mb-3" role="alert">{{created}}</div>
        </div>
      </div>
    </template>
    <template v-if="deleted">
      <div class="row">
        <div class="col">
          <div class="alert alert-info mb-3" role="alert">{{deleted}}</div>
        </div>
      </div>
    </template>
    <template v-if="error">
      <div class="row">
        <div class="col">
          <div class="alert alert-danger mb-3" role="alert">{{error}}</div>
        </div>
      </div>
    </template>
    <div class="row mt-3">
      <div class="col">
        <LoginForm :onSubmit="handleSubmit" />
        <div class="mt-3">
          Don't have an account?
          <router-link to="/register">Click here to register.</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import API from '../API';
import LoginForm from '@/components/LoginForm.vue';

@Component({
  components: {
    LoginForm
  },
  props: {
    from: {
      type: String
    },
    newUser: {
      type: Object
    },
    onLogin: {
      type: Function
    }
  }
})
export default class Login extends Vue {
  public redirectToReferrer = false;
  public error = '';
  public created = '';
  public deleted = '';

  public mounted() {
    const from = this.$props.from || 'Unknown';
    const newUser = this.$props.newUser || false;
    if (from && from.pathname === '/account') {
      this.deleted = 'Your account has been deleted';
    } else if (newUser) {
      this.created = 'Account created successfully!';
    }
  }

  public handleSubmit(username, password) {
    API.Users.login(username, password)
      .then(response => response.data)
      .then(({ user, token }) => {
        this.$props.onLogin(user, token);
        this.redirectToReferrer = true;
        this.error = '';
      })
      .catch(err => {
        let message;

        switch (err.response.status) {
          case 401:
            message =
              'Sorry, that username/password combination is not valid. Please try again.';
            break;
          case 500:
            message = 'Server error. Please try again later.';
            break;
          default:
            message = 'Unknown error.';
        }

        this.error = message;
        this.deleted = '';
        this.created = '';
      });
  }
}
</script>

<style scoped>
</style>