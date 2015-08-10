var blogCtrlModule = angular.module('app', []);

blogCtrlModule.controller('BlogIndexCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.header = {
      name: 'header.html',
      url: 'views/tpls/header.html'
    },
    $scope.footer = {
      name: 'footer.html',
      url: 'views/tpls/footer.html'
    },
    $scope.blogs = function() {
      $http.get('api/data.json')
        .success(function(data) {
          return data;
        })
    }
}]);
