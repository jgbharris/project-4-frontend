angular
  .module('finalProject')
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersShowCtrl.$inject = ['$auth', 'User', '$state'];
function UsersShowCtrl($auth, User, $state) {
  const vm = this;

  vm.user = User.get($state.params);


  //delete user
  function usersDelete() {
    console.log('clicked');
    vm.user
      .$remove()
      .then(() => {
        $auth.logout();
        $state.go('register');
      });
  }

  vm.delete = usersDelete;


}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    if(vm.editForm.$valid) {
      User
        .update({ id: vm.user.id }, vm.user)
        .$promise
        .then(() => $state.go('usersShow', $stateParams));
    }
  }
  vm.update = usersUpdate;

}
