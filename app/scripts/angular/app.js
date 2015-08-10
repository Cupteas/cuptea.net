var app = angular.module('app', ['ngRoute', 'blogCtrlModule']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: BlogIndexCtrl
      })
      .when('/blogs:blogId', {

      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }
]);
