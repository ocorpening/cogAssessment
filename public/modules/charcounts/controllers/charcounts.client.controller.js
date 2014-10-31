'use strict';

// Charcounts controller
angular.module('charcounts').controller('CharcountsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Charcounts',
	function($scope, $stateParams, $location, Authentication, Charcounts ) {
		$scope.authentication = Authentication;

		// Create new Charcount
		$scope.create = function() {
			// Create new Charcount object
			var charcount = new Charcounts ({
				name: this.name
			});

			// Redirect after save
			charcount.$save(function(response) {
				$location.path('charcounts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Charcount
		$scope.remove = function( charcount ) {
			if ( charcount ) { charcount.$remove();

				for (var i in $scope.charcounts ) {
					if ($scope.charcounts [i] === charcount ) {
						$scope.charcounts.splice(i, 1);
					}
				}
			} else {
				$scope.charcount.$remove(function() {
					$location.path('charcounts');
				});
			}
		};

		// Update existing Charcount
		$scope.update = function() {
			var charcount = $scope.charcount ;

			charcount.$update(function() {
				$location.path('charcounts/' + charcount._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Charcounts
		$scope.find = function() {
			$scope.charcounts = Charcounts.query();
		};

		// Find existing Charcount
		$scope.findOne = function() {
			$scope.charcount = Charcounts.get({ 
				charcountId: $stateParams.charcountId
			});
		};
	}
]);