angular
  .module('finalProject')
  .factory('Portfolio', Portfolio);

Portfolio.$inject = ['$resource', 'API_URL'];
function Portfolio($resource, API_URL) {
  return new $resource(`${API_URL}/portfolios/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
