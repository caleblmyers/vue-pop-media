<template>
  <footer class="Footer nav-bg">
    <div class="container text-white" id="footer-row">
      <div class="row h-100">
        <div class="col-8 col-md-4 h-100 ml-auto">
          &copy; 2019 Caleb Myers
          <a class="pl-3" href="https://github.com/caleblmyers">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/caleb-myers/">
            <i class="pl-3 fab fa-linkedin"></i>
          </a>
        </div>
        <div class="col-4 h-100 mr-auto">
          <img class="img-fluid" id="tmdb-logo" :src="logo" alt="TMDB" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import tmdbPng from '@/img/tmdb.png';

@Component
export default class Footer extends Vue {
  public logo = tmdbPng;
}
</script>

<style scoped lang="scss">
.Footer {
  margin-top: 10%;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  line-height: 60px;
  color: #f5f5f5;
}

#tmdb-logo {
  height: 40px;
}

#footer-row {
  height: 100%;
}
i {
  color: #f5f5f5;
}
</style>