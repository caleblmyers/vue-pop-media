<template>
  <span>
    <template v-if="error">
      <div class="row bg-light-grey py-2 border-round" id>
        <div class="col-12 px-3 py-2 align-self-center">
          <div class="h6">
            <strong>Data Unavailable</strong>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="isLoading">
      <div
        id="data-container"
        class="EpisodeReel position-relative row justify-content-center bg-light-grey border-round py-2 p-3"
      >
        <Loader />
      </div>
    </template>
    <template v-if="!isLoading">
      <div
        class="EpisodeReel position-relative row justify-content-center bg-light-grey border-round py-2 p-3"
        id="data-container"
      >
        <button
          id="prev"
          class="btn"
          :class="{ 'd-none': (type === 'movie' || slide === 1) }"
          @click="event => changeSlide(event)"
        >&#10094;</button>
        <button
          id="next"
          class="btn"
          :class="{ 'd-none': (type === 'movie' || slide >= maxSlide) }"
          @click="event => changeSlide(event)"
        >&#10095;</button>
        <div class="card bg-light-grey border-0 mb-3">
          <div class="row no-gutters">
            <div class="col-10 col-md-4 my-auto mx-auto p-3">
              <img :alt="content.name" class="card-img-top img-fluid" :src="imgSrc" />
            </div>
            <div class="col-12 col-md-8 text-center">
              <div class="card-body">
                <h5 class="mb-0 card-title">
                  <strong>{{content.name || content.title}}</strong>
                </h5>
                <p class="mb-0 card-text">
                  <small class="text-muted">{{moment(content.air_date).format("MMMM Do, YYYY")}}</small>
                </p>
                <p
                  v-if="content.overview"
                  class="text-sm"
                >{{content.overview.length > 255 ? `${content.overview.slice(0, 255)}...` : content.overview}}</p>
                <div v-if="(content.episodes || content.parts)" class="row">
                  <div class="col-12 col-md-10 mx-auto" id="carousel-container">
                    <Carousel
                      :data="content.episodes || content.parts"
                      :type="type === 'tv' ? 'episodes' : type"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import API from '../API';
import Carousel from '@/components/Carousel.vue';
import Loader from '@/components/Loader.vue';
import moment from 'moment';
import MediaTall from '../img/media_placeholder_tall.png';

@Component({
  components: {
    Loader,
    Carousel
  },
  props: ['data', 'type', 'id']
})
export default class EpisodeReel extends Vue {
  public data;
  public type;
  public id;
  public isLoading = true;
  public slide = 0;
  public maxSlide = this.type === 'movie' ? '' : this.data.length - 1;
  public season = {};
  public collection = {};
  public error = false;
  get displayPrev() {
    return this.slide === 1 ? 'd-none' : '';
  }
  get displayNext() {
    return this.slide >= this.maxSlide ? 'd-none' : '';
  }
  get content() {
    const content = this.type === 'movie' ? this.collection : this.season;
    return content;
  }

  get imgSrc() {
    const src = this.content.poster_path
      ? `https://image.tmdb.org/t/p/original/${this.content.poster_path}`
      : MediaTall;
    return src;
  }

  public moment() {
    return moment();
  }

  public mounted() {
    if (this.type === 'movie') {
      return this.getCollection();
    }

    if (this.data.length > 0) {
      this.getSeason(0);
    }
  }

  public getSeason(slide) {
    console.log('getting seasons...');
    API.TMDB.season(this.type, this.id, this.slide)
      .then(season => {
        console.log(season.data);
        if (season.data.name === 'Error') return (this.error = true);
        this.slide = slide;
        this.season = season.data;
        this.isLoading = false;
      })
      .catch(err => console.log(err));
  }

  public getCollection() {
    console.log('getting collection...');
    API.TMDB.collection(this.id)
      .then(collection => {
        console.log(collection.data);
        if (collection.data.name === 'Error') {
          return (this.error = true);
        }
        this.collection = collection.data;
        this.isLoading = false;
        console.log('received collection');
      })
      .catch(err => console.log(err));
  }

  public changeSlide(e) {
    this.isLoading = true;
    if (e.target.id === 'next') this.getSeason(this.slide + 1);
    else this.getSeason(this.slide - 1);
  }
}
</script>

<style lang="scss" scoped>
</style>