<template>
  <div class="SearchBar">
    <form>
      <div class="form-group my-2">
        <label class="m-auto">
          <strong>Search for a movie, show, or person</strong>
        </label>
        <div class="input-group justify-content-center my-2">
          <input v-model="search" type="text" placeholder="Search here..." class="form-control" />
          <div v-if="search">
            <router-link :to="{ name: 'results', params: { search } }">
              <button class="btn btn-outline-secondary" type="submit">
                <span>Search</span>
              </button>
            </router-link>
          </div>
          <div v-else>
            <button class="btn btn-outline-secondary" type="submit">
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "SearchBar",
  props: ["data"]
})
export default class SearchBar extends Vue {
  search = "";
}
</script>

<style lang="scss" scoped>
</style>