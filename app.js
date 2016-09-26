(function() {
  'use strict';

  angular.module("LightsOut", [])
  .controller("LightsOutController", LightsOutController)

  LightsOutController.$inject = ["$scope"];
  function LightsOutController($scope) {
    $scope.nCells = 9;
    var gridWidth = 3;
    var cellWidth = Math.round(450 / gridWidth);
    document.styleSheets[1].insertRule(".cell {width: "+cellWidth+"px; height: "+cellWidth+"px;}", this.length-1);
    $scope.classes = ["lightsOut", "lightsOn"];
    $scope.cellArray = [];
    var cellMatrix = [];

    for (var i=0; i < $scope.nCells; i++) {
      var cell = {
        idx: i,
        classIdx: 1,
        xVal: Math.floor(i/gridWidth),
        yVal: i % gridWidth
      };
      $scope.cellArray.push(cell);
    };

    for (var i=0; i < gridWidth; i++) {
      var temp = [];
      for (var j=0; j < gridWidth; j++) {
        temp.push($scope.cellArray[(i*gridWidth)+j]);
      };
      cellMatrix.push(temp);
    };
    console.log(cellMatrix);

    var changeCell = function(el) {
      console.log("HELLO ", el);
      // var clickedCell = $scope.cellArray[idx];
      el.classIdx = el.classIdx === 1 ? 0 : 1;
      // console.log("CLICKED CELL ", clickedCell);
      // console.log(clickedCell.classIdx);
    };

    $scope.getClass = function(idx){
      console.log("GETCLASS", $scope.cellArray[idx], $scope.classes[$scope.cellArray[idx].classIdx]);
      return $scope.classes[$scope.cellArray[idx].classIdx];
    };

    $scope.clickCell = function(idx) {
      console.log("CLICK CELL ", idx);
      var el = $scope.cellArray[idx];
      console.log(el);
      if (!$scope.hasWon()) {
        getNeighbors(el).forEach(function(obj) {changeCell(obj)});
      };
    };

    $scope.reset = function() {
      $scope.cellArray.forEach(function(obj) {obj.classIdx = 1});
    };

    $scope.hasWon = function() {
      return $scope.cellArray.every(function(obj) {return obj.classIdx === 0});
    };

    var getNeighbors = function(el) {
      var result = [el];
      var [x,y] = [el.xVal, el.yVal];
      console.log(result,x,y);
      for (var i = -1; i < 2; i += 2) {
        if (x+i >= 0 && x+i < gridWidth) {
          console.log("TRYING1 ", x+i, y);
          result.push(cellMatrix[x+i][y]);
        };
        if (y+i >= 0 && y+i < gridWidth) {
          console.log("TRYING2 ", x, y+i);
          result.push(cellMatrix[x][y+i]);
        }
      };
      console.log("NEIGHBORS: ", result);
      return result;
    };

  };


})();
