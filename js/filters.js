angular.module('saharanFilters',[]).filter('first_name',function(){
	return function(input){
		var toreturn='';
		if(input==undefined){
			return 'You';
		}
		if(input.indexOf(' ')!=-1){
			return input.slice(0,input.indexOf(' '));
		}
		return input||'You';
	}
})