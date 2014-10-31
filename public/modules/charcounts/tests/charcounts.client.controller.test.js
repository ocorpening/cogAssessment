'use strict';

(function() {
	// Charcounts Controller Spec
	describe('Charcounts Controller Tests', function() {
		// Initialize global variables
		var CharcountsController,
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

			// Initialize the Charcounts controller.
			CharcountsController = $controller('CharcountsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Charcount object fetched from XHR', inject(function(Charcounts) {
			// Create sample Charcount using the Charcounts service
			var sampleCharcount = new Charcounts({
				name: 'New Charcount'
			});

			// Create a sample Charcounts array that includes the new Charcount
			var sampleCharcounts = [sampleCharcount];

			// Set GET response
			$httpBackend.expectGET('charcounts').respond(sampleCharcounts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.charcounts).toEqualData(sampleCharcounts);
		}));

		it('$scope.findOne() should create an array with one Charcount object fetched from XHR using a charcountId URL parameter', inject(function(Charcounts) {
			// Define a sample Charcount object
			var sampleCharcount = new Charcounts({
				name: 'New Charcount'
			});

			// Set the URL parameter
			$stateParams.charcountId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/charcounts\/([0-9a-fA-F]{24})$/).respond(sampleCharcount);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.charcount).toEqualData(sampleCharcount);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Charcounts) {
			// Create a sample Charcount object
			var sampleCharcountPostData = new Charcounts({
				name: 'New Charcount'
			});

			// Create a sample Charcount response
			var sampleCharcountResponse = new Charcounts({
				_id: '525cf20451979dea2c000001',
				name: 'New Charcount'
			});

			// Fixture mock form input values
			scope.name = 'New Charcount';

			// Set POST response
			$httpBackend.expectPOST('charcounts', sampleCharcountPostData).respond(sampleCharcountResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Charcount was created
			expect($location.path()).toBe('/charcounts/' + sampleCharcountResponse._id);
		}));

		it('$scope.update() should update a valid Charcount', inject(function(Charcounts) {
			// Define a sample Charcount put data
			var sampleCharcountPutData = new Charcounts({
				_id: '525cf20451979dea2c000001',
				name: 'New Charcount'
			});

			// Mock Charcount in scope
			scope.charcount = sampleCharcountPutData;

			// Set PUT response
			$httpBackend.expectPUT(/charcounts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/charcounts/' + sampleCharcountPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid charcountId and remove the Charcount from the scope', inject(function(Charcounts) {
			// Create new Charcount object
			var sampleCharcount = new Charcounts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Charcounts array and include the Charcount
			scope.charcounts = [sampleCharcount];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/charcounts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCharcount);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.charcounts.length).toBe(0);
		}));
	});
}());