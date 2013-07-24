angular.module('game', []).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'partials/game.html', controller: GameCtrl}).
      otherwise({redirectTo: 'index.html'});
});
