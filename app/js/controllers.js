function GameCtrl($scope) {

  $scope.puzzleDef = undefined;
  // Game state variables for answers.  "unknown, correct, wrong"
  $scope.ans1 = "unknown";
  $scope.ans2 = "unknown";
  $scope.ans3 = "unknown";
  $scope.ans4 = "unknown";

  // Game state string
  $scope.result = "Select a result";


  $scope.handleGuess = function(ans) {
    console.log("You guessed " + ans);
    if (ans === $scope.puzzleDef.ans) {
      // Set the answer message
      $scope.result = "You guessed right";
      $scope["ans"+ans] = "correct";
    } else {
      $scope.result = "You guessed wrong";
      $scope["ans"+ans] = "wrong";
      $scope["ans" + $scope.puzzleDef.ans] = "correct";
    }
  };

  $scope.resetGame = function() {

    var dataset = [];

    // Set the positions of the circles.  puzzle may come from the server later.
    for (var i = 0; i < 3; i++) {
      dataset.push({
        x:Math.random(),
        y:Math.random(),
        r:Math.random()
      });
    }

    // Define transforms.  Transforms come in as #0-5
    $scope.transforms =[
      ["rotate", 90],
      ["rotate", 180],
      ["rotate", 270],
      ["flip", "x"],
      ["flip", "y"]
    ];

    $scope.puzzleDef = {
      theme: 'circle',
      dataset: dataset,
      transforms: [$scope.transforms[3],
                   $scope.transforms[2],
                   $scope.transforms[4],
                   $scope.transforms[0]
                  ],
      transform_set: $scope.transforms,
      solution: 2,
      color: '#'+Math.floor(Math.random()*16777215).toString(16) // Pick a random color.  Why not?
    };

  };

  $scope.resetGame();

}
