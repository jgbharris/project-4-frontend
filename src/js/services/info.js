angular
  .module('finalProject')
  .service('info', Info);

Info.$inject = ['$http', 'API_URL'];
function Info($http, API_URL) {
  const vm = this;

  function getInfo(ticker) {
    return $http
      .get(`${API_URL}/info`, { params: { ticker } })
      .then((response) => {
        return response.data;
      });
  }

  vm.getInfo = getInfo;
}
