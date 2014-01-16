/*!
** gTlds Visualization App
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

"use strict";

/**
*  Module
*
* Description
*/
var App = angular.module("gtld", []);

App.controller("DomainCtrl",function  ($scope,$http) {

	$scope.init = function  () {
		$http.get("database.json").success(function(response){
			$scope.domains = response;
		}).error(function(status, response){
			alert("Error "+status);
		});

		$scope.currentPage = 0;
		$scope.pageSize = 20;
		$scope.reverse = false;

		$scope.selects = ["ApplicantSupport","EEComplete","IEComplete","InEE","InIE","NotApproved","Withdrawn",""]

		$http.get("loc.json").success(function  (response) {
			$scope.locs = response;
		});

	};

});

/* Filter For Search */

App.filter("startFrom", function () {
	return function (input, start, pageSize) {
		start = +start; //parse to int
		pageSize = +pageSize;
		if (angular.isArray(input)) {
			while (start > input.length) {
				start -= pageSize;
			}
			if (start < 0) {
				start = 0;
			}
			return input.slice(start);
		};
	};
});