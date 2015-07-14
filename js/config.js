/**
* scroll Module
*
* Description
*/
var scroll=angular.module('scroll', ['ngRoute','ngAria','ngAnimate','ngMaterial','saharanFilters']);


scroll.config(['$locationProvider','$httpProvider', function($locationProvider,$httpProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	
	 /**
	  * The workhorse; converts an object to x-www-form-urlencoded serialization.
	  * @param {Object} obj
	  * @return {String}
	  */ 
	  var param = function(obj) {
	  	var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

	  	for(name in obj) {
	  		value = obj[name];

	  		if(value instanceof Array) {
	  			for(i=0; i<value.length; ++i) {
	  				subValue = value[i];
	  				fullSubName = name + '[' + i + ']';
	  				innerObj = {};
	  				innerObj[fullSubName] = subValue;
	  				query += param(innerObj) + '&';
	  			}
	  		}
	  		else if(value instanceof Object) {
	  			for(subName in value) {
	  				subValue = value[subName];
	  				fullSubName = name + '[' + subName + ']';
	  				innerObj = {};
	  				innerObj[fullSubName] = subValue;
	  				query += param(innerObj) + '&';
	  			}
	  		}
	  		else if(value !== undefined && value !== null)
	  			query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	  	}

	  	return query.length ? query.substr(0, query.length - 1) : query;
	  };

	 // Override $http service's default transformRequest
	 $httpProvider.defaults.transformRequest = [function(data) {
	 	return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	 }];
	}]);



scroll.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'partials/home.html',
		controller: 'homeCtrl'
	}).
	when('/search',{
		templateUrl:'partials/search.html',
		controller:'searchCtrl'
	}).
	when('/users/:username/',{
		templateUrl:'partials/users.html',
		controller:'userCtrl'
	}).
	when('/settings/:type',{
		templateUrl:'partials/settings.html',
		controller:'settingsCtrl'
	}).
	when('/topics/:topic/:topic_id',{
		templateUrl:'partials/point.html',
		controller:'pointCtrl'
	}).
	when('/settings',{
		redirectTo:'/settings/profile'
	}).
	when('/about',{
		templateUrl:'partials/about.html'
	}).
	otherwise({
        	//redirectTo: '/'
        	template:'<div>You are lost in space</div>'
        });
}]);