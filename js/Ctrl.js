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
	});
}]);
scroll.controller('pointCtrl', function($scope,$routeParams,searchService){
	$scope.id=$routeParams.topic_id;
	$scope.topic=$routeParams.topic;
	$scope.description='';//'Description not available';
	$scope.found=true;

	$scope.relatedtopics=[
		{'topic':'MySQL','id':1},
		{'topic':'angular','id':5}
	];

	$scope.categories=[
		{'name':'hot','dis':'Hot topics'},
		{'name':'relate','dis':'Related topics'}
	];

	searchService.havingTopic($scope.id).success(function(reply){
		if(reply.status){
			$scope.people=reply.people;
			$scope.topic=reply.topic;
		}else{
			$scope.found=false;
		}
		updatehottopics();
	});

	function updatehottopics(){
		searchService.hottopics().success(function(reply){
			$scope.hottopics=reply.topics;	
		})
	}
	searchService.relatedtopics($scope.id).success(function(reply){
		if(reply.status){
			$scope.relatedtopics=reply.topics;
		}
	})
})
scroll.controller('userCtrl', function($scope,$routeParams,searchService){
	$scope.username=$routeParams.username;
	$scope.name=$routeParams.username;
	searchService.userinfo($scope.username).success(function(reply){
		if(reply.status){
			$scope.info=reply.info;

			if(!$scope.info.facebook==''){
				if(!isUrl($scope.info.facebook)){
					$scope.info.facebook='https://facebook.com/'+$scope.info.facebook;
				}
			}
			$scope.name=reply.info.name;
			if(reply.topic!=false){
				$scope.topics=reply.topics;
			}
		}
	});
	function isUrl(s) {
	   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	   return regexp.test(s);
	}
});
scroll.controller('settingsCtrl', function($scope,$location,loginService,updateService,$routeParams,$mdToast){
	init();
	$scope.settings=[
		{'d':'Profile','l':'profile'},
		{'d':'Topics','l':'topics'},
		{'d':'Account settings','l':'admin'},
		//{'d':'Security','l':'security'}
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
			updateService.addTopic($scope.topic).success(function(reply){
			});
		}
	}
	$scope.topicCtrl=function($scope,updateService){
		$scope.editing=false;
		var f=0;
		$scope.delete=function(){
			updateService.deleteTopic($scope.topic.id).success(function(reply){
				
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