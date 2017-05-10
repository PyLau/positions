var positionApp = angular.module('positionApp',['ngRoute']);

Utility.initParentQueryParameters();
var urlBaseAgile = Utility.getAgileDomain(domainType);
var urlBase = Utility.getServiceDomain(domainType);
var season = Utility.getSeason('mlb');
var teamId = Utility.getTeamId();