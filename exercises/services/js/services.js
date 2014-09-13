"use strict";

angular.module('serviceModule', [function ($provide) {
  $provide.factory('parse', [function () {
    Parse.initialize("SKpLeCmzc6y0HIwaBgcpUpNTdXHhqeWoRLQVxRCD", "Qf7DnDWBaS01IOo3Qt21VHOT64VixjoVJH2xzTPq");
  }]);
  $provide.factory('reading', ['parse', function () {
    console.log(Parse);
    var Reading = Parse.Object.extend("Reading"),
      serviceInstance = {
        save: function (temp) {
          var reading = new Reading();
          reading.set("date", new Date().toISOString());
          reading.set("temp", temp);
          reading.save(null, {
            success: function (reading) {
              alert('Reading saved');
            },
            error: function (reading, errror) {
              alert("Error: " + error.code + " " + error.message);
            }
          });
        },
        query: function (callback) {
          var query = new Parse.Query(Reading);
          query.find({
            success: function (results) {
              var historyData = [];
              angular.forEach(results, function (i) {
                historyData.push({
                  date: i.get('date'),
                  temp: i.get('temp')
                });
              });
              callback(historyData);
            },
            error: function (error) {
              alert("Error: " + error.code + " " + error.message);
            }
          });
        }
      };

    return serviceInstance;
  }]);
}]);