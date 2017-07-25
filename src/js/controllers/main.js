angular
.module('finalProject')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', 'API_URL', '$auth', '$state', '$rootScope', '$transitions'];
function MainCtrl($http, API_URL, $auth, $state, $rootScope, $transitions) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.errors.join('; '); // enables us to look at errors in the angular app
    if(err.status === 401 && vm.pageName !== 'login') {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  const protectedStates = ['portfoliosNew', 'portfoliosEdit'];

  $transitions.onSuccess({}, (transition) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(transition.$to().name))) {
      vm.message = 'You must be logged in to access this page.';
      return $state.go('login');
    }

    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUser = $auth.getPayload();
    vm.pageName = transition.$to().name;
  });

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;
}
