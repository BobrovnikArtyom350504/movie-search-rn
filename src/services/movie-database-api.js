import RequestService from './movie-database-request-service';

export default class MovieDatabaseApi {
  static getMovie(id) {
    return RequestService.sendGetRequest(`movie/${id}`);
  }

  static searchMovies(query, page) {
    return RequestService.sendGetRequest('search/movie', `page=${page}&query=${query}`);
  }

  static discoverMovies(filters, page) {
    let query = `page=${page}`;
    Object.keys(filters).forEach(filterName => {
      query += '&';
      query += `${filterName}=${filters[filterName]}`;
    });

    return RequestService.sendGetRequest('discover/movie', query);
  }

  static getUpcomingMovies() {
    return RequestService.sendGetRequest('movie/upcoming');
  }

  static getNowPlayingMovies() {
    return RequestService.sendGetRequest('movie/now_playing');
  }

  static getMostPopularMovies() {
    return RequestService.sendGetRequest('movie/popular');
  }

  static getAllMovieGenres() {
    return RequestService.sendGetRequest('genre/movie/list');
  }

  static getMovieCredits(movieId) {
    return RequestService.sendGetRequest(`movie/${movieId}/credits`);
  }

  static getPerson(personId) {
    return RequestService.sendGetRequest(`person/${personId}`);
  }
}