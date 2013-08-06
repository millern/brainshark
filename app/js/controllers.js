function GameCtrl($scope, $timeout) {

  $scope.puzzleDef = undefined;
  // Game state variables for answers.  "unknown, correct, wrong".  These define classes for answers.
  $scope.ans = ["unknown","unknown","unknown","unknown"];

  // Track whether guess has been made
  $scope.guessed = false;

  // Game state string
  $scope.result = "Select a result";


  $scope.handleGuess = function(ans) {
    if (!$scope.guessed) {
      console.log("You guessed " + ans);
      if (ans === $scope.puzzleDef.ans) {
        // Set the answer message
        $scope.result = "You guessed right";
        $scope["ans"][ans] = "correct";
      } else {
        $scope.result = "You guessed wrong";
        $scope["ans"][ans] = "wrong";
        $scope["ans"][$scope.puzzleDef.ans] = "correct";
      }
    }
    $scope.guessed = true;
  };

  $scope.resetGame = function() {

    $scope.guessed = false;
    $scope.result = "Select a result";
    $scope.ans = ["unknown","unknown","unknown","unknown"];
    $scope.counter = 4;

    var dataset = [];

    // Define a game

    var game1 = [
      {rect: [
        {x: 0.5, y: 0.5, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.25, y: 0.5, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.75, y: 0.5, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
      ]},
      {circle: [
        {x: 0.5, y: 0.25, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.25, y: 0.25, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.75, y: 0.25, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
      ]}
    ];

    // Pick a dataset for the game.  
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
      dataset: game1,
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


  // Timer 
  $scope.counter = 4;
  $scope.onTimeout = function(){
      $scope.counter--;
      if ($scope.counter > 0 ) {
        mytimeout = $timeout($scope.onTimeout,1000);
      } else {
        // Time is up.  Handle empty guess.  
        $scope.handleGuess(0);
      }
  };
  var mytimeout = $timeout($scope.onTimeout,1000);
}
