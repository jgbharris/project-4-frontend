angular
  .module('finalProject')
  .service('companies', Companies);

Companies.$inject = ['$http', 'API_URL'];
function Companies($http, API_URL) {
  const vm = this;

  function getCompanies(query) {
    console.log(query);
    return $http
      .get(`${API_URL}/companies`, { params: { query } })
      .then((response) => {
        return response.data;
      });
  }

  vm.getCompanies = getCompanies;
}
