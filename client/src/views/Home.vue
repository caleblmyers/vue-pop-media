<template>
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
          <div class="col-12 col-md-4 p-3">
            <div class="h5">In Theaters</div>
            <Table :dataSet="nowPlaying.slice(0, 10)" type="movie" />
          </div>
        </div>

        <div class="h2 text-center">TV Shows</div>
        <div class="row no-gutters">
          <div class="col-12 col-md-8">
            <div class="row no-gutters">
              <div class="col-12 col-xl-6 p-3">
                <div class="h5">Featured</div>
                <Carousel :data="shows" :type="'show'" />
              </div>
              <div class="col-12 col-xl-6 p-3">
                <div class="h5">Top Rated</div>
                <Carousel :data="topShows" type="topShow" />
              </div>
            </div>
            <!-- <div class="row no-gutters">
              <div class="col-12">
                <div class="h5">Editor Picks</div>
              </div>
            </div>-->
          </div>
          <div class="col-12 col-md-4 p-3">
            <div class="h5">Today's Most Popular</div>
            <Table :dataSet="popularShows.slice(0, 10)" type="tv" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Carousel from '@/components/Carousel.vue';
import SearchBar from '@/components/SearchBar.vue';
import Loader from '@/components/Loader.vue';
import Table from '@/components/Table.vue';
import API from '../API';

@Component({
  name: 'Home',
  components: {
    Carousel,
    SearchBar,
    Loader,
    Table
  }
})
export default class Home extends Vue {
  public movies = [];
  public topMovies = [];
  public nowPlaying = [];
  public shows = [];
  public topShows = [];
  public popularShows = [];
  public isLoading = true;

  public mounted() {
    this.gatherData();
  }

  public gatherData() {
    API.TMDB.trending('movie')
      .then(movies => {
        if (!movies.data.results) return this.gatherData();
        API.TMDB.topRated('movie')
          .then(topMovies => {
            if (!topMovies.data.results) return this.gatherData();
            API.TMDB.nowPlaying().then(nowPlaying => {
              if (!nowPlaying.data.results) return this.gatherData();
              API.TMDB.trending('tv').then(shows => {
                if (!shows.data.results) return this.gatherData();
                API.TMDB.topRated('tv').then(topShows => {
                  if (!topShows.data.results) return this.gatherData();
                  API.TMDB.popular('tv').then(popularShows => {
                    if (!popularShows.data.results) return this.gatherData();
                    this.isLoading = false;
                    this.movies = movies.data.results;
                    this.topMovies = topMovies.data.results;
                    this.nowPlaying = nowPlaying.data.results;
                    this.shows = shows.data.results;
                    this.topShows = topShows.data.results;
                    this.popularShows = popularShows.data.results;
                  });
                });
              });
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
}
</script>

<style lang="scss">
.now-playing,
.now-playing:hover {
  color: inherit;
  text-decoration: none;
}

.table {
  max-width: 100%;
}
</style>