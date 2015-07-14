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

scroll.directive('saharanDropdown',function(){
  function link(scope,element,attrs){
    $('body').click(function(event){
      // console.log(event,element);
      // console.log($(event.target).parent('.saharan-dropdown'));
      if($(event.target).parents('.saharan-dropdown').length>0){
        if($(event.target).hasClass('set')){
          if($(element).hasClass('open')){
            $(element).removeClass('open')
          }else{
            $(element).addClass('open');
          }
        }else{
           $(element).removeClass('open')
        }
        return;
      }
      $(element).removeClass('open')
    })
  }
  return{
    restrict:'C',
    link:link
  }
})