<template>
  <div class="ResultsGrid row no-gutters justify-content-center">
    <div v-for="result in results" class="col-6 col-md-4 col-lg-6 col-xl-3 p-3" :key="result.id">
      <div class="card border-dark rounded bg-light-grey mb-3">
        <div class="row no-gutters">
          <div class="col-12 col-lg-5">
            <img alt="Result" class="img-fluid rounded" :src="imgSrc(result)" />
          </div>
          <div class="col-12 col-lg-7">
            <div class="card-body p-1">
              <h5 class="px-3 pt-2">{{result.title || result.name}}</h5>
              <h6 class="text-muted capitalize">{{result.media_type}}</h6>
              <h6
                class="text-muted"
              >Release Date: {{moment((result.release_date || result.first_air_date)).format("MM/DD/YYYY")}}</h6>
              <template v-if="result.genre_ids">
                <h6 class="text-muted">
                  <span
                    v-for="(genre, index) in result.genre_ids"
                    :key="genre"
                  >{{index !== result.genre_ids.length - 1 ? `${genres[type][genre]}, ` : genres[type][genre]}}</span>
                </h6>
              </template>
              <div class="row no-gutters mt-3">
                <template v-if="result.vote_average >= 0">
                  <div class="col-12 col-md-6">
                    <div>
                      <div class="text-sm pb-2">
                        Rating
                        <span class="text-xs">{{`${result.vote_count} votes`}}</span>
                      </div>
                      <svg :width="sqSize" :height="sqSize" :viewBox="viewBox">
                        <circle
                          class="circle-background"
                          :cx="sqSize / 2"
                          :cy="sqSize / 2"
                          :r="radius"
                          :strokeWidth="`${strokeWidth}px`"
                        />
                        <circle
                          class="circle-progress"
                          :cx="sqSize / 2"
                          :cy="sqSize / 2"
                          :r="radius"
                          :strokeWidth="`${strokeWidth}px`"
                          :transform="`rotate(-90 ${sqSize / 2} ${sqSize / 2})`"
                          :style="{
                                strokeDasharray: dashArray,
                                strokeDashoffset: dashArray - dashArray * result.vote_average / 10
                              }"
                        />
                        <text
                          class="circle-text"
                          x="50%"
                          y="50%"
                          dy=".3em"
                          text-anchor="middle"
                        >{{`${result.vote_average * 10}%`}}</text>
                      </svg>
                    </div>
                  </div>
                </template>
                <div class="col align-self-center">
                  <router-link :to="`/details/${result.media_type || type}/${result.id}`">
                    <button class="btn btn-outline-dark my-2">Details</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

import Person from "@/img/person_placeholder.png";
import MediaTall from "@/img/media_placeholder_tall.png";

@Component({
  name: "ResultsGrid",
  props: ["results"]
})
export default class ResultsGrid extends Vue {
  sqSize = 80;
  strokeWidth = 4;
  radius = (sqSize - strokeWidth) / 2;
  viewBox = `0 0 ${sqSize} ${sqSize}`;
  dashArray = radius * Math.PI * 2;
  type = this.results[0].name ? "tv" : "movie";
  genres = {
    movie: {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western"
    },
    tv: {
      10759: "Action & Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      10762: "Kids",
      9648: "Mystery",
      10763: "News",
      10764: "Reality",
      10765: "Sci-Fi & Fantasy",
      10766: "Soap",
      10767: "Talk",
      10768: "War & Politics",
      37: "Western"
    }
  };

  get imgSrc() {
    let src;
    result.media_type === "person"
      ? result.profile_path
        ? `https://image.tmdb.org/t/p/original/${result.profile_path}`
        : Person
      : result.poster_path
      ? `https://image.tmdb.org/t/p/original/${result.poster_path}`
      : MediaTall;

    return src;
  }
}
</script>

<style lang="scss" scoped>
</style>