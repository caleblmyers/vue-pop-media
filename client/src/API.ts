import axios from 'axios'

export default {
  Comments: {
    add: function (comment: any, token: any) {
      return axios.post('http://localhost:3001/api/comments', { comment }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    },
    delete: function (id: any, token: any) {
      return axios.delete(`http://localhost:3001/api/comments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    },
    edit: function (id: any, body: any, token: any) {
      return axios.put('http://localhost:3001/api/comments/', { id, body }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    },
    getComments: function (type: any, id: any) {
      return axios.get(`http://localhost:3001/api/comments/${type}/${id}`)
    },
    userComments: function (id: any, token: any) {
      return axios.get(`http://localhost:3001/api/comments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
  },

  Favorites: {
    add: function (mediaType: any, tmdbId: any, title: any, userId: any, token: any) {
      return axios.post('http://localhost:3001/api/favorites', { mediaType, tmdbId, title, userId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    },
    people: function (id: any, token: any) {
      return axios.get(`http://localhost:3001/api/favorites/people/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
  },

  News: {
    get: function () {
      return axios.get('http://localhost:3001/api/tmdb/news')
    }
  },

  TMDB: {
    collection: function (id: any) {
      return axios.get(`http://localhost:3001/api/tmdb/collection/${id}`)
    },
    comingSoon: function () {
      return axios.get('http://localhost:3001/api/tmdb/coming_soon')
    },
    genres: function () {
      return axios.get('http://localhost:3001/api/tmdb/genres')
    },
    details: function (type: string, id: any) {
      if (!type) type = 'movie'
      return axios.get(`http://localhost:3001/api/tmdb/details/${type}/${id}`)
    },
    discover: function (type: any, query: any) {
      return axios.post('api/tmdb/discover', { type, query })
    },
    nowPlaying: function () {
      return axios.get('http://localhost:3001/api/tmdb/now_playing')
    },
    popular: function (type: any) {
      return axios.get(`http://localhost:3001/api/tmdb/popular/${type}`)
    },
    ratings: function (type: any) {
      return axios.get('http://localhost:3001/api/tmdb/ratings')
    },
    search: function (data: any) {
      return axios.post('http://localhost:3001/api/tmdb/search', { data })
    },
    season: function (type: any, id: any, season: any) {
      return axios.get(`http://localhost:3001/api/tmdb/details/${type}/${id}/${season}`)
    },
    topRated: function (type: any) {
      return axios.get(`http://localhost:3001/api/tmdb/${type}/top_rated`)
    },
    trending: function (type: any) {
      return axios.get(`http://localhost:3001/api/tmdb/trending/${type}`)
    }
  },

  Users: {
    delete: function (id: any, token: any) {
      return axios.delete(`http://localhost:3001/api/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    },
    login: function (username: any, password: any) {
      return axios.post('http://localhost:3001/api/users/login', { username, password })
    },
    getFavorites: function (id: any, token: any) {
      return axios.get(`http://localhost:3001/api/users/${id}/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    },
    getMe: function (token: any) {
      return axios.get('http://localhost:3001/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    },
    register: function (username: any, email: any, password: any) {
      return axios.post('http://localhost:3001/api/users', { username, email, password })
    },
    update: function (field: any, value: any, id: any, token: any) {
      return axios.put('http://localhost:3001/api/users/', { field, value, id }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
  },

  Secrets: {
    getAll: function (authToken: any) {
      return axios.get('http://localhost:3001/api/secrets', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    }
  }
}