<template>
  <div class="row bg-light-grey" id="details-body">
    <div class="col-12 col-md-8 py-3 position-relative">
      <div class="p-3" id="details-header">
        <div class="row no-gutters">
          <div class="col">
            <div class="h3">{{details.title || details.name}}</div>
          </div>
        </div>
        <div v-if="details.tagline" class="row no-gutters">
          <div class="col">
            <div class="h6">{{details.tagline}}</div>
          </div>
        </div>
        <template v-if="type === 'person'">
          <div class="row no-gutters">
            <div class="col">Birthplace: {{details.place_of_birth}}</div>
            <div class="col">
              Birthday:
              {{moment((
              details.birthday
              ), "YYYY-MM-DD").format(" MMMM Do, YYYY")}}
            </div>
            <div class="col">Known for: {{details.known_for_department}}</div>
          </div>
        </template>

        <template v-else>
          <div class="row no-gutters">
            <div class="col">
              <div class="row no-gutters">
                <div class="col">
                  Released:
                  {{moment((
                  details.release_date || details.first_air_date
                  ), "YYYY-MM-DD").format(" MMMM Do, YYYY")}}
                </div>
              </div>
              <div v-if="details.runtime" class="row no-gutters">
                <div class="col">
                  <div>Runtime: {{`${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`}}</div>
                </div>
              </div>
            </div>

            <div v-if="details.genres[0]" class="col-6">
              <div>Genres:</div>
              <div>
                <span
                  v-for="(genre, index) in details.genres"
                  :key="genre.id"
                >{{genre.name}}{{index === details.genres.length - 1 ? "" : ","}}</span>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="row no-gutters mt-4 mb-3 text-left">
        <div class="col-6 col-md-12">
          <div class="h4">Overview</div>
          <p
            v-if="details.overview"
          >{{details.overview.length > 255 ? `${details.overview.slice(0, 255)}...` : details.overview}}</p>
          <p
            v-if="details.biography"
          >{{details.biography.length > 255 ? `${details.biography.slice(0, 255)}...` : details.biography}}</p>
        </div>
        <div class="col-5 ml-auto d-md-none">
          <img alt="Poster" class="img-fluid rounded" :src="imgSrc" />
        </div>
      </div>
      <div class="row no-gutters text-left">
        <div class="col-6 col-md-12 col-lg-8 mb-3">
          <div v-if="type === 'tv'">
            <div class="h4">Created By</div>
            <div v-if="details.created_by[0]" class="row no-gutters">
              <div
                v-for="person in details.created_by.slice(0, 3)"
                class="col-4 col-lg-6 my-1"
                :key="person.credit_id"
              >
                <div>
                  <strong>{{person.name}}</strong>
                </div>
                <div>{{person.job}}</div>
              </div>
            </div>
            <div v-else class="col-4 col-lg-6 my-1">
              <div>
                <strong>Unavailable</strong>
              </div>
            </div>
          </div>
          <div v-if="type === 'movie'">
            <div class="h4">Featured Crew</div>
            <div v-if="details.credits.crew[0]" class="row no-gutters">
              <div
                v-for="crew in details.credits.crew.slice(0, 3)"
                class="col-4 col-lg-6 my-1"
                :key="crew.credit_id"
              >
                <div>
                  <strong>{{crew.name}}</strong>
                </div>
                <div>{{crew.job}}</div>
              </div>
            </div>
            <div v-else class="col-4 col-lg-6 my-1">
              <div>
                <strong>Unavailable</strong>
              </div>
            </div>
          </div>
          <div v-if="type === 'person'">
            <div class="h4">Featured Roles</div>
            <div class="row no-gutters">
              <template v-if="details.combined_credits">
                <div
                  v-for="credit in details.combined_credits.crew.slice(0, 3)"
                  class="col"
                  :key="credit.credit_id || credit.id"
                >
                  <div>
                    <strong>{{credit.title || credit.name}}</strong>
                  </div>
                  <div>{{credit.job}}</div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="col col-lg-4 mx-auto text-center d-md-none d-lg-block">
          <div v-if="details.vote_average >= 0">
            <div class="h4">
              Rating
              <span class="text-sm">({{details.vote_count}} votes)</span>
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
                      strokeDashoffset: dashArray - dashArray * details.vote_average / 10
                    }"
              />
              <text
                class="circle-text"
                x="50%"
                y="50%"
                dy=".3em"
                text-anchor="middle"
              >{{`${details.vote_average * 10}%`}}</text>
            </svg>
          </div>
          <div class="d-none d-lg-block">
            <button
              class="btn btn-outline-dark mt-3"
              @click="() => addFavorite(
                  type,
                  id,
                  (details.title || details.name),
                  user.id,
                )"
            >Add Favorite</button>
          </div>
        </div>
        <div class="col-6 my-auto text-center d-md-none">
          <div>
            <button
              class="btn btn-outline-dark mt-3"
              @click="() => addFavorite(
                  type,
                  id,
                  (details.title || details.name),
                  user.id,
                )"
            >Add Favorite</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4 py-3 d-none d-md-block">
      <div class="row no-gutters">
        <div class="col-12">
          <img alt="Poster" class="img-fluid rounded" :src="imgSrc" />
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-12 mx-auto mt-4 text-center d-lg-none">
          <div v-if="details.vote_average >= 0">
            <div class="h4">
              Rating
              <span class="text-sm">({{details.vote_count}} votes)</span>
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
                      strokeDashoffset: dashArray - dashArray * details.vote_average / 10
                    }"
              />
              <text
                class="circle-text"
                x="50%"
                y="50%"
                dy=".3em"
                text-anchor="middle"
              >{{`${details.vote_average * 10}%`}}</text>
            </svg>
          </div>
          <div>
            <button
              class="btn btn-outline-dark mt-3"
              @click="() => props.addFavorite(
                  type,
                  id,
                  (details.title || details.name),
                  user.id,
                )"
            >Favorite</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';

import Person from '@/img/person_placeholder.png';
import MediaTall from '@/img/media_placeholder_tall.png';

@Component({
  props: ['details', 'type', 'id', 'user', 'addFavorite']
})
export default class Header extends Vue {
  public sqSize = 80;
  public strokeWidth = 4;
  public radius = (this.sqSize - this.strokeWidth) / 2;
  public viewBox = `0 0 ${this.sqSize} ${this.sqSize}`;
  public dashArray = this.radius * Math.PI * 2;

  public moment() {
    return moment();
  }

  get imgSrc() {
    const src =
      this.$props.details.poster_path || this.$props.details.profile_path
        ? `https://image.tmdb.org/t/p/original/${this.$props.details
            .poster_path || this.$props.details.profile_path}`
        : this.$props.type === 'person'
        ? Person
        : MediaTall;
    return src;
  }
}
</script>

<style lang="scss" scoped>
</style>