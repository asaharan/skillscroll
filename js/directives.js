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

scroll.directive('saharanDropdown',function($timeout){

  function open(element){
    $(element).removeClass('display-none');
    $timeout(function(){
      $(element).addClass('open');
    },50);
  }
  function close(element){
    $(element).removeClass('open');
    $timeout(function(){
      $(element).addClass('display-none');
    },200);
  }

  function link(scope,element,attrs){
    $('body').click(function(event){
      // console.log(event,element);
      // console.log($(event.target).parent('.saharan-dropdown'));
      if($(event.target).parents('.saharan-dropdown').length>0){
        if($(event.target).hasClass('set')){
          if($(element).hasClass('open')){
            close(element)
          }else{
            open(element);
          }
        }else{
           // $(element).removeClass('open')
           close(element);
        }
        return;
      }
      // $(element).removeClass('open')
      close(element);
    })
  }
  return{
    restrict:'C',
    link:link
  }
})