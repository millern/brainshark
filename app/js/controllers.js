function GameCtrl($scope) {
  $scope.name = "Nick";

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
  var transforms =[
    ["rotate", 90],
    ["rotate", 180],
    ["rotate", 270],
    ["flip", "x"],
    ["flip", "y"]
  ];

  $scope.puzzleDef = {
    theme: 'circle',
    dataset: dataset,
    transforms: [transforms[3],
                 transforms[2],
                 transforms[4],
                 transforms[0]
                ],
    solution: 2
  };
}
