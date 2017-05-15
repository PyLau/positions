positionApp.service('PositionUtility', function() {

    this.getStatsTitleClass = function(titleMobile) {
        var className = '';
        if(titleMobile != undefined) {
            if(titleMobile) {
                className = '';
            }
        } else {
            className = 'desktop-positions';
        }
        return className;
    };
        this.getTeamNameById = function(teamId) {
            if(teamId!=null && teamId!=undefined) {
                if(teamNamesById!=null && teamNamesById!=undefined) {
                    if(teamNamesById.hasOwnProperty(teamId)) {
                        return teamNamesById[teamId];
                    }
                }
            }
            return 'not-name-team';
        };
    this.getRowClass = function(index) {
        var className = '';
        if(index != undefined) {
            if(index%2 == 0) {
                className = 'odd';
            }
        } else {
            className = 'even';
        }
        return className;
    };

    this.initPositionJQuery = function() {
        angular.element(document).ready(function() {
            $('.tabs').tabs();
        });
    };
});