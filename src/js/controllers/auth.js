angular
.module('finalProject')
.controller('RegisterCtrl', RegisterCtrl)
.controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    $auth.signup(vm.user)
    .then(() => $state.go('login'));
  }

  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    $auth.login(vm.credentials)
    .then((res) => {
      console.log(res.data.user);
      $state.go('usersShow', { id: res.data.user.id });
    });
  }

  vm.submit = submit;

  function authenticate(provider) {
    $auth.authenticate(provider)
    .then((res) => $state.go('usersShow', { id: res.data.user.id }));

  }

  vm.authenticate = authenticate;
}
