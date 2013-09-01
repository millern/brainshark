var gameApp = angular.module('game', []).
  config(function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/game.html',
        controller: GameCtrl
      }).otherwise({redirectTo: 'index.html'});

    // configure html5 to get links working
    // If you don't do this, you URLs will be base.com/#/home rather than base.com/home
    $locationProvider.html5Mode(true);
});
