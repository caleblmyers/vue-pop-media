<template>
  <div class="SearchBar">
    <form>
      <div class="form-group my-2">
        <label class="m-auto">
          <strong>Search for a movie, show, or person</strong>
        </label>
        <div class="input-group justify-content-center my-2">
          <input v-model="keyword" type="text" placeholder="Search here..." class="form-control" />
          <div v-if="keyword">
            <div v-if="routeName === 'results'">
              <button class="btn btn-outline-secondary" @click="event => handler(keyword, event)">
                <span>Search</span>
              </button>
            </div>
            <div v-else>
              <router-link :to="{ name: 'results', params: { search } }">
                <button class="btn btn-outline-secondary" type="submit">
                  <span>Search</span>
                </button>
              </router-link>
            </div>
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

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'SearchBar',
  props: ['handler'],
})
export default class SearchBar extends Vue {
  public keyword = '';

  get routeName() {
    console.log(this.$route.name);
    return this.$route.name;
  }
}
</script>

<style lang="scss" scoped>
</style>