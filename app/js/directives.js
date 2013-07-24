gameApp.directive('ghVisualization', function(){

  return {
    restrict: 'E',
    replace: true,
    scope: {
      puzzleDef: '=',
      w: '=',
      padding: '='
    },

    link: function(scope, element, attrs){

      var puzzle = makePuzzle(element, scope.w, scope.padding);

      scope.$watch('puzzleDef', function(newVal, oldVal){
        puzzle.draw(newVal);
      });

    }
  };

});
