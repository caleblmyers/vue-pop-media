<template>
  <div class="Carousel">
    <div class="mx-auto div-featured">
      <img id="img-featured" class="img-fluid" alt="Image" :src="imgSrc" />
      <template v-if="type === 'episodes'">
        <div id="caption">
          <strong>Title</strong>
        </div>
      </template>
      <template v-else-if="data[0]">
        <router-link
          :to="`/details/${mediaType}/${data[slide].id}`"
          @click="() => handler(mediaType, data[slide].id)"
        >
          <div id="caption">
            <strong>{{data[slide].title || data[slide].name}}</strong>
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
        :class="`dot ${index === slide ? 'activeDot' : 'inactiveDot'}`"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Media from "@/img/media_placeholder.png";

@Component({
  name: "Carousel",
  props: ["data", "type"]
})
export default class Carousel extends Vue {
  slide = 0;
  data;
  type;

  get mediaType() {
    let mediaType;
    if (this.type === "movie" || this.type === "topMovie") mediaType = "movie";
    else if (this.type === "show" || this.type === "topShow") mediaType = "tv";
    else mediaType = this.type;
    return mediaType;
  }

  get imgSrc() {
    let src = this.data[this.slide].backdrop_path
      ? `https://image.tmdb.org/t/p/original/${this.data[this.slide].backdrop_path}`
      : this.type === "episodes" && this.data[this.slide].still_path
      ? `https://image.tmdb.org/t/p/original/${this.data[this.slide].still_path}`
      : Media;
    return src;
  }

  changeSlide = e => {
    console.log(this.slide, this.data.length);
    e.target.id === "next" ? this.slide++ : this.slide--;
    if (this.slide >= this.data.length) this.slide = 0;
    else if (this.slide <= -1) this.slide = this.data.length - 1;
  };

  goToSlide = (type, e) => (this.slide = e.target.id.slice(type.length));
}
</script>

<style scoped>
.div-featured {
  /* width: 40vw; */
  /* max-width: 720px; */
  position: relative;
}

#img-featured {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
  min-height: 200px;
}

#prev,
#next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  z-index: 10;
}
#prev {
  left: 5px;
  border-radius: 3px 0 0 3px;
}
#next {
  right: 5px;
  border-radius: 3px 0 0 3px;
}
#prev:hover,
#next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
#dot-container {
  /* position: absolute; */
  /* bottom: 0; */
  text-align: center;
}
#caption {
  background: black;
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}
.dot {
  cursor: pointer;
  height: 0.7rem;
  width: 0.7rem;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}
.activeDot,
.dot:hover {
  background-color: #717171;
}
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}
@-webkit-keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>