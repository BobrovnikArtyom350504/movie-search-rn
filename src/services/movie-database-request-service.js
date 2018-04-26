const apiVersion = 3;
const apiKey = '24fe6e5f1bff2950b59b2f5db03a5383';
const apiHost = 'https://api.themoviedb.org';


export default class MovieDatabaseRequestService {
  static sendGetRequest(path, query) {
    return fetch(MovieDatabaseRequestService.getRequestUrl(path, query)).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });
  }

  static getRequestUrl(path, query) {
    query = query ? `${query}&` : '';
    query += `api_key=${apiKey}`;

    return `${apiHost}/${apiVersion}/${path}?${query}`;
  }
}