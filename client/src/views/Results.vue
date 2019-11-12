<template>
  <div class="SearchResults">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <div class="display-3">Pop Media</div>
        <div class="lead pt-2">Discover something new!</div>
        <SearchBar :handler="this.submit" />
      </div>
    </div>
    <div class="display-4">
      Search Results for
      <span class="capitalize">{{keyword}}</span>
    </div>
    <template v-if="resultsLoaded">
      <ResultsGrid :results="results" />
    </template>
    <template v-else>
      <div class="h2">Nothing here yet! Type something above to make a search.</div>
    </template>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

import API from "@/API";
import SearchBar from "@/components/SearchBar";
import ResultsGrid from "@/components/ResultsGrid";

@Component({
  name: "Results",
  components: {
    SearchBar,
    ResultsGrid
  }
})
export default class Results extends Vue {
  keyword = "";
  results;
  resultsLoaded = false;

  mounted() {
    this.keyword && this.processSearch(this.keyword);
  }

  submit = (keyword, e) => {
    e && e.preventDefault();
    this.processSearch(keyword || this.keyword);
  };

  processSearch(keyword) {
    API.TMDB.search(keyword)
      .then(res => {
        console.log(res.data.results);
        console.log(this.results);
        this.results = res.data.results;
        this.resultsLoaded = true
        console.log(this.results);
      })
      .catch(err => console.log(err));
  };
}
</script>

<style lang="scss" scoped>
</style>