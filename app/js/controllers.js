function GameCtrl($scope, $timeout) {

  $scope.puzzleDef = undefined;
  // Game state variables for answers.  "unknown, correct, wrong".  These define classes for answers.
  $scope.ans = ["unknown","unknown","unknown","unknown"];

  // Track whether guess has been made
  $scope.guessed = false;

  // Game state string
  $scope.result = "Select a result";

  $scope.games = [];

  $scope.currGame = 0;

  // Define the games.

  $scope.games.push( {
    id: 1,
    level: "Easy",
    data: [
      {rect: [
        {x: 0.5, y: 0.5, w: 0.1, h: 0.15, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
      ]},
      {circle: [
        {x: 0.15, y: 0.5, r: 0.1, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.85, y: 0.5, r: 0.1, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
      ]}
    ]
  } );

  $scope.games.push( {
    id: 2,
    level: "Medium",
    data: [
      {rect: [
        {x: 0.5, y: 0.5, w: 0.1, h: 0.15, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.5, y: 0.1, w: 0.1, h: 0.15, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
      ]},
      {circle: [
        {x: 0.15, y: 0.5, r: 0.1, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.85, y: 0.5, r: 0.1, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
      ]}
    ]
  } );

  $scope.games.push( {
    id: 3,
    level: "Hard",
    data: [
      {rect: [
        {x: 0.5, y: 0.5, w: 0.1, h: 0.15, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.5, y: 0.1, w: 0.1, h: 0.15, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.5, y: 0.9, w: 0.1, h: 0.15, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
      ]},
      {circle: [
        {x: 0.15, y: 0.5, r: 0.1, color: '#'+Math.floor(Math.random()*16777215).toString(16)},
        {x: 0.85, y: 0.5, r: 0.1, color: '#'+Math.floor(Math.random()*16777215).toString(16)}
      ]}
    ]
  } );

  $scope.games.push( {
    id: 4,
    level: "Hard",
    data: [
      {cards: [
        {x: 0.5, y: 0.75, size: "20px", text:'A', color: 'red'},
        {x: 0.75, y: 0.5, size: "20px", text:'A', color: 'red'},
        {x: 0.25, y: 0.5, size: "20px", text:'A', color: 'red'},
        {x: 0.5, y: 0.25, size: "20px", text:'A', color: 'red'}
      ]}
    ]
  } );

  $scope.handleGuess = function(ans) {
    if (!$scope.guessed) {
      console.log("You guessed " + ans);
      if (ans === $scope.puzzleDef.solution) {
        // Set the answer message
        $scope.result = "You guessed right";
        $scope["ans"][ans] = "correct";
      } else {
        $scope.result = "You guessed wrong";
        $scope["ans"][ans] = "wrong";
        $scope["ans"][$scope.puzzleDef.solution] = "correct";
      }
    }
    $scope.guessed = true;
  };

  $scope.resetGame = function() {

    // Game state variables
    $scope.guessed = false;
    $scope.result = "Select a result";
    $scope.ans = ["unknown","unknown","unknown","unknown"];
    $scope.counter = 4;
    $scope.currGame ++;
    $scope.startGame();
  };

  $scope.startGame = function(){

    // Define transforms.  Transforms come in as #0-4
    $scope.transforms =[
      ["rotate", 90],
      ["rotate", 180],
      ["rotate", -90],
      ["flip", "x"],
      ["flip", "y"]
    ];

    $scope.puzzleDef = {
      dataset: $scope.games[3].data,
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

  $scope.startGame();


  // Timer 
  $scope.counter = 100;
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
