'use strict';

(function() {
	// Chartrackers Controller Spec
	describe('Chartrackers Controller Tests', function() {
		// Initialize global variables
		var ChartrackersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Chartrackers controller.
			ChartrackersController = $controller('ChartrackersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Chartracker object fetched from XHR', inject(function(Chartrackers) {
			// Create sample Chartracker using the Chartrackers service
			var sampleChartracker = new Chartrackers({
				name: 'New Chartracker'
			});

			// Create a sample Chartrackers array that includes the new Chartracker
			var sampleChartrackers = [sampleChartracker];

			// Set GET response
			$httpBackend.expectGET('chartrackers').respond(sampleChartrackers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.chartrackers).toEqualData(sampleChartrackers);
		}));

		it('$scope.findOne() should create an array with one Chartracker object fetched from XHR using a chartrackerId URL parameter', inject(function(Chartrackers) {
			// Define a sample Chartracker object
			var sampleChartracker = new Chartrackers({
				name: 'New Chartracker'
			});

			// Set the URL parameter
			$stateParams.chartrackerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/chartrackers\/([0-9a-fA-F]{24})$/).respond(sampleChartracker);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.chartracker).toEqualData(sampleChartracker);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Chartrackers) {
			// Create a sample Chartracker object
			var sampleChartrackerPostData = new Chartrackers({
				name: 'New Chartracker'
			});

			// Create a sample Chartracker response
			var sampleChartrackerResponse = new Chartrackers({
				_id: '525cf20451979dea2c000001',
				name: 'New Chartracker'
			});

			// Fixture mock form input values
			scope.name = 'New Chartracker';

			// Set POST response
			$httpBackend.expectPOST('chartrackers', sampleChartrackerPostData).respond(sampleChartrackerResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Chartracker was created
			expect($location.path()).toBe('/chartrackers/' + sampleChartrackerResponse._id);
		}));

		it('$scope.update() should update a valid Chartracker', inject(function(Chartrackers) {
			// Define a sample Chartracker put data
			var sampleChartrackerPutData = new Chartrackers({
				_id: '525cf20451979dea2c000001',
				name: 'New Chartracker'
			});

			// Mock Chartracker in scope
			scope.chartracker = sampleChartrackerPutData;

			// Set PUT response
			$httpBackend.expectPUT(/chartrackers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/chartrackers/' + sampleChartrackerPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid chartrackerId and remove the Chartracker from the scope', inject(function(Chartrackers) {
			// Create new Chartracker object
			var sampleChartracker = new Chartrackers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Chartrackers array and include the Chartracker
			scope.chartrackers = [sampleChartracker];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/chartrackers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleChartracker);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.chartrackers.length).toBe(0);
		}));
	});
}());