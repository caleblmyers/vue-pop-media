const apiControllers = require('express').Router()

apiControllers.use('/tmdb', require('./tmdbController'))
apiControllers.use('/users', require('./usersController'))
apiControllers.use('/favorites', require('./favoritesController'))
apiControllers.use('/comments', require('./commentsController'))

module.exports = apiControllers
