
describe("history", function () {
  var scope;


  beforeEach(module('tempApp'));

  beforeEach(module(function ($provide) {
    $provide.service('reading', [function () {
      this.query = function () {
        return [
          {"date": "2013-04-01T17:01:22.634Z", "temp": 8},
          {"date": "2013-04-02T17:01:22.634Z", "temp": 13},
          {"date": "2013-04-03T17:01:22.634Z", "temp": 15},
          {"date": "2013-04-04T17:01:22.634Z", "temp": 11}
        ];
      };
    }]);
  }));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('HistoryCtrl', {
      $scope: scope
    });
    console.log(scope);
  }));

  describe("tempMin", function () {
    it("should be defined", function () {
      expect(scope.tempMin).toBeDefined();
    });
  });
});