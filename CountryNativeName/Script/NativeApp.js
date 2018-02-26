var app = angular.module("NativeApp", []);

app.controller('NativeCtrl', function ($scope, $window, $http, $filter) {

	$scope.countryList = [];
	$scope.sbCountry = "";
	$scope.countryLabel = false;
	$scope.foundCountry = false;
	$scope.countries = false;
	$scope.dymCountry = "";
	$scope.img_url = "";
	$scope.nativeName = "";
	$scope.englishName = "";
	$scope.pickableCountries = [];

	$http.get("https://restcountries.eu/rest/v2/all")
		.then(function (response) {
			console.log('func')
			console.log(response)

			for (var i = 0; i < response.data.length; i++) {
				var fullName = response.data[i].name;
				var nativeName = response.data[i].nativeName;
				var flag = response.data[i].flag;

				var obj = { fullname: fullName, nativeName: nativeName, flag: flag };
				$scope.countryList.push(obj)
			}
			console.log($scope.countryList)
		})

	$scope.search = function () {
		console.log($scope.sbCountry)
		$scope.countryLabel = false;
		$scope.foundCountry = false;
		$scope.results = false;
		$scope.countries = false;

		var searchedItem = $filter('filter')($scope.countryList, { 'fullname': $scope.sbCountry })
		var final = searchedItem[0];
		if (searchedItem.length > 1) {
			$scope.pickableCountries = searchedItem;
			$scope.dymCountry = searchedItem[0].fullname;
			$scope.countryLabel = true;
		}
		else if (searchedItem.length == 0) {
			$scope.results = true;
		}
		else {
			console.log(final)
			responsiveVoice.speak(final.nativeName);
			$scope.foundCountry = true;
			$scope.img_url = final.flag;
			$scope.nativeName = final.nativeName;
			$scope.englishName = final.fullname;
			$scope.sbCountry = "";
		}

	}

	$scope.dymCountryFunc = function () {
		console.log('Func')
		$scope.sbCountry = $scope.dymCountry;
		$scope.search();
	}

	$scope.countryPicked = function (country) {
		$scope.sbCountry = country.fullname;
		$scope.search();
	}

	var input = document.getElementById("sbCountry");
	input.addEventListener("keyup", function (event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("btnSearch").click();
		}
	});
});