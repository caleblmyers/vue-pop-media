<template>
  <div class="LoginForm">
    <form @submit="handleSubmit">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <!-- <Octicon icon="{Person}" /> -->
            Octicon
          </span>
        </div>
        <input
          class="form-control"
          id="username"
          type="username"
          name="username"
          placeholder="MovieBuff25"
          :value="username"
          @change="handleInputChange"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <!-- <Octicon icon="{Mail}" /> -->
            Octicon
          </span>
        </div>
        <input
          class="form-control"
          id="email"
          type="email"
          name="email"
          placeholder="email@provider.com"
          :value="email"
          @change="handleInputChange"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <!-- <Octicon icon="{Key}" /> -->
            Octicon
          </span>
        </div>
        <input
          class="form-control"
          id="password"
          type="password"
          name="password"
          placeholder="password"
          :value="password"
          @change="handleInputChange"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <!-- <Octicon icon="{Key}" /> -->
            Octicon
          </span>
        </div>
        <input
          class="form-control"
          id="password-confirm"
          type="password"
          name="passwordConfirm"
          placeholder="password (again)"
          :value="passwordConfirm"
          @change="handleInputChange"
        />
      </div>

      <button class="btn btn-primary" type="submit">Register Now!</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  props: {
    onSubmit: {
      type: Function,
    },
  },
})
export default class RegistrationForm extends Vue {
  public username = '';
  public email = '';
  public password = '';
  public passwordConfirm = '';

  public handleInputChange(e) {
    const { name, value } = e.target;
    this[name] = value;
  }

  public handleSubmit(e) {
    e.preventDefault();
    this.$props.onSubmit(this.username, this.password);
  }
}
</script>

<style scoped>
</style>