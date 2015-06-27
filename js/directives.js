scroll.directive('intro', function(){
    return {
        restrict: 'E',
        scope: {
        	current:'@'
        },
        transclude: false,
        templateUrl: 'partials/templates/intro.html',
        controller: function($scope) {
        }
    };
});