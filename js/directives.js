scroll.directive('profile', function(){
    return {
        restrict: 'E',
        scope: {
        	current:'@'
        },
        transclude: false,
        templateUrl: 'partials/templates/profile.html',
        controller: function($scope) {
        }
    };
});