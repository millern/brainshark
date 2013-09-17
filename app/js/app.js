var gameApp = angular.module('game', ['ui.router']).
  config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/game");

    $stateProvider.state('game', {
		url: '/game',
		templateUrl: 'partials/game.html',
		controller: GameCtrl
	});

});

