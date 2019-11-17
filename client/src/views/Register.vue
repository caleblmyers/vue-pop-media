<template>
  <div class="Register container">
    <div class="row mb-3">
      <div class="col">
        <h1>Register Account</h1>
      </div>
    </div>
    <template v-if="error">
      <div class="row">
        <div class="col">
          <div class="alert alert-danger mb-3" role="alert">{{error}}</div>
        </div>
      </div>
    </template>
    <div class="row mt-3">
      <div class="col">
        <RegistrationForm :onSubmit="handleSubmit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import API from '../API';
import RegistrationForm from '@/components/RegistrationForm.vue';

@Component({
  components: {
    RegistrationForm
  }
})
export default class Register extends Vue {
  public redirectToReferrer = false;
  public error = '';

  public handleSubmit(username, email, password, confirm) {
    if (password === confirm) {
      API.Users.register(username, email, password)
        .then(response => {
          this.redirectToReferrer = true;
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.error =
              'Sorry, that username and/or email is in use. Please try again.';
          } else {
            console.log(err);
          }
        });
    } else {
      this.error = 'Please enter the same password in both fields.';
    }
  }
}
</script>

<style scoped>
</style>