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