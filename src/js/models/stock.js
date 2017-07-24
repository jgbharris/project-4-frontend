angular
  .module('finalProject')
  .factory('Stock', Stock);

Stock.$inject = ['$resource', 'API_URL'];
function Stock($resource, API_URL) {
  return new $resource(`${API_URL}/stocks/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
