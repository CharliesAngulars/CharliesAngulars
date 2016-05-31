angular.module('parksAndEx.campgrounds', [])

.controller('campgroundsController', function ($scope) {
	var url = "http://api.amp.active.com/camping/campgrounds/?pname=Angel%20Island%20State%20Park&api_key=dr4texk5yrrhvfykvcbg5zza";
	var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + '&format=json&callback=?';
   
	$.ajax({
	    type: 'GET',
	    url: yql,
	    async: false,
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) {
		    console.log(data);
			var id = null;
		    $scope.$on('initial-generate', function(event, args) {
			    for (var i = 0; i < data.query.results.json.json.length; i++) {
					if (data.query.results.json.json[i].name.toUpperCase() === args.toUpperCase()) {
					console.log ("ID: ", data.query.results.json.json[i].id);
					id = data.query.results.json.json[i].id
					}
			    }
				if (id !==null){
				ajaxCallForSpecificPark(id);
				}
				else {
				$scope.campgroundinfo = null;
				$scope.$apply();
				}
		    });
		    $scope.$on('switch-park', function(event, args) {
				console.log(args);
				id = null;
				for (var i = 0; i < data.query.results.json.json.length; i++) {
					//console.log(data.query.results.json.json[i].name.toUpperCase(), args.name.toUpperCase());
					if (data.query.results.json.json[i].name.toUpperCase() === args.name.toUpperCase()) {
					console.log ("ID: ", data.query.results.json.json[i].id);
					id = data.query.results.json.json[i].id
					}
			    }
				if (id !==null){
				ajaxCallForSpecificPark(id);
				}
				else {
				$scope.campgroundinfo = null;
				$scope.$apply();
				}
		    });

	    },
	    failure: function(err) {
		    console.log("ERR", err);
	    }
	});
	
	
	function ajaxCallForSpecificPark(id) {
		var url = "https://api.transitandtrails.org/api/v1/campgrounds/" + id + "/attributes?key=1c78a948e0a02614d9caed392ee1388fc15e5eadc005ca69f7c451e80c02e1a0";
	var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from json where url="' + url + '"') + '&format=json&callback=?';
   
	$.ajax({
	    type: 'GET',
	    url: yql,
	    async: false,
	    crossDomain: true,
	    dataType: 'json',
	    success: function(data) {
		    console.log(data);
			var amenitiesArray = [];
			for (var i = 0; i < data.query.results.json.json.length; i++) {
				if (data.query.results.json.json[i].category_name === "Amenities") {
					amenitiesArray.push(data.query.results.json.json[i]);
				}
			}
			$scope.campgroundinfo = amenitiesArray;
			$scope.$apply();
	    },
	    failure: function(err) {
		    console.log("ERR", err);
	    }
	});
	
	
	}

});