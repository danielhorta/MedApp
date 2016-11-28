// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
    var app = angular.module('starter', ['ionic', 'angularMoment'])

    app.controller('RedditCtrl', function($scope, $http){   
        $scope.posts = [];
        $http.get("https://www.reddit.com/r/pics/new.json?sort=new&limit=100")
            .success(function(response) {
                $scope.posts = response.data.children;
                console.log($scope.posts);
        });
        
        $scope.doRefresh= function(){            
            var params2 = {'before':$scope.posts[0].data.name};
            
            $http.get('https://www.reddit.com/r/pics/new.json?',{params:params2})
            .success(function(posts){
                var newPosts=[];
               angular.forEach(posts.data.children, function(post){
                  newPosts.push(post); 
               }); 
                $scope.posts= newPosts.concat($scope.posts);
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
        
        $scope.doInfinite= function(){
            var params2 = {};
            if($scope.posts.length > 0){
                params2['after']= $scope.posts[$scope.posts.length -1].data.name;
                
            }
            $http.get('https://www.reddit.com/r/pics/new.json?',{params:params2})
            .success(function(posts){
               angular.forEach(posts.data.children, function(post){
                  $scope.posts.push(post); 
               }); 
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }
        
        $scope.openLink = function(url){
            window.open(url, '_blank');
        }
    });
    
    app.run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
         
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

         
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.cordova && window.cordova.inAppBrowser){
            window.open = window.cordova.InAppBrowser.open;
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
}());
