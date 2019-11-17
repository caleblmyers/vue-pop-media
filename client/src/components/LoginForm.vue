<template>
  <div class="LoginForm">
    <form class="LoginForm" @submit="handleSubmit">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <!-- <Octicon icon="{Person}" /> -->
            Octicon
          </span>
        </div>
        <input
          id="username"
          type="username"
          name="username"
          placeholder="MovieBuff25"
          class="form-control"
          :value="username"
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
          id="password"
          type="password"
          name="password"
          placeholder="password"
          class="form-control"
          :value="password"
          @change="handleInputChange"
        />
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
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
export default class LoginForm extends Vue {
  public username = '';
  public password = '';

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