gameApp.directive('ghVisualization', function(){

  return {
    restrict: 'E',
    replace: true,
    scope: {
      puzzleDef: '=',
      w: '=',
      padding: '=',
      ans: '='
    },

    link: function(scope, element, attrs){

      var puzzle = makePuzzle(element, scope.w, scope.padding);

      scope.$watch('puzzleDef', function(newVal, oldVal){
        puzzle.draw(newVal);

        // Apply the transformations to the answer puzzles
        if (scope.ans !== undefined) {
          var trans = scope.puzzleDef.transforms;
          for (var i = 0; i < trans.length; i++) {
            if (trans[i][0] === "rotate") {
              puzzle.rotate(trans[i][1], scope.ans);
            } else if (trans[i][0] === "flip") {
              puzzle.flip(trans[i][1], scope.ans);
            }
          }
        }
      });

    }
  };

});
