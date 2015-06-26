scroll.factory('searchService',function($http){
	var amittopics=[{topic:'php',level:1},{topic:'Robotics',level:2}];
	return{
		find:function(q){
			var promise=$http.post('Find',{q:q}).success(function(data){
				return data;
			});
			people=[
					{name:'Ranju Suthar',topics:amittopics},
					{name:'saharan',topics:amittopics},
					{name:'saharan',topics:amittopics},
					{name:'amit',topics:amittopics},
					{name:'amit',topics:amittopics}
				];
			return promise;
		}
	}
})
scroll.factory('loginService',function($http,$rootScope,$mdToast){
	var toreturn=[];
	toreturn.login=function(info){
		$http.post('user/login',info).success(function(reply){
			$rootScope.$emit('loginsuccess',reply);
		});
	}
	toreturn.userinfo=function(){
		return $http.post('user/info');
	}
	toreturn.signup=function(data){
		$http.post('user/signup',data).success(function(reply){
			if(reply.status==true){
				$rootScope.$emit('signupsuccess',data);
			}else{
				$mdToast.show(
				      $mdToast.simple()
				        .content('Looks like there is some error!')
				        .position('bottom left')
				        .hideDelay(3000)
				);
			}
		});
	}
	toreturn.logout=function(){
		$http.post('user/logout');
	}
	return toreturn;
})