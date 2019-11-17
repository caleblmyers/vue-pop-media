<template>
  <li class="nav-item dropdown">
    <button
      class="btn btn-link dropdown-toggle no-link"
      @click="toggleOpen"
      id="navbarDropdown"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <!-- <Gravatar class="rounded-circle" :email="user.username" size="30" /> -->
      {{user.username}}
    </button>
    <div
      class="dropdown-menu dropdown-menu-right"
      :class="{ 'show': isOpen }"
      aria-labelledby="navbarDropdown"
    >
      <div class="dropdown-item pointer" @click="handleLogout">Logout</div>
    </div>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  props: {
    onClick: {
      type: Function,
    },
  },
})
export default class AuthDropdown extends Vue {
  public isOpen = false;
  public context = null;

  public toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  public handleLogout() {
    this.context.onLogout();
    this.$props.onClick();
  }
}
</script>

<style lang="scss" scoped>
</style>