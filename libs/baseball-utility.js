(function(window) {
  	'use strict';

  	function init() {
        var Utility = new (function() {
        	this.app = 'v0.1',
        	this.agileDomainDev = 'http://eu-pre.agilecontents.com',
        	this.agileDomainPro = 'http://www.eluniversal.com',
			this.serviceDomainDev = 'http://qa.widget.eluniversal.com',
			this.serviceDomainPro = 'http://widget.eluniversal.com',
			this.urlBaseDev = this.serviceDomainDev + '/api/baseball/leagues/',
			this.urlBasePro = this.serviceDomainPro + '/api/baseball/leagues/',
			this.seasonLVBP = seasonLVBP,
			this.seasonMLB = seasonMLB,
			this.seasonSC = seasonSC,
			this.seasonWBC = seasonWBC,
			this.queryParameters = {},
			this.queryParameterFilters = {
				teamId: 'teamNameOrId', 
				teamName: 'teamNameOrId', 
				teamNameOrId: 'teamNameOrId'
			},
			this.player = {},
			this.gameId = 0,
			this.teamId = 0,
			this.playerId = 0,
			this.monthsName = {
		        'January':'Enero', 'February':'Febrero', 'March':'Marzo', 'April':'Abril', 
		        'May':'Mayo', 'June':'Junio', 'July':'Julio', 'August':'Agosto', 
		        'September':'Septiembre', 'October':'Octubre', 'November':'Noviembre', 'December':'Diciembre'
		    },
		    this.monthsAbbrev = {
		        'Jan':'Ene', 'Feb':'Feb', 'Mar':'Mar', 'Apr':'Abr', 
		        'May':'May', 'Jun':'Jun', 'Jul':'Jul', 'Aug':'Ago', 
		        'Sep':'Sep', 'Oct':'Oct', 'Nov':'Nov', 'Dec':'Dic'
		    }
        })();

		/*
	    **  Funciones Globales
	    */

	    Utility.initParentQueryParameters = function() {
	    	var queryParameters = this.getParentQueryParameters();
	    	this.setQueryParameters(queryParameters);
	    	if(this.getQueryParameters().hasOwnProperty('player')) {
	            this.setPlayerId(this.getQueryParameters().player);
	        } else if(this.getQueryParameters().hasOwnProperty('playerId')) {
	            this.setPlayerId(this.getQueryParameters().playerId);
	        }
	    };

		Utility.getParentQueryParameters = function() {
			var child = document.location.href;
			var parent = null;
			var childQueryParameters = null;
			var parentQueryParameters = null;
			var allQueryParameters = '';
			var obj = {};

			if(window.location != window.parent.location) {
				parent = document.referrer;
			} 
			
			childQueryParameters = this.getQueryParametersFromUrl(child);
			parentQueryParameters = this.getQueryParametersFromUrl(parent);

			if(childQueryParameters!=null || parentQueryParameters!=null) {
				obj = getMergeObject(getObjectFromString(childQueryParameters, '&'), getObjectFromString(parentQueryParameters, '&'), this.queryParameterFilters);
				allQueryParameters = getQueryStringFromObject(obj);
			}
			return allQueryParameters;
		};

		Utility.getQueryParametersFromUrl = function(url) {
			var queryParameters = null;
			if(url!=null && url.indexOf('?')) {
				var parametersSplit = url.split('?');
				var parametersChildSplit = null;

				parametersSplit.forEach(function (parameters) {
				    if(parameters.indexOf('#/')) {
						parametersChildSplit = parameters.split('#/');

						parametersChildSplit.forEach(function (parametersChild) {
							if(parametersChild.indexOf('=')) {
								if(queryParameters!=null) {
									queryParameters += parametersChild;
								} else {
									queryParameters = parametersChild + '&';
								}
							}
						});
					} else {
						if(parameters.indexOf('=')) {
							if(queryParameters!=null) {
								queryParameters += parameters;
							} else {
								queryParameters = parameters + '&';
							}
						}
					}
				});
			}

			if(queryParameters!=null) {
				queryParameters = queryParameters.trim();
			}
			return queryParameters;
		};

		Utility.getSeason = function(type) {
	        if(this.getQueryParameters().hasOwnProperty('season')) {
	        	if(type == 'lvbp') {
	        		this.seasonLVBP = this.getQueryParameters().season;
	        	}
	        	if(type == 'mlb') {
	        		this.seasonMLB = this.getQueryParameters().season;
	        	}
	        	if(type == 'sc') {
	        		this.seasonSC = this.getQueryParameters().season;
	        	}
	        	if(type == 'wbc') {
	        		this.seasonWBC = this.getQueryParameters().season;
	        	}
	        }
	        if(this.getQueryParameters().hasOwnProperty('seasonlvbp')) {
	            this.seasonLVBP = this.getQueryParameters().seasonlvbp;
	        }
	        if(this.getQueryParameters().hasOwnProperty('seasonmlb')) {
	            this.seasonMLB = this.getQueryParameters().seasonmlb;
	        }
	        if(this.getQueryParameters().hasOwnProperty('seasonsc')) {
	            this.seasonSC = this.getQueryParameters().seasonsc;
	        }
	        if(this.getQueryParameters().hasOwnProperty('seasonwbc')) {
	            this.seasonWBC = this.getQueryParameters().seasonwbc;
	        }

	        if(type == 'lvbp') {
	        	return this.seasonLVBP;
	        }
	        if(type == 'mlb') {
	        	return this.seasonMLB;
	        }
	        if(type == 'sc') {
	        	return this.seasonSC;
	        }
	        if(type == 'wbc') {
	        	return this.seasonWBC;
	        }
	    };

	    Utility.setSeason = function(season) {
	        this.season = season;
	    };

	    Utility.getAgileDomain = function(type) {
	        if(type == 'dev') {
	            return this.agileDomainDev;
	        } else if(type == 'pro') {
	        	return this.agileDomainPro;
	        } else {
	        	return this.agileDomainPro;
	        }
	    };

	    Utility.setAgileDomain = function(type, domain) {
	        if(type == 'dev') {
	            this.agileDomainDev = domain;
	        } else if(type == 'pro') {
	        	this.agileDomainPro = domain;
	        } else {
	        	this.agileDomainPro = domain;
	        }
	    };

	    Utility.getServiceDomain = function(type) {
	        if(type == 'dev') {
	            return this.urlBaseDev;
	        } else if(type == 'pro') {
	        	return this.urlBasePro;
	        } else {
	        	return this.urlBasePro;
	        }
	    };

	    Utility.setServiceDomain = function(type, domain) {
	        if(type == 'dev') {
	            this.urlBaseDev = domain;
	        } else if(type == 'pro') {
	        	this.urlBasePro = domain;
	        } else {
	        	this.urlBasePro = domain;
	        }
	    };

	    Utility.getGameId = function() {
	        if(this.getQueryParameters().hasOwnProperty('game')) {
	            if(isNumeric(this.getQueryParameters().game)) {
	                this.gameId = this.getQueryParameters().game;
	            }
	        } else if(this.getQueryParameters().hasOwnProperty('gameId')) {
	            if(isNumeric(this.getQueryParameters().gameId)) {
	                this.gameId = this.getQueryParameters().gameId;
	            }
	        }
	        return this.gameId;
	    };

	    Utility.setGameId = function(gameId) {
	        this.gameId = gameId;
	    };

	    Utility.getTeamId = function() {
	        if(this.getQueryParameters().hasOwnProperty('team')) {
	            if(isNumeric(this.getQueryParameters().team)) {
	                this.teamId = this.getQueryParameters().team;
	            } else if(isString(this.getQueryParameters().team)) {
	                this.teamId = getTeamIdByName(this.getQueryParameters().team);
	            }
	        } else if(this.getQueryParameters().hasOwnProperty('teamId')) {
	            this.teamId = this.getQueryParameters().teamId;
	        } else if(this.getQueryParameters().hasOwnProperty('teamName')) {
	            this.teamId = getTeamIdByName(this.getQueryParameters().teamName);
	        } else if(this.getQueryParameters().hasOwnProperty('teamNameOrId')) {
	            if(isNumeric(this.getQueryParameters().teamNameOrId)) {
	                this.teamId = this.getQueryParameters().teamNameOrId;
	            } else if(isString(this.getQueryParameters().teamNameOrId)) {
	                this.teamId = getTeamIdByName(this.getQueryParameters().teamNameOrId);
	            }
	        }
	        return this.teamId;
	    };

	    Utility.setTeamId = function(teamId) {
	        this.teamId = teamId;
	    };

	    Utility.getPlayerId = function() {
	        return this.playerId;
	    };

	    Utility.setPlayerId = function(playerId) {
	        this.playerId = playerId;
	    };

	    Utility.getQueryParameters = function() {
	        return formatQueryParamsToObject(this.queryParameters);
	    };

	    Utility.setQueryParameters = function(queryParameters) {
	        this.queryParameters = queryParameters;
	    };

		Utility.getPlayer = function() {
	        return this.player;
	    };

	    Utility.setPlayer = function(player) {
	        this.player = player;
	    };

	    Utility.getTeamNameById = function(teamId) {
	    	if(teamId!=null && teamId!=undefined) {
	    		if(teamNamesById!=null && teamNamesById!=undefined) {
	    			if(teamNamesById.hasOwnProperty(teamId)) {
	    				return teamNamesById[teamId];
	    			}
	    		}
	    	}
	    	return 'not-name-team';
	    };

	    Utility.getTeamFullNameById = function(teamId) {
	    	if(teamId!=null && teamId!=undefined) {
	    		if(teamFullNamesById!=null && teamFullNamesById!=undefined) {
	    			if(teamFullNamesById.hasOwnProperty(teamId)) {
	    				return teamFullNamesById[teamId];
	    			}
	    		}
	    	}
	    	return 'not-name-team';
	    };

	    Utility.parseSpanishDate = function(dateStr, type) {
	        var result = '';
	        var dateReplaceMonthsName = '';
	        if(type == 'abbrev') {
	            dateReplaceMonthsName = this.replaceStringsFromArray(dateStr, this.monthsAbbrev);
	        } else if(type == 'fullname') {
	            dateReplaceMonthsName = this.replaceStringsFromArray(dateStr, this.monthsName);
	        } else {
	        	dateReplaceMonthsName = dateStr;
	        }
	        result = this.removeScondsFromTimeString(dateReplaceMonthsName);
	        return result;
	    };

	    Utility.removeScondsFromTimeString = function(date) {
	        var dateFormat = '';
	        if(date != undefined && date != '') {
	            var dateSeparated = date.split(':');
	            if(dateSeparated.length == 3) {
	                dateSeparated.forEach(function(dateS, index) {
	                    if(dateS != undefined) {
	                        if(index == 0) {
	                            dateFormat += dateS + ':'; 
	                        } else if(index == 1) {
	                            dateFormat += dateS; 
	                        } else if(index == 2) {
	                            dateFormat += ' ' + dateS.substr(3);
	                        }
	                    }
	                });
	            } else {
	                dateFormat = date;
	            }
	        }
	        return dateFormat;
	    };

	    Utility.replaceStringsFromArray = function(str, map) {
	        var strFormat = '';
	        var key;
	        if(str != undefined && str != '') {
	            strFormat = str;
	            if(map != undefined) {
	                for(key in map){
	                    strFormat = strFormat.replace(key, map[key]);
	                }
	            }
	        }
	        return strFormat;
	    };

	    Utility.getInningTopClass = function(inningTop) {
	    	var className = 'icons-chevron-down';
	    	if(inningTop != undefined) {
	    		if(parseInt(inningTop) == 0) {
	    			className = 'icons-chevron-down';
	    		} else if(parseInt(inningTop) == 1) {
	    			className = 'icons-chevron-up';
	    		}
	    	}
	    	return className;
	    };

	    Utility.getStadiumCity = function(city) {
	    	if(city!=null && city!=undefined) {
	    		city = city.replace('Estadio ', '');
	    		return city;
	    	}
	    	return 'NA';
	    };

	    Utility.getPitcherType = function(pitcher) {
	    	var result = '';
	    	if(pitcher!=null && pitcher!=undefined) {
	    		if(pitcher != '(N/D)') {
	    			result = pitcher;
	    		}
	    	}
	    	return result;
	    };

	    Utility.getDateFromString = function(date) {
	    	var dateFormat;
	    	if(date!=null && date!=undefined) {
	    		dateFormat = new Date(date);
	    	}
	    	return dateFormat;
	    };

		/*
	    **  Funciones Internas
	    */

		function replaceAll(str, find, replace) {
		  	return str.replace(new RegExp(find, 'g'), replace);
		}

		function getObjectFromString(str, separator) {
			var properties = null;
			var obj = {};

			if(str!=null && str!=undefined) {
				if(str.indexOf(separator)) {
					properties = str.split(separator);
				} else {
					properties = str.split(' ');
				}

				properties.forEach(function(property) {
					if(property!=null && property!=undefined && property!='') {
						var tup = null;
					    if(property.indexOf('=')) {
					    	tup = property.split('=');
					    } else if(property.indexOf(':')) {
					    	tup = property.split(':');
					    }
					    obj[tup[0]] = tup[1];
					}
				});
			}
			return obj;
		}

		function getQueryStringFromObject(obj) {
		   	var str = [];
		   	for(var p in obj) {
		       	if(obj.hasOwnProperty(p)) {
		           	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		       	}
		   	}
		   	return str.join("&");
		}

		function getMergeObject(obj1, obj2, filter) {
			obj1 = getObjectParseKeys(obj1, filter);
			obj2 = getObjectParseKeys(obj2, filter);

		    for(var key in obj2) {
		        if(obj1.hasOwnProperty(key) && typeof obj1[key] !== "undefined") {
		        	obj1[key] = obj2[key];
		        } else {
		        	obj1[key] = obj2[key];
		        }
		    }
		    return obj1;
		}

		function getObjectParseKeys(obj, filter) {
			if(filter!=null && filter!=undefined) {
		    	for(var key in obj) {
		    		if(filter.hasOwnProperty(key)) {
		    			if(filter[key] != key) {
		    				obj[filter[key]] = obj[key];
		    				delete obj[key];
		    			}
		    		}
		    	}
		    }
		    return obj;
		}

		function formatQueryParamsToObject(query) {
	        if(query!=null) {
	            query = query.split('+').join(' ');
	            var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

	            while (tokens = re.exec(query)) {
	                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	            }
	            return params;
	        } else {
	            return '';
	        }
	    }

	    function getTeamIdByName(teamName) {
	        return teamIdsByName[teamName];
	    }

	    function isNumeric(value) {
	        return /^\d+$/.test(value);
	    }

	    function isString(value) {
	        if (typeof value === 'string' || value instanceof String) {
	            return true;
	        } else {
	            return false;
	        }
	    }

        return Utility;
    }

	if(typeof(Utility) === 'undefined') {
        window.Utility = init();
    } else {
        console.log("Utility already defined.");
    }
	
})(window);