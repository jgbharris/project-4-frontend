angular
  .module('finalProject')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.facebook({
    clientId: '2046829932211202',
    url: `${API_URL}/oauth/facebook`
  });
}
