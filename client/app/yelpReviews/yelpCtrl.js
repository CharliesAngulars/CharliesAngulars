angular.module('parksAndEx.yelpReviews',[])

.controller('displayController', function($scope, getParks) {
  angular.extend($scope, getParks);
})

.controller('searchController', function($scope, getParks) {
  angular.extend($scope, getParks);
})

.factory('getParks', function($http) {
  var parks = [];
  var formatPhone = function(phone) {
    return phone = "("+ phone.slice(0,3) + ") " + phone.slice(3, 6) + "-" + phone.slice(6, 10);
  };

  var postToServer = function(data) {
    parks.length = 0;
    data.forEach(function(term){
      if (term) {
        $http.post('/', [term])
        .then(function(response) {
          response.data.phone = formatPhone(response.data.phone);
          parks.push(response.data);
          console.log(data);
          console.log(response.data);
        }
        ,function() {
          console.log("fail")
        })
      }
    });
  };

  return {
    postToServer: postToServer,
    parks:parks,
    formatPhone:formatPhone
  };
});
