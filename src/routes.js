angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
 

  $stateProvider
    .state('home', {
      url: '/',
      component: 'app'
    })
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('dashboard', {
      url: '/dashboard',
      component: 'dashboard',
      resolve: {
        loginRequired : loginRequired
      }
    });

    // otherwise will take care of routing the user to the specified url
    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('APIInterceptor');
}

function loginRequired ($q, $location, authManager, $rootScope) {
  var deferred = $q.defer();
  var checkAuth = $rootScope.isAuthenticated;
  //using authManager.isAuthenticated, unfortunately we can still access restricted state if we manually enter URL
  //var a = authManager.isAuthenticated;
  if (checkAuth) {
    deferred.resolve();
  } else {
    $location.path('/')
  }
  return deferred.promise;
};
