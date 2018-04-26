import MovieDatabaseApi from './movie-database-api';

let movieGenres = null;

export default class MovieService {
  static getMovie(id) {
    return MovieDatabaseApi.getMovie(id)
      .then(response => response)
      .catch(error => {
        console.log(error);

        return null;
      });
  }

  static getMovieCredits(id) {
    return MovieDatabaseApi.getMovieCredits(id)
      .then(response => response)
      .catch(error => {
        console.log(error);

        return null;
      });
  }

  static getUpcomingMovies() {
    return MovieDatabaseApi.getUpcomingMovies()
      .then(({results}) => MovieService.decorateMovieList(results))
      .catch(error => {
        console.log(error);

        return null;
      });
  }

  static getNowPlayingMovies() {
    return MovieDatabaseApi.getNowPlayingMovies()
      .then(({results}) => MovieService.decorateMovieList(results))
      .catch(error => {
        console.log(error);

        return null;
      });
  }

  static getMostPopularMovies() {
    return MovieDatabaseApi.getMostPopularMovies()
      .then(({results}) => MovieService.decorateMovieList(results))
      .catch(error => {
        console.log(error);

        return null;
      });
  }

  static searchMovies(query, page = 1) {
    return MovieDatabaseApi.searchMovies(query, page)
      .then(response => {
        MovieService.decorateMovieList(response.results);

        return response;
      })
      .catch(error => {
        console.log(error);

        return null;
      });
  }

  static discoverMovies(filters, page = 1) {
    return MovieDatabaseApi.discoverMovies(filters, page)
      .then(response => {
        MovieService.decorateMovieList(response.results);

        return response;
      })
      .catch(error => {
        console.log(error);

        return null;
      });
  }

  static getPerson(id) {
    return MovieDatabaseApi.getPerson(id)
      .then(response => response)
      .catch(error => {
        console.log(error);

        return null;
      });

  }

  static decorateMovieList(movies) {
    if (!movies) {
      return [];
    }

    return MovieService.getAllMovieGenres().then(genres => {
      if (!genres) {
        return movies;
      }

      movies.forEach(movie => {
        movie.genres = movie.genre_ids.map(id => {
          return {id: id, name: genres[id]};
        });
      });

      return movies;
    });
  }

  static getAllMovieGenres() {
    return new Promise(resolve => {
      if (movieGenres) {
        resolve(movieGenres);
      } else {
        MovieDatabaseApi.getAllMovieGenres()
          .then(response => {
            movieGenres = {};
            response.genres.forEach(genre => {
              movieGenres[genre.id] = genre.name;
            });
            resolve(movieGenres);
          })
          .catch(error => {
            console.log(error);
            resolve(movieGenres);
          });
      }
    });
  }
}