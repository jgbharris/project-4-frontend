angular
.module('finalProject')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', 'API_URL', '$auth', '$state', '$rootScope', '$transitions'];
function MainCtrl($http, API_URL, $auth, $state, $rootScope, $transitions) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.errors.join('; ');
    if(err.status === 401 && vm.pageName !== 'login') {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.$to().name;
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUser = $auth.getPayload();
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;

  // $http({
  //   method: 'GET',
  //   url: `${API_URL}/users`
  // })
  // .then((res) => vm.users = res.data);

}
