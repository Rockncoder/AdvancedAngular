describe("filters", function () {
  var serviceModule, mockParse;

  beforeEach(module('tempApp'));

  describe("minimum filter", function () {
    it("should be available", function () {
      inject(function ($filter) {
        expect($filter("minimum")).toBeDefined();
      });
    });

    it("should filter an array to be above or equal to the default of 15", function () {
      inject(function ($filter) {
        var unfiltered = [
            {"date": "2013-04-01T17:01:22.634Z", "temp": 8},
            {"date": "2013-04-02T17:01:22.634Z", "temp": 13},
            {"date": "2013-04-03T17:01:22.634Z", "temp": 15},
            {"date": "2013-04-04T17:01:22.634Z", "temp": 11},
            {"date": "2013-04-05T17:01:22.634Z", "temp": 15},
            {"date": "2013-04-06T17:01:22.634Z", "temp": 17},
            {"date": "2013-04-07T17:01:22.634Z", "temp": 21}
          ],
          filtered = $filter('minimum')(unfiltered);
        console.log(filtered);
        expect(filtered.length).toBe(4);
      });
    });
  });
});