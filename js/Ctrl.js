scroll.controller('homeCtrl', ['$scope','$routeParams', function($scope,$routeParams){
	$scope.name="Amit Saharan";
}]);


scroll.controller('mainCtrl', ['$scope', function($scope){
	$scope.username='amitkum';
	$scope.loggedIn=false;
}]);
scroll.controller('searchCtrl', ['$scope','searchService', function($scope,searchService){
	$scope.name='saharan';
	var amittopics=[{topic:'php',level:1},{topic:'Robotics',level:2}];
	searchService.find('a').success(function(data){
		$scope.people=data;
		console.log(data);
	});
}]);
scroll.controller('userCtrl', ['$scope', function($scope){
	$scope.name='userCtrl'
}]);