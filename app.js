(function() {
  'use strict';

  angular.module("LightsOut", [])
  .controller("LightsOutController", LightsOutController)

  LightsOutController.$inject = ["$scope"];
  function LightsOutController($scope) {
    $scope.nRows = 3;
    $scope.nRowsObj = {nRows: 3};
    $scope.nCells = $scope.nRows**2;
    var gridWidth = $scope.nRows;
    console.log(gridWidth);
    $scope.cellWidth = Math.round(450 / gridWidth);
    document.styleSheets[1].insertRule(".cell {width: "+$scope.cellWidth+"px; height: "+$scope.cellWidth+"px;}", document.styleSheets[1].length-1);
    $scope.classes = ["lightsOut", "lightsOn"];
    $scope.cellArray = [];
    var cellMatrix = [];

    function makeGrid() {
      console.log("MAKE GRID", document.styleSheets[1].cssRules[0]);
      document.styleSheets[1].deleteRule(0);
      console.log("MAKE GRID", document.styleSheets[1].cssRules[0]);

      gridWidth = $scope.nRows;
      $scope.cellWidth = Math.round(450 / gridWidth);
      document.styleSheets[1].insertRule(".cell {width: "+$scope.cellWidth+"px; height: "+$scope.cellWidth+"px;}", document.styleSheets[1].length-1);
      console.log("MAKE GRID", document.styleSheets[1].cssRules[0]);
      console.log(gridWidth, $scope.cellWidth);
      // document.styleSheets[1].cssRules[0].cssText = ".cell {width: "+$scope.cellWidth+"px; height: "+$scope.cellWidth+"px;}";

      $scope.cellArray = [];
      for (var i=0; i < $scope.nCells; i++) {
        var cell = {
          idx: i,
          classIdx: 1,
          xVal: Math.floor(i/gridWidth),
          yVal: i % gridWidth
        };
        $scope.cellArray.push(cell);
      };

      cellMatrix = [];
      for (var i=0; i < gridWidth; i++) {
        var temp = [];
        for (var j=0; j < gridWidth; j++) {
          temp.push($scope.cellArray[(i*gridWidth)+j]);
        };
        cellMatrix.push(temp);
      };
      console.log(cellMatrix);
    };
    makeGrid();

    var changeCell = function(el) {
      console.log("HELLO ", el);
      // var clickedCell = $scope.cellArray[idx];
      el.classIdx = el.classIdx === 1 ? 0 : 1;
      // console.log("CLICKED CELL ", clickedCell);
      // console.log(clickedCell.classIdx);
    };

    $scope.getClass = function(idx){
      // console.log("GETCLASS", $scope.cellArray[idx], $scope.classes[$scope.cellArray[idx].classIdx]);
      return $scope.classes[$scope.cellArray[idx].classIdx];
    };

    $scope.clickCell = function(idx) {
      console.log("CLICK CELL ", idx, $scope.nRows, $scope.nRowsObj);
      var el = $scope.cellArray[idx];
      console.log(el);
      if (!$scope.hasWon()) {
        getNeighbors(el).forEach(function(obj) {changeCell(obj)});
      };
    };

    $scope.$watch('nRowsObj.nRows', function() {
        console.log("nRows " , $scope.nRows, $scope.nRowsObj);
        $scope.nCells = $scope.nRowsObj.nRows ** 2;
        $scope.nRows = $scope.nRowsObj.nRows;
        // $scope.nCells = $scope.nRows**2;
        makeGrid();
    });

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
          // console.log("TRYING1 ", x+i, y);
          result.push(cellMatrix[x+i][y]);
        };
        if (y+i >= 0 && y+i < gridWidth) {
          // console.log("TRYING2 ", x, y+i);
          result.push(cellMatrix[x][y+i]);
        }
      };
      // console.log("NEIGHBORS: ", result);
      return result;
    };



  };


})();
