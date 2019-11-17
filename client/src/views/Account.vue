<template>
  <div>
    <template v-if="isLoading">
      <Loader />
    </template>
    <div class="container pt-5">
      <div class="row mb-2">
        <div class="col-12">
          <div>
            <!-- <Gravatar class="rounded-circle" email={user.username} size={100} /> -->
            <h1>Hi there, {{user.username}}</h1>
          </div>
        </div>
      </div>
      <template v-if="message">
        <div class="row">
          <div class="col">
            <div class="alert mb-3" :class="`alert-${messageType}`" role="alert">{{message}}</div>
          </div>
        </div>
      </template>
      <div class="row mb-3">
        <div class="col-12 col-md-6 my-auto">
          <h5>Created: {{moment(user.createdAt).format("MMMM Do, YYYY")}}</h5>
          <h5>Updated: {{moment(user.updatedAt).format("MMMM Do, YYYY")}}</h5>
          <h6>Number of Favorites: {{favorites.length}}</h6>
          <h6>Number of Comments: {{comments.length}}</h6>
        </div>

        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12 mt-3">
              <h4>Settings</h4>
              <template v-if="isEditing">
                <div class="col-12">
                  <form @submit="submitInfo">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        @change="handleChange"
                        :name="isEditing"
                        :value="[isEditing]"
                        class="form-control"
                        :placeholder="isEditing === 'password' ? editStart.replace(/./g, '*') : editStart"
                      />
                      <div class="input-group-append">
                        <button
                          type="submit"
                          id="button-addon2"
                          class="btn btn-outline-secondary"
                        >Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </template>
              <div class="row my-3">
                <div class="col-12">
                  <button
                    class="btn btn-success"
                    @click="changeInfo"
                    name="username"
                  >Change Username</button>
                </div>
              </div>
              <div class="row my-3">
                <div class="col-12">
                  <button class="btn btn-info" @click="changeInfo" name="password">Change Password</button>
                </div>
              </div>
              <div class="row my-3">
                <div class="col-12">
                  <button class="btn btn-danger" @click="deleteAccount">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h2 mt-2">Favorites</div>
      <template v-if="movies[0]">
        <h4 class="text-left my-2">Movies</h4>
        <div class="row">
          <div v-for="movie in movies" class="col-6 col-lg-3" :key="movie.id">
            <div class="card border-secondary rounded bg-light-grey mb-3">
              <div class="card-body">
                <h6 class="card-title">{{movie.title}}</h6>
                <p class="mb-0">Added:</p>
                <p>{{moment(movie.createdAt).format("MM/DD/YYYY -- hh:mm a")}}</p>
                <router-link :to="`/details/${movie.mediaType}/${movie.tmdbId}`">
                  <button class="btn btn-outline-dark">Details</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="shows[0]">
        <h4 class="text-left my-2">Shows</h4>
        <div class="row">
          <div v-for="show in shows" class="col-6 col-lg-3" :key="show.id">
            <div class="card border-secondary rounded bg-light-grey mb-3">
              <div class="card-body">
                <h6 class="card-title">{{show.title}}</h6>
                <p class="mb-0">Added:</p>
                <p>{{moment(show.createdAt).format("MM/DD/YYYY -- hh:mm a")}}</p>
                <router-link :to="`/details/${show.mediaType}/${show.tmdbId}`">
                  <button class="btn btn-outline-dark">Details</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="people[0]">
        <h4 class="text-left my-2">People</h4>
        <div class="row">
          <div v-for="person in people" class="col-6 col-lg-3" :key="person.id">
            <div class="card border-secondary rounded bg-light-grey mb-3">
              <div class="card-body">
                <h6 class="card-title">{{person.title}}</h6>
                <p class="mb-0">Added:</p>
                <p>{{moment(person.createdAt).format("MM/DD/YYYY -- hh:mm a")}}</p>
                <router-link :to="`/details/${person.mediaType}/${person.tmdbId}`">
                  <button class="btn btn-outline-dark">Details</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="comments[0]">
        <h4 class="text-left my-2">Comments</h4>
        <div class="row">
          <div v-for="comment in comments" class="col-6 col-lg-3" :key="comment.id">
            <div class="card border-secondary rounded bg-light-grey mb-3">
              <div class="card-body">
                <h6 class="card-title">{{comment.body}}</h6>
                <p class="mb-0">Added:</p>
                <p>{{moment(comment.createdAt).format("MM/DD/YYYY -- hh:mm a")}}</p>
                <div v-if="comment.createdAt !== comment.updatedAt">
                  <p class="mb-0">Updated:</p>
                  <p>{{moment(comment.updatedAt).format("MM/DD/YYYY -- hh:mm a")}}</p>
                </div>
                <router-link :to="`/details/${comment.mediaType}/${comment.tmdbId}`">
                  <button class="btn btn-outline-dark">Go to Page</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';

import API from '../API';
import Loader from '@/components/Loader.vue';

@Component({
  components: {
    Loader
  },
  props: {
    onUpdate: {
      type: Function
    },
    onLogout: {
      type: Function
    }
  }
})
export default class Account extends Vue {
  public user = {
    id: ''
  };
  public movies = [];
  public shows = [];
  public people = [];
  public favorites = [];
  public comments = [];
  public isLoading = true;
  public isEditing: any = false;
  public editStart = '';
  public editValue = '';
  public username = '';
  public password = '';
  public message = '';
  public messageType = '';

  public moment() {
    return moment();
  }

  public mounted() {
    API.Users.getMe(1)
      .then(res => res.data)
      .then(user => {
        API.Users.getFavorites(user.id, 1)
          .then(res => res.data)
          .then(favorites => {
            API.Comments.userComments(user.id, 1)
              .then(res => res.data)
              .then(comments => {
                console.log(comments);
                console.log(favorites);
                const movies = favorites.filter(
                  fav => fav.mediaType === 'movie'
                );
                const shows = favorites.filter(fav => fav.mediaType === 'tv');
                const people = favorites.filter(
                  fav => fav.mediaType === 'person'
                );
                this.user = user;
                this.movies = movies;
                this.shows = shows;
                this.people = people;
                this.favorites = favorites;
                this.comments = comments;
                this.isLoading = false;
              });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  public handleChange = e => (this[e.target.name] = e.target.value);

  public changeInfo = e => {
    if (this.isEditing) return (this.isEditing = false);

    this.username = '';
    this.password = '';
    this.isEditing = e.target.name;
    this.editStart = this.user[e.target.name];
    this.message = '';
    this.messageType = '';
  }

  public submitInfo = e => {
    e.preventDefault();

    if (this.$data[this.isEditing] === '') {
      this.message = 'Entries cannot be blank.';
      this.messageType = 'danger';
      this.isEditing = false;
    }

    API.Users.update(
      this.isEditing,
      this.$data[this.isEditing],
      this.user.id,
      1
    )
      .then(update => {
        console.log(update);
        if (update.data.errors) {
          this.message = 'Username already taken. Try something else.';
          this.messageType = 'danger';
          this.isEditing = false;
        } else {
          API.Users.getMe(1)
            .then(res => res.data)
            .then(user => {
              console.log(user);
              this.user = user;
              this.isEditing = false;
              this.message = 'Account update successful!';
              this.messageType = 'success';
              this.$props.onUpdate(user);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  public deleteAccount = () => {
    API.Users.delete(this.user.id, 1)
      .then(res => this.$props.onLogout())
      .catch(err => console.log(err));
  }
}
</script>

<style scoped>
</style>