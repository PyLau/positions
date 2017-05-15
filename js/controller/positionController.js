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
							

							$scope.activeRoundMenu = positions[0].leagueId;
							//$scope.divisions = $scope.positions[0].divisionList;
							
							//para el encabezado
							$scope.stats = $scope.positions[0].divisionList[0].teamsPositions[0].stats;

							$scope.positions.forEach(function sumGames(division) {
								
								for (l = 0; l < division.divisionList.length; l++) {
									for(j = 0; j < division.divisionList[l].teamsPositions.length; j++){
										var urlName = getTeam(division.divisionList[l].teamsPositions[j].teamId);
										console.log(urlName);
										console.log(division.divisionList[l].teamsPositions[j]); 
										var url = { urlName : urlName };
										division.divisionList[l].teamsPositions[j].push(url);
									}
								}


                                for (i = 0; i < division.divisionList[3].teamsPositions.length; i++) {
                                    var ganados = parseInt(division.divisionList[3].teamsPositions[i].stats[0].value);
                                    var perdidos = parseInt(division.divisionList[3].teamsPositions[i].stats[1].value);

                                    var jugados = {
                                        code : "J",
                                        mobile : true, 
                                        title : "Juegos jugados",
                                        value: ganados + perdidos
                                    }
                                    division.divisionList[3].teamsPositions[i].stats.splice(0, 0, jugados);   
                                }
                            });

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
    function getTeam(teamId){
    	return PositionUtility.getTeamNameById(teamId);
    	console.log(teamId);
    }
    $scope.getRowClass = function(index) {
    	return PositionUtility.getRowClass(index);
    };

    $scope.setPosition();
});    