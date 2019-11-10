<template>
  <div class="Carousel">
    <div class="mx-auto div-featured">
      <img
        v-if="data[0]"
        id="img-featured"
        class="img-fluid"
        :alt="data[index].title || data[index].name"
        :src="imgSrc"
      />
      <template v-if="type === 'episodes'">
        <div id="caption">
          <strong>{data[index].title || data[index].name}</strong>
        </div>
      </template>
      <template v-else-if="data[0]">
        <router-link
          :to="`/details/${mediaType}/${data[index].id}`"
          @click="() => handler(mediaType, data[index].id)"
        >
          <div id="caption">
            <strong>{data[index].title || data[index].name}</strong>
          </div>
        </router-link>
      </template>
      <button @click="event => changeSlide(event)" class="btn" id="prev">&#10094;</button>
      <button @click="event => changeSlide(event)" class="btn" id="next">&#10095;</button>
    </div>
    <div class="mx-auto" id="dot-container">
      <span
        v-for="(dot, index) in data"
        :key="index"
        :id="`${type}${index}`"
        @click="event => goToSlide(type, event)"
        :class="`dot ${index === this.state.index ? 'activeDot' : 'inactiveDot'}`"
      >{{ dot }}</span>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import Media from "@/img/media_placeholder.png";

@Component({
  name: "Carousel",
  props: ["data", "type"]
})
export default class Carousel extends Vue {
  index = 0;

  get mediaType() {
    let mediaType;
    if (this.type === "movie" || this.type === "topMovie") mediaType = "movie";
    else if (this.type === "show" || this.type === "topShow") mediaType = "tv";
    else mediaType = this.type;
    return mediaType;
  }

  get imgSrc() {
    let src = this.data[this.index].backdrop_path
      ? `https://image.tmdb.org/t/p/original/${data[index].backdrop_path}`
      : type === "episodes" && data[index].still_path
      ? `https://image.tmdb.org/t/p/original/${data[index].still_path}`
      : Media;
  }

  // beforeUpdate() {
  //   const { data } = this.props;
  //   if (data !== this.state.data)
  //     this.setState({
  //       index: 0,
  //       data
  //     });
  // }

  changeSlide = e => {
    let index = this.index;
    e.target.id === "next" ? index++ : index--;
    if (index >= this.data.length) index = 0;
    else if (index <= -1) index = this.data.length - 1;
    this.index = index;
  };

  goToSlide = (type, e) => (this.index = e.target.id.slice(type.length));
}
</script>

<style scoped>
</style>