<template>
  <div class="Details pb-5 position-relative">
    <template v-if="!isLoaded">
      <Loader />
    </template>
    <template v-else>
      <div class="container pt-3">
        <!-- Messages  -->
        <template v-if="message">
          <div class="row">
            <div class="col">
              <div :class="`alert alert-${messageType} mb-3`" role="alert">{{message}}</div>
            </div>
          </div>
        </template>

        <!-- Header  -->
        <Header
          v-if="isLoaded"
          :details="details"
          :type="type"
          :id="id"
          :addFavorite="addFavorite"
        />

        <!-- Details  -->
        <div class="row">
          <!-- Slider and Carousel  -->
          <div class="col-12 col-lg-9 pt-3 text-left">
            <div v-if="details.belongs_to_collection" class="row mb-3">
              <div class="col-12">
                <div class="h4">
                  <strong>Collection</strong>
                </div>
                <EpisodeReel
                  :data="details.belongs_to_collection"
                  :type="type"
                  :id="details.belongs_to_collection.id"
                />
              </div>
            </div>
            <div v-if="type === 'tv'" class="row mb-3">
              <div class="col-12">
                <div class="h4">
                  <strong>Episode Guide</strong>
                </div>
                <EpisodeReel
                  :data="details.seasons.length >= 2
                          ? details.seasons.sort((a, b) => a.season_number - b.season_number)
                          : details.seasons"
                  :type="type"
                  :id="id"
                />
              </div>
            </div>
            <template v-if="type !== 'person'">
              <div>
                <div class="h4">
                  <strong>Cast</strong>
                </div>
                <CastSlider
                  v-if="details.credits"
                  :handler="changeMedia"
                  :cast="details.credits.cast.sort((a, b) => a.order - b.order)"
                  :type="type"
                />
              </div>
            </template>
            <template v-else>
              <div>
                <div class="h4">
                  <strong>Credits</strong>
                </div>
                <template v-if="details.known_for_department === 'Acting'">
                  <CastSlider
                    v-if="details.combined_credits"
                    :cast="details.combined_credits.cast.sort((a, b) => b.vote_count - a.vote_count)"
                    :handler="changeMedia"
                    :type="type"
                  />
                </template>
                <template v-else>
                  <CastSlider
                    v-if="details.combined_credits"
                    :cast="details.combined_credits.crew.slice(0, 30).sort((a, b) => b.vote_count - a.vote_count)"
                    :handler="changeMedia"
                    :type="type"
                  />
                </template>
              </div>
            </template>

            <div v-if="type !== 'person'" class="row mt-3">
              <div class="col-12 col-md-6 my-2">
                <div class="h4">
                  <strong>Others Liked</strong>
                </div>
                <div class="row bg-light-grey border-round" id="section-recs">
                  <div class="col-12 p-2">
                    <template
                      v-if="details.recommendations && details.recommendations.results.length >= 1"
                    >
                      <Carousel
                        :data="details.recommendations.results"
                        :type="type"
                        :handler="changeMedia"
                      />
                    </template>
                    <template v-else>
                      <div class="h6 pl-2">
                        <strong>No recommendations!</strong>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 my-2">
                <div class="h4">
                  <strong>Similar</strong>
                </div>
                <div class="row bg-light-grey border-round" id="section-similar">
                  <div class="col-12 p-2">
                    <template v-if="details.similar && details.similar.results.length >= 1">
                      <Carousel
                        :data="details.similar.results"
                        :type="type"
                        :handler="changeMedia"
                      />
                    </template>
                    <template v-else>
                      <div class="h6 pl-2">
                        <strong>Nothing listed as similar!</strong>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Crew and Facts  -->
          <div class="col-12 col-lg-3 pt-3 text-left side-col-lg">
            <div v-if="type !== 'person'" class="h4">
              <strong>Crew</strong>
            </div>
            <div
              v-if="type === 'movie' && details.credits"
              class="row no-gutters bg-light-grey border-round py-2"
            >
              <div
                v-for="person in details.credits.crew.slice(3, 10)"
                class="col-3 col-lg-12 pl-2 py-1 mr-0"
                :key="person.credit_id"
              >
                <div class="text-sm">
                  <strong>{{person.name}}</strong>
                </div>
                <div class="text-xs">{{person.job}}</div>
              </div>
              <div v-if="details.credits.crew.length <= 3">
                <div class="col-12 px-3 py-2">
                  <div class="h6">
                    <strong>Crew unavailable.</strong>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="type === 'tv'" class="row no-gutters bg-light-grey border-round py-2">
              <div
                v-for="person in details.credits.crew.slice(0, 8)"
                class="col-3 col-lg-12 pl-2 py-1 mr-0"
                :key="person.credit_id"
              >
                <div class="text-sm">
                  <strong>{person.name}</strong>
                </div>
                <div class="text-xs">{person.job}</div>
              </div>
              <div v-if="details.credits.crew.length === 0">
                <div class="col-12 px-3 py-2">
                  <div class="h6">
                    <strong>Crew unavailable.</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="h4 mt-2">
              <strong>Facts</strong>
            </div>
            <div v-if="type === 'movie'" class="row no-gutters bg-light-grey border-round py-2">
              <div v-if="details.homepage" class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Homepage</strong>
                </div>
                <div class="overflow-wrap text-xs">
                  <a :href="details.homepage" class="no-link">{{details.homepage}}</a>
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Status</strong>
                </div>
                <div class="text-xs">{{details.status}}</div>
              </div>
              <div
                v-if="details.revenue && details.revenue !== 0"
                class="col-6 col-md-4 col-lg-12 px-2 py-1"
              >
                <div class="text-sm">
                  <strong>Revenue</strong>
                </div>
                <div
                  class="text-xs"
                >${{details.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
              </div>
              <div
                v-if="details.budget && details.budget !== 0"
                class="col-6 col-md-4 col-lg-12 px-2 py-1"
              >
                <div class="text-sm">
                  <strong>Budget</strong>
                </div>
                <div
                  class="text-xs"
                >${{details.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
              </div>
              <div
                v-if="details.spoken_languages && details.spoken_languages[0]"
                class="col-6 col-md-4 col-lg-12 px-2 py-1"
              >
                <div class="text-sm">
                  <strong>Available Languages</strong>
                </div>
                <span
                  v-for="(lang, index) in details.spoken_languages"
                  :key="`${lang.iso_639_1}-${index}`"
                  class="text-xs"
                >{{lang.name}}{{index === details.spoken_languages.length - 1 ? "" : ", "}}</span>
              </div>
              <div v-if="details.original_language" class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Original Language</strong>
                </div>
                <div class="text-xs">{{details.original_language}}</div>
              </div>
              <div
                v-if="details.product_countries && details.production_countries[0]"
                class="col-6 col-md-4 col-lg-12 px-2 py-1"
              >
                <div class="text-sm">
                  <strong>Production Countries</strong>
                </div>
                <span
                  v-for="(country, index) in details.production_countries"
                  :key="`${country.iso_639_1}-${index}`"
                  class="text-xs"
                >{{country.name}}{{index === details.production_countries.length - 1 ? "" : ", "}}</span>
              </div>
              <div
                v-if="details.product_companies && details.production_companies[0]"
                class="col-6 col-md-4 col-lg-12 px-2 py-1"
              >
                <div class="text-sm">
                  <strong>Production Companies</strong>
                </div>
                <span
                  v-for="(company, index) in details.production_companies"
                  :key="company.id"
                  class="text-xs"
                >{{company.name}}{{index === details.production_companies.length - 1 ? "" : ", "}}</span>
              </div>
              <div
                v-if="details.keywords && details.keywords.keywords[0]"
                class="col-6 col-md-4 col-lg-12 px-2 py-1"
              >
                <div class="text-sm">
                  <strong>Keywords</strong>
                </div>
                <span
                  v-for="(keyword, index) in details.keywords.keywords"
                  :key="keyword.id"
                  class="text-xs"
                >{{keyword.name}}{{index === details.keywords.keywords.length - 1 ? "" : ", "}}</span>
              </div>
            </div>
            <div v-if="type === 'tv'" class="row no-gutters bg-light-grey border-round py-2">
              <div v-if="details.homepage" class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Homepage</strong>
                </div>
                <div class="overflow-wrap text-xs">
                  <a :href="details.homepage" class="no-link">{{details.homepage}}</a>
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Type</strong>
                </div>
                <div class="text-xs">{{details.type}}</div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Status</strong>
                </div>
                <div class="text-xs">{{details.status}}</div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>In Production</strong>
                </div>
                <div class="text-xs">{{details.in_production ? "Yes" : "No"}}</div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Number of Seasons</strong>
                </div>
                <div class="text-xs">{{details.number_of_seasons}}</div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Number of Episodes</strong>
                </div>
                <div class="text-xs">{{details.number_of_episodes}}</div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>First Aired</strong>
                </div>
                <div class="text-xs">{{moment(details.first_air_date).format("MMMM Do, YYYY")}}</div>
              </div>
              <div v-if="details.next_episode_to_air" class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Next Episode to Air</strong>
                </div>
                <div class="text-xs">{{details.next_episode_to_air.name}}</div>
                <div
                  class="text-xs"
                >{{moment(details.next_episode_to_air.air_date).format("MMMM Do, YYYY")}}</div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Last Episode to Air</strong>
                </div>
                <div class="text-xs">{{details.last_episode_to_air.name}}</div>
                <div
                  class="text-xs"
                >{{moment(details.last_episode_to_air.air_date).format("MMMM Do, YYYY")}}</div>
              </div>
              <div v-if="details.netwokrs" class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Networks</strong>
                </div>
                <div
                  v-for="network in details.networks"
                  class="text-xs"
                  :key="network.id"
                >{{network.name}}</div>
              </div>
              <div v-if="details.languages" class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Available Languages</strong>
                </div>
                <div
                  v-for="language in details.languages"
                  class="text-xs"
                  :key="language"
                >{{language}}</div>
              </div>
              <div
                v-if="details.languages[0] !== details.original_language"
                class="col-6 col-md-4 col-lg-12 px-2 py-1"
              >
                <div class="text-sm">
                  <strong>Original Language</strong>
                </div>
                <div class="text-xs">{{details.original_language}}</div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Country of Origin</strong>
                </div>
                <div class="text-xs">{{details.origin_country}}</div>
              </div>
              <div
                v-if="details.keywords && details.keywords.results[0]"
                class="col-6 col-md-4 col-lg-12 px-2 py-1"
              >
                <div class="text-sm">
                  <strong>Keywords</strong>
                </div>
                <span
                  v-for="(keyword, index) in details.keywords.results"
                  :key="keyword.id"
                  class="text-xs"
                >{{keyword.name}}{{index === details.keywords.results.length - 1 ? "" : ", "}}</span>
              </div>
            </div>
            <div v-if="type === 'person'" class="row no-gutters bg-light-grey border-round py-2">
              <div v-if="details.homepage" class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Homepage</strong>
                </div>
                <div class="overflow-wrap text-xs">
                  <a :href="details.homepage" class="no-link">{{details.homepage}}</a>
                </div>
              </div>
              <div class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Birthday</strong>
                </div>
                <div
                  v-if="details.birthday"
                  class="text-xs"
                >{{moment(details.birthday).format("MMMM Do, YYYY")}}</div>
                <div v-else class="text-xs">Unavailable</div>
              </div>
              <div v-if="details.deathday" class="col-6 col-md-4 col-lg-12 px-2 py-1">
                <div class="text-sm">
                  <strong>Died</strong>
                </div>
                <div class="text-xs">{{moment(details.deathday).format("MMMM Do, YYYY")}}</div>
              </div>
              <div
                v-if="details.also_known_as && details.also_known_as[0]"
                class="col-6 col-md-4 col-lg-12 px-2 py-1"
              >
                <div class="text-sm">
                  <strong>Also known as</strong>
                </div>
                <span
                  v-for="(name, index) in details.also_known_as"
                  :key="name"
                  class="text-xs"
                >{{name}}{{index === details.also_known_as.length - 1 ? "" : ", "}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments  -->
        <div class="row">
          <div class="col-12 col-lg-9 my-2 text-left px-0">
            <div class="h4">
              <strong>Add a Comment</strong>
            </div>
            <div class="row no-gutters bg-light-grey border-round my-3">
              <div v-if="1" class="col-12 p-3">
                <form :onSubmit="handleSubmit">
                  <div class="form-group mb-3">
                    <textarea
                      class="form-control"
                      id="comment"
                      name="comment"
                      placeholder="Post a comment"
                      :value="comment"
                      :onChange="this.handleChange"
                      :rows="4"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <button class="btn btn-outline-dark float-right" type="submit">Post</button>
                  </div>
                </form>
              </div>
              <div v-else class="col-12 p-3">
                <div class="h5 text-center">Log in to comment!</div>
              </div>
            </div>

            <div class="h4">
              <strong>Comments</strong>
            </div>
            <div class="row no-gutters bg-light-grey border-round py-2">
              <template v-if="comments && comments[0]">
                <div v-for="comment in comments" class="col-12 p-2" :key="comment.id">
                  <div class="card bg-purple text-white text-left">
                    <div class="card-header">
                      {{comment.userName}}
                      <div class="float-right">
                        <button
                          class="btn btn-outline-info mx-2"
                          :onClick="editComment"
                          :value="comment.id"
                        >Edit</button>
                        <button
                          class="btn btn-outline-danger mx-2"
                          :onClick="deleteComment"
                          :value="comment.id"
                        >Delete</button>
                      </div>
                    </div>
                    <div class="card-body">
                      <div v-if="comment.id && isEditing === comment.id.toString()">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            :placeholder="comment.body"
                            :onChange="handleChange"
                            :name="edit"
                            :value="edit"
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-outline-info"
                              type="button"
                              id="button-addon2"
                              :onClick="submitEdit"
                            >Submit</button>
                          </div>
                        </div>
                      </div>
                      <p v-else>{{comment.body}}</p>
                      <blockquote class="blockquote mb-0">
                        <footer
                          class="blockquote-footer"
                        >Created: {{moment(comment.createdAt).format("MM/DD/YYYY -- hh:mm a")}}</footer>
                        <div
                          v-if="(comment.createdAt !== comment.updatedAt)"
                          class="blockquote-footer"
                        >Updated: {{moment(comment.updatedAt).format("MM/DD/YYYY -- hh:mm a")}}</div>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else class="col-12 p-2">
                <div class="h5 text-center">No comments yet!</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-3 my-2 side-col-lg">
            <div class="h4 text-left">
              <strong>Reviews</strong>
            </div>
            <div class="row no-gutters bg-light-grey border-round py-2">
              <template
                v-if="details.reviews && (details.reviews.results && details.reviews.results[0])"
              >
                <div v-for="review in details.reviews.results" class="col-12 p-2" :key="review.id">
                  <div class="card bg-dark text-white text-left">
                    <div class="card-header">{{review.author}}</div>
                    <div class="card-body">
                      <p>
                        {{review.content.length > 255
                        ? `${review.content.slice(0, 255)}...`
                        : review.content}}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else class="col-12 p-2">
                <div class="h5">No reviews yet!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';

import API from '../API';
import CastSlider from '@/components/CastSlider.vue';
import Carousel from '@/components/Carousel.vue';
import EpisodeReel from '@/components/EpisodeReel.vue';
import Loader from '@/components/Loader.vue';
import Header from '@/components/Header.vue';

@Component({
  name: 'Details',
  components: {
    CastSlider,
    Carousel,
    EpisodeReel,
    Loader,
    Header
  }
})
export default class Details extends Vue {
  public isLoaded = false;
  public error = '';
  public isEditing = '';
  public edit = '';
  public message = '';
  public messageType = '';
  public comment = '';
  public comments = [];
  public details = {};
  public timer = null;
  public type = '';
  public id = '';

  public mounted() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;

    this.getDetails(this.type, this.id);
  }

  public moment() {
    return moment();
  }

  public getDetails(type, id) {
    console.log(`Getting ${type} ${id}`);
    API.TMDB.details(type, id)
      .then(pageDetails => {
        if (pageDetails.data.name === 'Error') return this.getDetails(type, id);
        API.Comments.getComments(type, id)
          .then(pageComments => {
            this.details = pageDetails.data;
            this.comments = pageComments.data;
            this.message = '';
            this.messageType = '';
            this.isLoaded = true;
          })
          .catch(err => {
            console.log(err);
            this.message = `Page Comments error: ${err}`;
            this.messageType = 'danger';
          });
      })
      .catch(err => {
        console.log(err);
        this.message = `TMDB Details error: ${err}`;
        this.messageType = 'danger';
      });
  }

  public addFavorite(type, id, title) {
    API.Favorites.add(type, id, title, 1, 2)
      .then(res => {
        if (res.data.errors) {
          this.message =
            res.data.errors[0].type === 'unique violation'
              ? 'This item is already on your favorites!'
              : 'Unknown error';
          this.messageType = 'danger';
        } else {
          this.message = `${res.data.title} added to favorites!`;
          this.messageType = 'success';
        }
      })
      .catch(err => {
        console.log(err);
        this.message = `Add Fave error: ${err}`;
        this.messageType = 'danger';
      });
  }

  public handleChange(e) {
    this[e.target.name] = e.target.value;
  }

  public handleSubmit(e) {
    e.preventDefault();
    const comment = this.comment;
    const { type, id } = this.$route.params;

    const newComment = {
      mediaType: type,
      tmdbId: id,
      body: comment,
      replyTo: 0
    };

    API.Comments.add(newComment, 1)
      .then(res => {
        API.Comments.getComments(type, id)
          .then(res => {
            this.comments = res.data;
            this.comment = '';
          })
          .catch(err => {
            console.log(err);
            this.message = `Page Comments error: ${err}`;
            this.messageType = 'danger';
          });
      })
      .catch(err => {
        console.log(err);
        this.message = `New Comment error: ${err}`;
        this.messageType = 'danger';
      });
  }

  public changeMedia = (type, id) => {
    this.message = '';
    this.messageType = '';
    this.getDetails(type, id);
  }

  public deleteComment(e) {
    const { type, id } = this.$route.params;

    API.Comments.delete(e.target.value, 1)
      .then(res => {
        API.Comments.getComments(type, id)
          .then(res => res.data)
          .then(comments => (this.comments = comments))
          .catch(err => {
            console.log(err);
            this.message = `Page Comments error: ${err}`;
            this.messageType = 'danger';
          });
      })
      .catch(err => {
        console.log(err);
        this.message = `Delete Comment error: ${err}`;
        this.messageType = 'danger';
      });
  }

  // This should just toggle
  public editComment(e) {
    if (this.isEditing === '') this.isEditing = e.target.value;
    else this.isEditing = '';
  }

  public submitEdit(e) {
    const { isEditing, edit } = this;
    const { type, id } = this.$route.params;

    if (isEditing) {
      API.Comments.edit(isEditing, edit, 1)
        .then(res => {
          API.Comments.getComments(type, id)
            .then(res => res.data)
            .then(comments => (this.comments = comments))
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
          this.message = `Edit Comment error: ${err}`;
          this.messageType = 'danger';
        });
    }
  }

  @Watch('$route')
  public watchRoute(newVal, oldVal) {
    if (newVal.params !== oldVal.params) {
      console.log('new val');
      console.log(newVal);
      console.log('old val');
      console.log(oldVal);
      this.isLoaded = false;
      this.getDetails(newVal.params.type, newVal.params.id);
    }
  }
}
</script>

<style lang="scss">
/* Collections, credits, genres, outisde links */

#data-container {
  min-height: 400px;
}

.align-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.Details {
  min-height: calc(100vh - 70px);
}

#details-body {
  border-radius: 10px;
}
#details-header {
  background-color: black;
  color: white;
  border-radius: 10px;
}

.bg-light-grey {
  /* background-color: rgb(170, 170, 170); */
  /* background-color: #f2ebe8; */
  background-color: #a2ccbb;
}

#cast-container {
  border-radius: 10px;
  min-height: 295px;
}
.no-link,
.no-link:hover,
.no-link:active,
.no-link:focus {
  text-decoration: none;
  color: inherit;
}
.border-round {
  border-radius: 10px;
}
.text-sm {
  font-size: 0.85rem;
}
.text-xs {
  font-size: 0.75rem;
}
.cast-img {
  min-height: 200px;
}
#backdrop-row {
  position: relative;
  z-index: -10;
}

.side-col-lg {
  padding: 0 0 1rem 1rem;
}

#section-recs {
  margin-right: 0.25rem;
}

#section-similar {
  margin-left: 0.25rem;
}

@media only screen and (max-width: 991px) {
  .side-col-lg {
    padding: 0;
  }
}

@media only screen and (max-width: 767px) {
  #backdrop-row {
    margin-bottom: -25%;
  }
  #section-recs,
  #section-similar {
    margin: 0 -10px;
  }
  .Details {
    margin: 0 10px;
  }
  #data-container {
    min-height: 750px;
  }
  #cast-container {
    min-height: 500px;
  }
}
</style>