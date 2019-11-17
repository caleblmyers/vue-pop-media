import axios from 'axios';

const API = {
  Comments: {
    add(comment: any, token: any) {
      return axios.post('http://localhost:3001/api/comments', { comment }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    },
    delete(id: any, token: any) {
      return axios.delete(`http://localhost:3001/api/comments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    },
    edit(id: any, body: any, token: any) {
      return axios.put('http://localhost:3001/api/comments/', { id, body }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    },
    getComments(type: any, id: any) {
      return axios.get(`http://localhost:3001/api/comments/${type}/${id}`);
    },
    userComments(id: any, token: any) {
      return axios.get(`http://localhost:3001/api/comments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  },

  Favorites: {
    add(mediaType: any, tmdbId: any, title: any, userId: any, token: any) {
      return axios.post('http://localhost:3001/api/favorites', { mediaType, tmdbId, title, userId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    },
    people(id: any, token: any) {
      return axios.get(`http://localhost:3001/api/favorites/people/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  },

  News: {
    get() {
      return axios.get('http://localhost:3001/api/tmdb/news');
    }
  },

  TMDB: {
    collection(id: any) {
      return axios.get(`http://localhost:3001/api/tmdb/collection/${id}`);
    },
    comingSoon() {
      return axios.get('http://localhost:3001/api/tmdb/coming_soon');
    },
    genres() {
      return axios.get('http://localhost:3001/api/tmdb/genres');
    },
    details(type: string, id: any) {
      if (!type) return axios.get(`http://localhost:3001/api/tmdb/details/movie/${id}`);
      return axios.get(`http://localhost:3001/api/tmdb/details/${type}/${id}`);
    },
    discover(type: any, query: any) {
      return axios.post('api/tmdb/discover', { type, query });
    },
    nowPlaying() {
      return axios.get('http://localhost:3001/api/tmdb/now_playing');
    },
    popular(type: any) {
      return axios.get(`http://localhost:3001/api/tmdb/popular/${type}`);
    },
    ratings(type: any) {
      return axios.get('http://localhost:3001/api/tmdb/ratings');
    },
    search(data: any) {
      return axios.post('http://localhost:3001/api/tmdb/search', { data });
    },
    season(type: any, id: any, season: any) {
      return axios.get(`http://localhost:3001/api/tmdb/details/${type}/${id}/${season}`);
    },
    topRated(type: any) {
      return axios.get(`http://localhost:3001/api/tmdb/${type}/top_rated`);
    },
    trending(type: any) {
      return axios.get(`http://localhost:3001/api/tmdb/trending/${type}`);
    }
  },

  Users: {
    delete(id: any, token: any) {
      return axios.delete(`http://localhost:3001/api/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    },
    login(username: any, password: any) {
      return axios.post('http://localhost:3001/api/users/login', { username, password });
    },
    getFavorites(id: any, token: any) {
      return axios.get(`http://localhost:3001/api/users/${id}/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    },
    getMe(token: any) {
      return axios.get('http://localhost:3001/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    },
    register(username: any, email: any, password: any) {
      return axios.post('http://localhost:3001/api/users', { username, email, password });
    },
    update(field: any, value: any, id: any, token: any) {
      return axios.put('http://localhost:3001/api/users/', { field, value, id }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  },

  Secrets: {
    getAll(authToken: any) {
      return axios.get('http://localhost:3001/api/secrets', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  }
};

export default API;
