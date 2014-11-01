'use strict';

// Chartrackers controller
angular.module('chartrackers').controller('ChartrackersController', ['$scope', '$http', '$document', '$stateParams', '$location', 'Authentication', 'Chartrackers',
    function ($scope, $http, $document, $stateParams, $location, Authentication, Chartrackers)
    {
        // restrict input to characters:
        $document.ready(function()
        {
            $('.inputBox').keypress(function(key)
            {
                if ((key.charCode != 13) && (key.charCode < 65 || key.charCode > 90) && (key.charCode < 97 || key.charCode > 122)) return false;
            });
        });

        $scope.authentication = Authentication;

        // colors array - in a form most easily consumed by the 'createSpan' routine
        var colors = ["'redShape'", "'blueShape'", "'yellowShape'"];
        // track current color so we can cycle thru and re-use them.
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

        /**
         * Append colored shape on line after text entry field
         */
        $scope.appendShape = function appendShape(key)
        {
            if (!(key.keyCode === 13) || (key.keyCode < 65 || key.keyCode > 90)&&(key.keyCode < 97 || key.keyCode > 122))
                angular.element(".textEntry").append(createSpan());
        };

        /**
         * Call the Put method on the server, this will send the input string to the update method.
         */
        $scope.putText = function putText()
        {
            $http({
                url: 'charTrackers/1',
                dataType: 'json',
                method: 'PUT',
                data: { input: this.theInput },
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(function (response)
                {
                    console.log("in MainCtrl.putText()");
                    $scope.response = response;
                }).error(function (error)
                {
                    $scope.error = error;
                });
        };

        /**
         * Get the array of charTrackers
         */
        $scope.getCurrentCharCounts = function getCurrentCharCounts()
        {
            $http({
                url: 'charTrackers',
                dataType: 'json',
                method: 'GET',
                data: { input: 'some data so angular won\'t remove my headers' },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .success(function (response)
            {
                var table = "<table class='letterCounts table table-striped .table-bordered .table-responsive'><tbody>";
                response.forEach(function(element, index, array)
                {
                    table += "<tr><td>" + element.letter + "</td>" + "<td>" + element.count + "</td></tr>";
                });
                table += "</tbody></table>";
                var tableElement = angular.element(".letterCounts");
                if (tableElement)
                {
                    tableElement.remove();
                }
                angular.element(".putTable").append(table);
                $scope.response = response;
            })
            .error(function (error)
            {
                $scope.error = error;
            });
        }

        // Create new Chartracker
        $scope.create = function ()
        {
            // Create new Chartracker object
            var chartracker = new Chartrackers({
                name: this.name
            });

            // Redirect after save
            chartracker.$save(function (response)
            {
                $location.path('chartrackers/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse)
            {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Chartracker
        $scope.remove = function (chartracker)
        {
            if (chartracker)
            {
                chartracker.$remove();

                for (var i in $scope.chartrackers)
                {
                    if ($scope.chartrackers [i] === chartracker)
                    {
                        $scope.chartrackers.splice(i, 1);
                    }
                }
            }
            else
            {
                $scope.chartracker.$remove(function ()
                {
                    $location.path('chartrackers');
                });
            }
        };

        // Update existing Chartracker
        $scope.update = function ()
        {
            var chartracker = $scope.chartracker;

            chartracker.$update(function ()
            {
                $location.path('chartrackers/' + chartracker._id);
            }, function (errorResponse)
            {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Chartrackers
        $scope.find = function ()
        {
            $scope.chartrackers = Chartrackers.query();
        };

        // Find existing Chartracker
        $scope.findOne = function ()
        {
            $scope.chartracker = Chartrackers.get({
                chartrackerId: $stateParams.chartrackerId
            });
        };
    }
]);