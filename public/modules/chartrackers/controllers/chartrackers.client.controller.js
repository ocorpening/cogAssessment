'use strict';

// Chartrackers controller
angular.module('chartrackers').controller('ChartrackersController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Chartrackers',
	function($scope, $http, $stateParams, $location, Authentication, Chartrackers ) {
		$scope.authentication = Authentication;

        // colors array - in a form most easily consumed by the 'createSpan' routine
        var colors = ["'redShape'", "'blueShape'", "'yellowShape'"];
        var currentColorIndex = 0;

        /**
         * Return a string representation of an HTML span with the next color in sequence from the colors array.
         * @returns {string} - a string representation of an HTML span with the class set to the next color
         */
        function createSpan()
        {
            // form a string like "'redShape'", "'blueShape'", "'yellowShape'"
            var className = colors[currentColorIndex++];
            if (currentColorIndex === colors.length)
            {
                currentColorIndex = 0;
            }
            return "<span class=" + className + ">M</span>";
        }

        $scope.appendShape = function appendShape()
        {
            angular.element(".textEntry").append(createSpan());
        }

        $scope.putText = function putText()
        {
            console.log("In putText");
//            $http.put('charTrackers', { input: this.theInput }).success(function()
//            {
//                // store char count in mongo
//                console.log("in MainCtrl.putText()");
//            });
            $http({
                url: 'charTrackers/1',
                dataType: 'json',
                method: 'PUT',
                data: { input: this.theInput },
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(function(response){
                    console.log("in MainCtrl.putText()");
                    $scope.response = response;
            }).error(function(error){
                    $scope.error = error;
            });
        }

        // Create new Chartracker
		$scope.create = function() {
			// Create new Chartracker object
			var chartracker = new Chartrackers ({
				name: this.name
			});

			// Redirect after save
			chartracker.$save(function(response) {
				$location.path('chartrackers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Chartracker
		$scope.remove = function( chartracker ) {
			if ( chartracker ) { chartracker.$remove();

				for (var i in $scope.chartrackers ) {
					if ($scope.chartrackers [i] === chartracker ) {
						$scope.chartrackers.splice(i, 1);
					}
				}
			} else {
				$scope.chartracker.$remove(function() {
					$location.path('chartrackers');
				});
			}
		};

		// Update existing Chartracker
		$scope.update = function() {
			var chartracker = $scope.chartracker ;

			chartracker.$update(function() {
				$location.path('chartrackers/' + chartracker._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Chartrackers
		$scope.find = function() {
			$scope.chartrackers = Chartrackers.query();
		};

		// Find existing Chartracker
		$scope.findOne = function() {
			$scope.chartracker = Chartrackers.get({ 
				chartrackerId: $stateParams.chartrackerId
			});
		};
	}
]);