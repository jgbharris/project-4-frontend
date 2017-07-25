angular
  .module('finalProject')
  .service('price', Price);

Price.$inject = ['$http', 'API_URL'];
function Price($http, API_URL) {
  const vm = this;

  function getPrice(ticker) {
    return $http
      .get(`${API_URL}/price`, { params: { ticker } })
      .then((response) => {
        return response.data;
      });
  }

  vm.getPrice = getPrice;
}
