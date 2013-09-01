gameApp.directive('ghVisualization', function(){

  return {
    restrict: 'E',
    replace: true,
    scope: {
      puzzleDef: '=',
      w: '=',
      padding: '=',
      boxNo: '='
    },

    link: function(scope, element, attrs){

      var puzzle = makePuzzle(element, scope.w);
      scope.$watch('puzzleDef', function(newVal, oldVal){

        puzzle.draw(newVal);
        var trans = scope.puzzleDef.transforms;
        // boxNo 0 is the main puzzle - don't transform it
        if (scope.boxNo !== 0) {
          puzzle.mutate(trans, scope.boxNo);
        }



        // if (scope.boxNo !== 0 && scope.ans === scope.puzzleDef.solution) {
        //   for (var i = 0; i < trans.length; i++) {
        //     puzzle.mutate(trans[i], scope.ans);
        //   }
        //   // Apply random transformations to the other puzzles
        // } else if (scope.boxNo !== 0 && scope.ans !== scope.puzzleDef.solution) {
        //   for (var j = 0; j < trans.length; j++) {
        //     puzzle.mutate(scope.puzzleDef.transform_set[Math.floor(Math.random()*4)], scope.ans);
        //   }
        // }
      });

    }
  };

});
