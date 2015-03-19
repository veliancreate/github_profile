githubUserSearch.controller('GitUserSearchController', function($scope, $resource, $http) {
  var searchResource = $resource('https://api.github.com/search/users');
  $scope.doSearch = function (){
    $scope.searchResult = searchResource.get({
      access_params: "11dbfa66739fa0c7c70fb19983eaa1408de60b46", 
      q: $scope.searchTerm,
    }, function(){
      angular.forEach($scope.searchResult.items, function(v){
        var name = 'https://api.github.com/users/' + v.login;
        $http.get(name).success(function(data){
          $scope.individualData = data;
          v.followers = $scope.individualData.followers;
          v.public_repos = $scope.individualData.public_repos;     
        });        
      });
    });
  };

});
