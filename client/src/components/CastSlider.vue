<template>
  <span>
    <div v-if="cast.length === 0" class="row bg-light-grey py-2 border-round" id>
      <div class="col-12 px-3 py-2 align-self-center">
        <div class="h6 pl-2">
          <strong>Cast unavailable</strong>
        </div>
      </div>
    </div>

    <div
      v-else
      class="CastSlider position-relative row justify-content-center bg-light-grey py-2"
      id="cast-container"
    >
      <button id="prev" :class="`btn ${displayPrev}`" @click="event => changeSlide(event)">&#10094;</button>
      <button id="next" :class="`btn ${displayNext}`" @click="event => changeSlide(event)">&#10095;</button>
      <div
        v-for="credit in cast.slice(((slide - 1) * 4), (slide * 4))"
        class="col-4 col-md-2 px-0 py-2 mx-2 align-self-center"
        :key="credit.credit_id || credit.id"
      >
        <!-- <router-link class="no-link" :to="`/details/${credit.media_type || 'person'}/${credit.id}`"> -->
        <router-link
          class="no-link"
          :to="{ name: 'details', params: { type: credit.media_type || 'person', id: credit.id } }"
        >
          <div class="card">
            <img :alt="credit.name" class="card-img-top" :src="imgSrc(credit)" />
            <div class="pl-1 py-3">
              <div class="text-sm">
                <strong>{{credit.name || credit.title}}</strong>
              </div>
              <div class="text-xs">{{credit.character || credit.job}}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import Person from '../img/person_placeholder.png';
import MediaTall from '../img/media_placeholder_tall.png';

@Component({
  props: {
    cast: {
      type: Array
    },
    type: {
      type: String
    },
    handler: {
      type: Function
    }
  }
})
export default class CastSlider extends Vue {
  public cast;
  public slide = 1;
  public maxSlide = Math.ceil(this.cast.length / 4);
  get displayPrev() {
    return this.slide === 1 ? 'd-none' : '';
  }
  get displayNext() {
    return this.slide >= this.maxSlide ? 'd-none' : '';
  }

  public changeSlide(e) {
    if (e.target.id === 'next') this.slide = this.slide + 1;
    else this.slide = this.slide - 1;
  }

  public imgSrc(credit) {
    const src =
      credit.profile_path || credit.poster_path
        ? `https://image.tmdb.org/t/p/original/${credit.profile_path ||
            credit.poster_path}`
        : this.$props.type === 'person'
        ? MediaTall
        : Person;
    return src;
  }
}
</script>

<style lang="scss">
</style>