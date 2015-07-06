scroll.factory('searchService',function($http){
	var amittopics=[{topic:'php',level:1},{topic:'Robotics',level:2}];

	var toreturn=[];
	toreturn.find=function(q){
		var promise=$http.post('find',{q:q});
		return promise;
	}
	toreturn.hottopics=function(){
		return promise=$http.get('find/hot');
	}
	toreturn.mayknow=function(){
		return $http.get('find/mayknow');
	}
	toreturn.havingTopic=function(id){
		return $http.post('find/havingTopic',{id:id});
	}
	toreturn.relatedtopics=function(id){
		return $http.post('find/relatedtopics',{id:id});
	}
	toreturn.userinfo=function(username){
		return $http.post('find/userinfo',{username:username});
	}
	return toreturn;
})
scroll.factory('loginService',function($http,$rootScope,$mdToast,$route){
	var toreturn=[];
	toreturn.login=function(info){
		$http.post('user/login',info).success(function(reply){
			$rootScope.$emit('loginsuccess',reply);
		});
	}
	toreturn.userinfo=function(){
		return $http.post('user/info');
	}
	toreturn.usertopics=function(){
		return $http.post('user/topics');
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
	toreturn.isloggedin=function(){
		return $http.get('user/isloggedin');
	}
	toreturn.logout=function(){
		$http.post('user/logout').success(function(){
			$route.reload();
		});
	}
	return toreturn;
})
scroll.factory('updateService',function($http){
	var toreturn=[];
	toreturn.profile=function(data){
		return $http.post('update/profile',data);
	}
	toreturn.deleteTopic=function(id){
		return $http.post('update/deleteTopic',{id:id});
	}
	toreturn.addTopic=function(data){
		return $http.post('update/addTopic',data);
	}
	toreturn.updateTopic=function(data){
		return $http.post('update/updateTopic',data);
	}
	toreturn.updatePassword=function(data){
		return $http.post('update/updatePassword',data);
	}
	return toreturn;
})