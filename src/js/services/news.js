angular
.module('finalProject')
.service('newsService', newsService);

newsService.$inject = ['$http', 'API_URL'];
function newsService($http, API_URL){
  this.getNews = function getNews() {
    return $http
    .get(`${API_URL}/news`)
    .then((response) => {
      return response.data.articles;
    });
  };
}
