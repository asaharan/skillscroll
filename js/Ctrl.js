scroll.controller('homeCtrl', function($scope,$routeParams,searchService){
	searchService.hottopics().success(function(reply){
		$scope.hottopics=reply.topics;
	});
	searchService.mayknow().success(function(reply){
		$scope.mayknow=reply.people;
	});
});


scroll.controller('mainCtrl', function($scope,$rootScope,loginService,$mdDialog,$mdToast){
	$scope.getLevelTag=function(id){
		var level=['Beginner','Learning','Proficient','Advanced','Expert'];
		console.log(level[id-1],id);
		if(id>0&&id<6){
			return level[id-1];
		}
		return 'Yet not set';
	}
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
		updateuserinfo();
	}
	function updateuserinfo(){
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
			$scope.userinfo=reply
			updateuserinfo();
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
scroll.controller('settingsCtrl', function($scope,$location,loginService,updateService,$routeParams,$mdToast){
	init();
	$scope.settings=[
		{'d':'Profile','l':'profile'},
		{'d':'Topics','l':'topics'},
		{'d':'Account settings','l':'admin'},
		{'d':'Security','l':'security'}
		];
	function init(){
		$scope.type=$routeParams.type;
		var type=$scope.type;
		loginService.isloggedin().success(function(reply){
			if(!reply.login){
				$location.url('/');
				return;
			}
			if(type=='profile'){
				fetchinfo();
			}else{
				if(type=='topics'){
					fetchtopics();
				}
			}
		})
	}
	$scope.passwordCtrl=function($scope,updateService){
		$scope.user=[];
		$scope.updatePassword=function(){
			if($scope.user.new==$scope.user.confirm){
				updateService.updatePassword($scope.user).success(function(reply){

				});
			}else{
				$scope.error="Password doesn't match the confirmation";
			}
		}
	}
	$scope.newTopicCtrl=function($scope,updateService,$timeout){
		$scope.addTopic=function(){
			// console.log($scope.topic);
			updateService.addTopic($scope.topic).success(function(reply){
				// console.log(reply);
			});
		}
	}
	$scope.topicCtrl=function($scope,updateService){
		$scope.editing=false;
		var f=0;
		$scope.delete=function(){
			updateService.deleteTopic($scope.topic.id).success(function(reply){
				console.log(reply);
			});
		}
		$scope.edit=function(){
			if(f==0){
				// $scope.new=$scope.topic;
				$scope.new=[];
				angular.copy($scope.topic,$scope.new);
				f++;
			}
			$scope.editing=!$scope.editing;
		}
		$scope.save=function(){
			// console.log($scope.new);
			updateService.updateTopic($scope.new).success(function(reply){
				if(reply.status){
					$scope.editing=false;
					angular.copy($scope.new,$scope.topic);
				}
				fetchtopics();
			});
		}
	}
	function fetchinfo(){
		loginService.userinfo().success(function(reply){
			$scope.user=reply.info;
		});
	}
	function fetchtopics(){
		loginService.usertopics().success(function(reply){
			$scope.topics=reply.topics;
		});
	}
	$scope.updateProfile=function(){
		updateService.profile($scope.user).success(function(reply){
			if(reply.status){
				$mdToast.show(
					$mdToast.simple()
					.content('Successfully updated your profile!')
					.position('bottom left')
					.hideDelay(4000)
					);
			}
		});
	}
});