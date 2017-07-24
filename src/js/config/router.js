angular
.module('finalProject')
.config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'js/views/static/home.html'
  })
  .state('portfoliosIndex', {
    url: '/portfolios',
    templateUrl: 'js/views/portfolios/index.html',
    controller: 'PortfoliosIndexCtrl as portfoliosIndex'
  })
  .state('portfoliosNew', {
    url: '/portfolios/new',
    templateUrl: 'js/views/portfolios/new.html',
    controller: 'PortfoliosNewCtrl as portfoliosNew'
  })
  .state('portfoliosShow', {
    url: '/portfolios/:id',
    templateUrl: 'js/views/portfolios/show.html',
    controller: 'PortfoliosShowCtrl as portfoliosShow'
  })
  .state('porfoliosEdit', {
    url: '/portfolios/:id/edit',
    templateUrl: 'js/views/porfolios/edit.html',
    controller: 'PorfoliosEditCtrl as portfoliosEdit'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'js/views/auth/login.html',
    controller: 'LoginCtrl as login'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'js/views/auth/register.html',
    controller: 'RegisterCtrl as register'
  })
  .state('usersShow', {
    url: '/users/:id',
    templateUrl: 'js/views/users/profile.html',
    controller: 'UsersShowCtrl as usersShow'
  })
  .state('usersEdit', {
    url: '/users/:id/edit',
    templateUrl: 'js/views/users/edit.html',
    controller: 'UsersEditCtrl as usersEdit'
  });

  $urlRouterProvider.otherwise('/home');
}
