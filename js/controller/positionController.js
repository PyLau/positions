var positionController = angular.module('positionController', ['angular-loading-bar', 'ngAnimate']);

positionApp.controller('positionController', function($scope, $http, PositionUtility, $log) {
	var jsonP = urlBase + 'mlb/'+season+'/position?format=JSON';
	$scope.spinner = false;
    $scope.agileDomain = urlBaseAgile;

    $scope.setActiveRound = function(round) {
        $scope.activeRoundMenu = round;
 
    };
	
	$scope.setPosition = function() {
    	$http({
			method: 'GET',
			url: jsonP
		}).then(function successCallBack(response) {
			if(response.hasOwnProperty('data')) {
				if(response.data.hasOwnProperty('leagues')) {
					if(response.data.leagues.length > 0) {
						if(response.data.leagues[0].hasOwnProperty('divisionList')) {
							$scope.positions = response.data.leagues;
							$scope.activeRoundMenu = $scope.positions[0].leagueId;
							//$scope.divisions = $scope.positions[0].divisionList;
							
							//para el encabezado
							$scope.stats = $scope.positions[0].divisionList[0].teamsPositions[0].stats;
							//
						}
					}
				}
			}
			$scope.spinner = true;
		}, function errorCallBack(response) {
			$scope.positions = response.statusText;
		});
    };

    $scope.getStatsTitleClass = function(titleMobile) {
    	return PositionUtility.getStatsTitleClass(titleMobile);
    };

    $scope.getRowClass = function(index) {
    	return PositionUtility.getRowClass(index);
    };
    $scope.getGamesPlayed = function(stats) {
    	console.log(stats);
    };

    $scope.setPosition();
});    