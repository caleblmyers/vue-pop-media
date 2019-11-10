<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->
  <div class="Home">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <div class="display-3">Pop Media</div>
        <div class="lead pt-2">Discover something new!</div>
        <SearchBar :handler="() => {}" />
      </div>
    </div>

    <div v-if="isLoading">
      <div class="position-relative">
        <Loader />
      </div>
    </div>

    <div v-else>
      <div class="Featured">
        <div class="h2 text-center">Movies</div>
        <div class="row no-gutters">
          <div class="col-12 col-md-8">
            <div class="row no-gutters">
              <div class="col-12 col-xl-6 p-3">
                <div class="h5">Featured</div>
                <Carousel :data="movies" type="movie" :handler="null" />
              </div>
              <div class="col-12 col-xl-6 p-3">
                <div class="h5">Top Rated</div>
                <Carousel :data="topMovies" type="topMovie" :handler="null" />
              </div>
            </div>
          </div>
          <!-- <div class="col-12 col-md-4 p-3">
            <div class="h5">In Theaters</div>
            <Table data-set="{this.state.nowPlaying.slice(0," 10)} type="movie" />
          </div>-->
        </div>

        <!-- <div class="h2 text-center">TV Shows</div>
        <div class="row no-gutters">
          <div class="col-12 col-md-8">
            <div class="row no-gutters">
              <div class="col-12 col-xl-6 p-3">
                <div class="h5">Featured</div>
                <Carousel data={this.state.shows} type={"show"} handler={console.log} />
              </div>
              <div class="col-12 col-xl-6 p-3">
                <div class="h5">Top Rated</div>
                <Carousel data={this.state.topShows} type={"topShow"} handler={console.log} />
              </div>
            </div>{/*
            <div class="row no-gutters">
              <div class="col-12">
                <div class="h5">Editor Picks</div>
              </div>
            </div>*/}
          </div>
          <div class="col-12 col-md-4 p-3">
            <div class="h5">Today's Most Popular</div>
            <Table data-set="{this.state.popularShows.slice(0," 10)} type="tv" />
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Vue, Component, Prop } from "vue-property-decorator";
import Carousel from "@/components/Carousel";
import SearchBar from "@/components/SearchBar";
import Loader from "@/components/Loader";
import API from "@/API.ts";

@Component({
  name: "Home",
  components: {
    Carousel,
    SearchBar,
    Loader
  }
})
export default class Home extends Vue {
  movies = [];
  topMovies = [];
  nowPlaying = [];
  shows = [];
  topShows = [];
  popularShows = [];
  isLoading = true;

  mounted() {
    this.gatherData();
  }

  gatherData() {
    API.TMDB.trending("movie")
      .then(movies => {
        if (!movies.data.results) return this.gatherData();
        API.TMDB.topRated("movie")
          .then(topMovies => {
            if (!topMovies.data.results) return this.gatherData();

            this.isLoading = false;
            this.movies = movies.data.results;
            this.topMovies = topMovies.data.results;
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
}
</script>
