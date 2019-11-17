<template>
  <div class="Discover">
    <div class="jumbotron jumbotron-fluid mb-0">
      <div class="container">
        <div class="display-3">Pop Media</div>
        <div class="lead pt-2">Discover something new!</div>
        <nav class="mt-3">
          <div class="nav nav-pills justify-content-center" id="nav-tab" role="tablist">
            <a
              @click="handleChange"
              name="activeTab"
              value="movie"
              class="nav-item nav-link active"
              id="nav-movie-tab"
              data-toggle="tab"
              href="#nav-movie"
              role="tab"
              aria-controls="nav-movie"
              aria-selected="true"
            >Movies</a>
            <a
              @click="handleChange"
              name="activeTab"
              value="tv"
              class="nav-item nav-link"
              id="nav-tv-tab"
              data-toggle="tab"
              href="#nav-tv"
              role="tab"
              aria-controls="nav-tv"
              aria-selected="false"
            >TV Shows</a>
          </div>
        </nav>
        <div class="my-2">
          <input
            type="checkbox"
            name="advanced"
            :checked="advanced"
            @change="handleChange"
            class="form-check-input"
          />
          <label class="form-check-label">
            <strong>Advanced</strong>
          </label>
        </div>
        <form @submit="handleSubmit">
          <h1 class="mt-4">Query Search</h1>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane show active"
              id="nav-movie"
              role="tabpanel"
              aria-labelledby="nav-movie-tab"
            >
              <div class="form-group">
                <template v-if="!advanced">
                  <div class="form-group">
                    <label>
                      <strong>Choose an option...</strong>
                    </label>
                    <div class="input-group">
                      <select
                        name="query"
                        :value="query"
                        @change="handleChange"
                        class="custom-select"
                      >
                        <option
                          v-for="(query, index) in queries[activeTab]"
                          :key="index"
                        >{{query.name}}</option>
                      </select>
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit">Discover</button>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div class="form-group">
                    <div class="form-row">
                      <div class="form-group col-md-5">
                        <label>Start Date</label>
                        <input
                          type="date"
                          class="form-control param"
                          id="primaryReleaseDateGt"
                          name="primaryReleaseDateGt"
                          :value="params.primaryReleaseDateGt"
                          @change="handleChange"
                          min="1900-01-01"
                          max="2019-10-01"
                        />
                      </div>
                      <div class="form-group col-md-5">
                        <label>End Date</label>
                        <input
                          type="date"
                          class="form-control param"
                          id="primaryReleaseDateLt"
                          name="primaryReleaseDateLt"
                          :value="params.primaryReleaseDateLt"
                          @change="handleChange"
                          min="1900-01-01"
                          max="2019-10-01"
                        />
                      </div>
                      <div class="form-group col-md-2">
                        <label>Release Year</label>
                        <input
                          class="form-control param"
                          type="number"
                          name="releaseYear"
                          :value="params.releaseYear"
                          @change="handleChange"
                          min="1900"
                          max="2019"
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-3">
                        <label>Vote Count (max)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="voteCountLt"
                          name="voteCountLt"
                          :value="params.voteCountLt"
                          @change="handleChange"
                          min="0"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label>Vote Count (min)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="voteCountGt"
                          name="voteCountGt"
                          :value="params.voteCountGt"
                          @change="handleChange"
                          min="0"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label>Vote Average (max)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="voteAverageLt"
                          name="voteAverageLt"
                          :value="params.voteAverageLt"
                          @change="handleChange"
                          min="0"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label>Vote Average (min)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="voteAverageGt"
                          name="voteAverageGt"
                          :value="params.voteAverageGt"
                          @change="handleChange"
                          min="0"
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label>Includes Genre</label>
                        <select
                          type="text"
                          class="form-control param genre"
                          id="genres"
                          name="genres"
                          :value="params.genres"
                          @change="handleChange"
                        >
                          <option value>--</option>
                          <option value="28">Action</option>
                          <option value="12">Adventure</option>
                          <option value="16">Animation</option>
                          <option value="35">Comedy</option>
                          <option value="80">Crime</option>
                          <option value="99">Documentary</option>
                          <option value="18">Drama</option>
                          <option value="10751">Family</option>
                          <option value="14">Fantasy</option>
                          <option value="36">History</option>
                          <option value="27">Horror</option>
                          <option value="10402">Music</option>
                          <option value="9648">Mystery</option>
                          <option value="10749">Romance</option>
                          <option value="878">Science Fiction</option>
                          <option value="10770">TV Movie</option>
                          <option value="53">Thriller</option>
                          <option value="10752">War</option>
                          <option value="37">Western</option>
                        </select>
                      </div>
                      <div class="form-group col-md-4">
                        <label>Excludes Genre</label>
                        <select
                          type="text"
                          class="form-control param genre"
                          id="noGenres"
                          name="noGenres"
                          :value="params.noGenres"
                          @change="handleChange"
                        >
                          <option value>--</option>
                          <option value="28">Action</option>
                          <option value="12">Adventure</option>
                          <option value="16">Animation</option>
                          <option value="35">Comedy</option>
                          <option value="80">Crime</option>
                          <option value="99">Documentary</option>
                          <option value="18">Drama</option>
                          <option value="10751">Family</option>
                          <option value="14">Fantasy</option>
                          <option value="36">History</option>
                          <option value="27">Horror</option>
                          <option value="10402">Music</option>
                          <option value="9648">Mystery</option>
                          <option value="10749">Romance</option>
                          <option value="878">Science Fiction</option>
                          <option value="10770">TV Movie</option>
                          <option value="53">Thriller</option>
                          <option value="10752">War</option>
                          <option value="37">Western</option>
                        </select>
                      </div>
                      <div class="form-group col-md-2">
                        <label>Runtime (max)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="runtimeLt"
                          name="runtimeLt"
                          :value="params.runtimeLt"
                          @change="handleChange"
                          min="0"
                          max="360"
                        />
                      </div>
                      <div class="form-group col-md-2">
                        <label>Runtime (min)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="runtimeGt"
                          name="runtimeGt"
                          :value="params.runtimeGt"
                          @change="handleChange"
                          min="0"
                          max="360"
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label>With People</label>
                        <template v-if="favPeople[0]">
                          <select
                            type="text"
                            class="form-control param"
                            id="people"
                            name="people"
                            :value="params.people"
                            @change="handleChange"
                          >
                            <option value>--</option>
                            <option
                              v-for="person in favPeople"
                              :value="person.tmdbId"
                              :key="person.id"
                            >{{person.title}}</option>
                          </select>
                        </template>

                        <template v-else>
                          <select
                            type="text"
                            class="form-control param"
                            id="people"
                            name="people"
                            :value="params.people"
                            @change="handleChange"
                          >
                            <option>Person</option>
                            <option>Person</option>
                            <option>Person</option>
                            <option>Person</option>
                            <option>Person</option>
                            <option>Person</option>
                          </select>
                        </template>
                      </div>
                      <div class="form-group col-md-2">
                        <label>Rating Country</label>
                        <select
                          type="text"
                          class="form-control param"
                          id="certificationCountry"
                          name="certificationCountry"
                          :value="params.certificationCountry"
                          @change="handleChange"
                        >
                          <option value>Countries</option>
                          <option
                            v-for="country in Object.keys(ratings)"
                            :value="country"
                            :key="country"
                          >{{country}}</option>
                        </select>
                      </div>
                      <div class="form-group col-md-2">
                        <label>Rating</label>
                        <template v-if="params.certificationCountry !== ''">
                          <select
                            type="text"
                            class="form-control param"
                            id="certification"
                            name="certification"
                            :value="params.certification"
                            @change="handleChange"
                          >
                            <option value>--</option>
                            <option
                              v-for="rating in ratings[params.certificationCountry]"
                              :value="rating.certification"
                              :key="rating.order"
                            >{{rating.certification}}</option>
                          </select>
                        </template>

                        <template v-else>
                          <select
                            type="text"
                            class="form-control param"
                            id="certification"
                            name="certification"
                            :value="params.certification"
                            @change="handleChange"
                            disabled
                          >
                            <option>Ratings</option>
                          </select>
                        </template>
                      </div>
                      <div class="form-group col-md-2">
                        <label>Min Rating</label>
                        <template v-if="params.certificationCountry !== ''">
                          <select
                            type="text"
                            class="form-control param"
                            id="certificationGt"
                            name="certificationGt"
                            :value="params.certificationGt"
                            @change="handleChange"
                          >
                            <option value>--</option>
                            <option
                              v-for="rating in ratings[params.certificationCountry]"
                              :value="rating.certification"
                              :key="rating.order"
                            >{{rating.certification}}</option>
                          </select>
                        </template>

                        <template v-else>
                          <select
                            type="text"
                            class="form-control param"
                            id="certificationGt"
                            name="certificationGt"
                            :value="params.certificationGt"
                            @change="handleChange"
                            disabled
                          >
                            <option>Ratings</option>
                          </select>
                        </template>
                      </div>
                      <div class="form-group col-md-2">
                        <label>Max Rating</label>
                        <template v-if="params.certificationCountry !== ''">
                          <select
                            type="text"
                            class="form-control param"
                            id="certificationLt"
                            name="certificationLt"
                            :value="params.certificationLt"
                            @change="handleChange"
                          >
                            <option value>--</option>
                            <option
                              v-for="rating in ratings[params.certificationCountry]"
                              :value="rating.certification"
                              :key="rating.order"
                            >{{rating.certification}}</option>
                          </select>
                        </template>

                        <template v-else>
                          <select
                            type="text"
                            class="form-control param"
                            id="certificationLt"
                            name="certificationLt"
                            :value="params.certificationLt"
                            @change="handleChange"
                            disabled
                          >
                            <option>Ratings</option>
                          </select>
                        </template>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-6 mx-auto">
                        <label>Sort</label>
                        <select
                          type="text"
                          class="form-control param"
                          id="sort"
                          name="sort"
                          :value="params.sort"
                          @change="handleChange"
                        >
                          <option value>--</option>
                          <option value="popularity.desc">Popularity (Descending)</option>
                          <option value="popularity.asc">Popularity (Ascending)</option>
                          <option value="primary_release_date.desc">Release Date (Descending)</option>
                          <option value="primary_release_date.asc">Release Date (Ascending)</option>
                          <option value="vote_average.desc">Vote Average (Descending)</option>
                          <option value="vote_average.asc">Vote Average (Ascending)</option>
                          <option value="vote_count.desc">Vote Count (Descending)</option>
                          <option value="vote_count.asc">Vote Count (Ascending)</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-outline-secondary">Discover</button>
                  </div>
                </template>
              </div>
            </div>
            <div class="tab-pane" id="nav-tv" role="tabpanel" aria-labelledby="nav-tv-tab">
              <div class="form-group">
                <template v-if="!advanced">
                  <div class="form-group">
                    <label>
                      <strong>Choose an option...</strong>
                    </label>
                    <div class="input-group">
                      <select
                        name="query"
                        :value="query"
                        @change="handleChange"
                        class="custom-select"
                        id="inputGroupSelect04"
                        aria-label="Example select with button addon"
                      >
                        <option
                          v-for="(query, index) in queries[activeTab]"
                          :key="index"
                        >{{query.name}}</option>
                      </select>
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit">Discover</button>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div class="form-group">
                    <div class="form-row">
                      <div class="form-group col-md-5">
                        <label>First Aired After</label>
                        <input
                          type="date"
                          class="form-control param"
                          id="primaryReleaseDateGt"
                          name="primaryReleaseDateGt"
                          :value="params.primaryReleaseDateGt"
                          @change="handleChange"
                          min="1900-01-01"
                          max="2019-10-01"
                        />
                      </div>
                      <div class="form-group col-md-5">
                        <label>First Aired Before</label>
                        <input
                          type="date"
                          class="form-control param"
                          id="primaryReleaseDateLt"
                          name="primaryReleaseDateLt"
                          :value="params.primaryReleaseDateLt"
                          @change="handleChange"
                          min="1900-01-01"
                          max="2019-10-01"
                        />
                      </div>
                      <div class="form-group col-md-2">
                        <label>First Aired Year</label>
                        <input
                          class="form-control param"
                          type="number"
                          name="releaseYear"
                          :value="params.releaseYear"
                          @change="handleChange"
                          min="1900"
                          max="2019"
                          id
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Vote Count (min)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="voteCountGt"
                          name="voteCountGt"
                          :value="params.voteCountGt"
                          @change="handleChange"
                          min="0"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>Vote Average (min)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="voteAverageGt"
                          name="voteAverageGt"
                          :value="params.voteAverageGt"
                          @change="handleChange"
                          min="0"
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label>Includes Genre</label>
                        <select
                          type="text"
                          class="form-control param genre"
                          id="genres"
                          name="genres"
                          :value="params.genres"
                          @change="handleChange"
                        >
                          <option value>--</option>
                          <option value="10759">Action & Adventure</option>
                          <option value="16">Animation</option>
                          <option value="35">Comedy</option>
                          <option value="80">Crime</option>
                          <option value="99">Documentary</option>
                          <option value="18">Drama</option>
                          <option value="10751">Family</option>
                          <option value="10762">Kids</option>
                          <option value="9648">Mystery</option>
                          <option value="10763">News</option>
                          <option value="10764">Reality</option>
                          <option value="10765">Sci-Fi & Fantasy</option>
                          <option value="10766">Soap</option>
                          <option value="10767">Talk</option>
                          <option value="10768">War & Politics</option>
                          <option value="37">Western</option>
                        </select>
                      </div>
                      <div class="form-group col-md-4">
                        <label>Excludes Genre</label>
                        <select
                          type="text"
                          class="form-control param genre"
                          id="noGenres"
                          name="noGenres"
                          :value="params.noGenres"
                          @change="handleChange"
                        >
                          <option value>--</option>
                          <option value="10759">Action & Adventure</option>
                          <option value="16">Animation</option>
                          <option value="35">Comedy</option>
                          <option value="80">Crime</option>
                          <option value="99">Documentary</option>
                          <option value="18">Drama</option>
                          <option value="10751">Family</option>
                          <option value="10762">Kids</option>
                          <option value="9648">Mystery</option>
                          <option value="10763">News</option>
                          <option value="10764">Reality</option>
                          <option value="10765">Sci-Fi & Fantasy</option>
                          <option value="10766">Soap</option>
                          <option value="10767">Talk</option>
                          <option value="10768">War & Politics</option>
                          <option value="37">Western</option>
                        </select>
                      </div>
                      <div class="form-group col-md-2">
                        <label>Runtime (max)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="runtimeLt"
                          name="runtimeLt"
                          :value="params.runtimeLt"
                          @change="handleChange"
                          min="0"
                          max="360"
                        />
                      </div>
                      <div class="form-group col-md-2">
                        <label>Runtime (min)</label>
                        <input
                          type="number"
                          class="form-control param"
                          id="runtimeGt"
                          name="runtimeGt"
                          :value="params.runtimeGt"
                          @change="handleChange"
                          min="0"
                          max="360"
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-6 mx-auto">
                        <label>Sort</label>
                        <select
                          type="text"
                          class="form-control param"
                          id="sort"
                          name="sort"
                          :value="params.sort"
                          @change="handleChange"
                        >
                          <option value>--</option>
                          <option value="popularity.asc">Popularity (Ascending)</option>
                          <option value="popularity.desc">Popularity (Descending)</option>
                          <option value="first_air_date.asc">First Air Date (Ascending)</option>
                          <option value="first_air_date.desc">First Air Date (Descending)</option>
                          <option value="vote_average.asc">Vote Average (Ascending)</option>
                          <option value="vote_average.desc">Vote Average (Descending)</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-outline-secondary">Discover</button>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="row no-gutters position-relative bg-popcorn">
      <Loader v-if="isLoading" />
      <div v-if="results" class="col">
        <h3>Results</h3>
        <ResultsGrid v-if="results[0]" :results="results" :type="activeTab" />
        <h1 v-else>No Matches!</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import API from '../API';
import ResultsGrid from '@/components/ResultsGrid.vue';
import Loader from '@/components/Loader.vue';

@Component({
  components: {
    Loader,
    ResultsGrid
  }
})
export default class Discover extends Vue {
  public queries = {
    movie: [
      {
        name: 'What movies are new?',
        data: {
          releaseDateGt: '2019-08-25',
          releaseDateLt: '2019-09-27',
          sort: 'release_date.desc',
          voteCountGt: '50'
        }
      },
      // {
      //   name: "What are the most popular movies?",
      //   data: {
      //     sort: "popularity.desc"
      //   }
      // },
      {
        name: 'What are the highest rated movies rated R?',
        data: {
          certificationCountry: 'US',
          certification: 'R',
          sort: 'vote_average.desc',
          voteCountGt: '500'
        }
      },
      {
        name: 'What are the most popular kids movies?',
        data: {
          certificationCountry: 'US',
          certificationLt: 'G',
          sort: 'popularity.desc',
          voteCountGt: '250'
        }
      },
      {
        name: 'What are the best movies from 2010?',
        data: {
          releaseYear: '2010',
          sort: 'vote_average.desc',
          voteCountGt: '300'
        }
      },
      {
        name: 'What are the best dramas that were released this year?',
        data: {
          genres: '18',
          releaseYear: '2019',
          voteCountGt: '300'
        }
      },
      {
        name:
          'What are the highest rated science fiction movies that Tom Cruise has been in?',
        data: {
          genres: '878',
          cast: '500',
          sort: 'vote_average.desc'
        }
      },
      {
        name: 'What are the Will Ferrell\'s highest grossing comedies?',
        data: {
          genres: '35',
          cast: '23659',
          sort: 'revenue.desc'
        }
      },
      {
        name: 'Have Brad Pitt and Edward Norton ever been in a movie together?',
        data: {
          people: '287,819',
          sort: 'vote_average.desc'
        }
      },
      {
        name: 'Has David Fincher ever worked with Rooney Mara?',
        data: {
          people: '108916,7467',
          sort: 'popularity.desc'
        }
      },
      {
        name: 'What are the best documentaries?',
        data: {
          genres: '99',
          sort: 'vote_average.desc',
          voteCountGt: '100'
        }
      },
      {
        name: 'What are Liam Neeson\'s highest grossing rated \'R\' movies?',
        data: {
          certificationCountry: 'US',
          certification: 'R',
          sort: 'revenue.desc',
          cast: '3896'
        }
      }
    ],
    tv: [
      {
        name: 'What shows are new?',
        data: {
          releaseDateGt: '2019-08-25',
          releaseDateLt: '2019-09-27',
          sort: 'first_air_date.desc'
        }
      },
      {
        name: 'What are the highest rated shows rated R?',
        data: {
          certificationCountry: 'US',
          certification: 'R',
          sort: 'vote_average.desc',
          voteCountGt: '500'
        }
      },
      {
        name: 'What are the best shows from 2010?',
        data: {
          releaseYear: '2010',
          sort: 'vote_average.desc',
          voteCountGt: '100'
        }
      },
      {
        name: 'What are the best dramas that were released this year?',
        data: {
          genres: '18',
          releaseYear: '2019',
          voteCountGt: '500'
        }
      },
      {
        name: 'What are the best kids shows?',
        data: {
          genres: '10762',
          sort: 'vote_average.desc',
          voteCountGt: '10'
        }
      }
    ]
  };
  public activeTab = 'movie';
  public query = 'What movies are new?';
  public params = {
    cast: '',
    companies: '',
    crew: '',
    certification: '',
    certificationCountry: '',
    certificationGt: '',
    certificationLt: '',
    genres: '',
    keywords: '',
    language: '',
    noGenres: '',
    noKeywords: '',
    people: '',
    primaryReleaseDateGt: '',
    primaryReleaseDateLt: '',
    region: '',
    releaseDateGt: '',
    releaseDateLt: '',
    releaseYear: '',
    runtimeGt: '',
    runtimeLt: '',
    sort: '',
    voteCountGt: '',
    voteCountLt: '',
    voteAverageGt: '',
    voteAverageLt: ''
  };
  public advanced = false;
  public results = null;
  public favPeople = [];
  public peopleLoaded = false;
  public ratings = {};
  public isLoading = false;

  public mounted() {
    console.log('getting ratings...');
    API.TMDB.ratings()
      .then(ratings => (this.ratings = ratings.data.certifications))
      .catch(err => console.log(err));
  }

  public componentDidUpdate() {
    // const { user, authToken } = this.context;
    // if (user && !this.state.peopleLoaded) {
    //   console.log('getting people');
    //   API.Favorites.people(user.id, authToken)
    //     .then(res => {
    //       this.setState({
    //         peopleLoaded: true,
    //         favPeople: res.data
    //       });
    //     })
    //     .catch(err => console.log(err));
    // }
  }

  public handleChange(e) {
    if (e.target.classList.contains('param')) {
      const params = this.params;
      if (e.target.classList.contains('enre')) {
        const i = e.target.selectedIndex;
        const selected = e.target.childNodes[i];
        params[e.target.name] = selected.value;
      } else params[e.target.name] = e.target.value;

      this.params = params;
    } else if (e.target.name === 'activeTab') {
      const params = this.params;
      Object.keys(params).forEach(param => (params[param] = ''));
      (this.params = params),
        (this.advanced = false),
        (this.activeTab = e.target.id.slice(4, e.target.id.length - 4));
    } else if (e.target.name === 'query') {
      this[e.target.name] = e.target.value;
    } else if (e.target.type === 'checkbox') {
      this.advanced = !this.advanced;
    } else this[e.target.name] = e.target.value;
  }

  public handleSubmit(e) {
    e.preventDefault();
    this.isLoading = true;
    const queryParams = {
      cast: '',
      companies: '',
      crew: '',
      certification: '',
      certificationCountry: '',
      certificationGt: '',
      certificationLt: '',
      genres: '',
      keywords: '',
      language: '',
      noGenres: '',
      noKeywords: '',
      people: '',
      primaryReleaseDateGt: '',
      primaryReleaseDateLt: '',
      region: '',
      releaseDateGt: '',
      releaseDateLt: '',
      releaseYear: '',
      runtimeGt: '',
      runtimeLt: '',
      sort: '',
      voteCountGt: '50',
      voteCountLt: '',
      voteAverageGt: '',
      voteAverageLt: ''
    };

    if (!this.advanced) {
      let queryIndex = 0;
      this.queries[this.activeTab].forEach(
        (query, index) =>
          (queryIndex = query.name === this.query ? index : queryIndex)
      );
      Object.keys(this.queries[this.activeTab][queryIndex].data).forEach(
        key =>
          (queryParams[key] = this.queries[this.activeTab][queryIndex].data[
            key
])
      );
    } else {
      Object.keys(this.params).forEach(
        key => (queryParams[key] = this.params[key])
      );
    }

    API.TMDB.discover(this.activeTab, queryParams)
      .then(res => {
        Object.keys(queryParams).forEach(key => (queryParams[key] = ''));
        console.log(res.data);
        this.results = res.data.results;
        this.params = queryParams;
        this.isLoading = false;
      })
      .catch(err => console.log(err));
  }
}
</script>

<style lang="scss">
</style>