scroll.controller('homeCtrl', ['$scope','$routeParams', function($scope,$routeParams){
	$scope.name="Amit Saharan";
}]);


scroll.controller('mainCtrl', function($scope,$rootScope,loginService,$mdDialog,$mdToast){
	$scope.username='amitkum';
	$scope.loggedIn=false;
	$scope.login=function(){
		loginService.login()
	}
	$scope.logout=function(){
		loginService.logout();
		$scope.userinfo=[];
		$scope.loggedIn=false;
	}
	init();
	function init(){
		loginService.userinfo().success(function(reply){
			if(reply.login!=true){
				return;
			}
			info=reply.info;
			$scope.loggedIn=true;
			$scope.userinfo=info;
		});
	}

	function SignUpDialogController($scope, $mdDialog,$rootScope) {
	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };
	  $scope.signup=function(){
	  	loginService.signup($scope.user);
	  }
	  $scope.startRecovery=function(){
	  	$rootScope.$emit('startRecovery');
	  }
	  $scope.startLogin=function(){
	  	$rootScope.$emit('startLogin');
	  }
	  $rootScope.$on('signupsuccess',function(event,data){
	  	$mdDialog.cancel();
	  	$mdToast.show(
	  	      $mdToast.simple()
	  	        .content('Registred successfully.Password has been sent to your email!')
	  	        .position('bottom left')
	  	        .hideDelay(4000)
	  	    );
	  });
	}
	function LoginDialogController($scope, $mdDialog,$rootScope) {
		$scope.login=function(){
			loginService.login($scope.user);
		}

		$scope.cancel = function() {
		  $mdDialog.cancel();
		};
		$scope.startRecovery=function(){
			$rootScope.$emit('startRecovery');
		}
		$scope.startSignup=function(){
			$rootScope.$emit('startSignup');
		}
	}
	function RecoveryDialogController($scope, $mdDialog,$rootScope) {
	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };
	  $scope.startLogin=function(){
	  	$rootScope.$emit('startLogin');
	  }
	  $scope.startSignup=function(){
	  	$rootScope.$emit('startSignup');
	  }
	}

	$scope.recover=function(){
		$mdDialog.show({
				      controller: RecoveryDialogController,
				      templateUrl: 'partials/templates/recovery.html',
				      parent: angular.element(document.body)
				    });
	}

	$scope.login=function(ev){
		$mdDialog.show({
				      controller: LoginDialogController,
				      templateUrl: 'partials/templates/login.html',
				      parent: angular.element(document.body),
				      targetEvent: ev,
				    });
	}
	$scope.signup=function(ev){
		$mdDialog.show({
		      controller: SignUpDialogController,
		      templateUrl: 'partials/templates/signup.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		    });
	}

	$rootScope.$on('startLogin',function(){
		$scope.login();
	});
	$rootScope.$on('startSignup',function(){
		$scope.signup();
	});
	$rootScope.$on('startRecovery',function(){
		$scope.recover();
	});
	$rootScope.$on('loginsuccess',function(event,reply){
		if(reply.login==true){
			$mdDialog.cancel();
			$scope.loggedIn=true;
		}
	});
});
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