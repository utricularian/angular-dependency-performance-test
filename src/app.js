function timestamp() {
  return new Date().getTime();
}

function createService(app, name) {
  app.service(name, function() {
    console.log(name + " loaded");
    return {
      asdf: function() {
        return name;
      }
    };
  });
}

function createDirective(app, name) {
  app.directive(name, function() {
    console.log(name + ' loaded');
    return {
      template: 'Directive' + name
    };
  });
}

function createController(app, name) {
  app.controller(name, function($scope) {
    console.log(name + ' loaded');
    $scope.foo = name;
  });
}

// BENCH MARK THESE
var numberOfServices = 1000;
var numberOfDirectives = 1000;
var numberOfControllers = 1000;


var start = timestamp();

var app = angular.module('PerfApp', []);

for (var i = 1; i <= numberOfServices; i++) {
  createService(app, 'Service' + i);
}

for (var i = 1; i <= numberOfDirectives; i++) {
  createDirective(app, 'Directive' + i);
}

for (var i = 1; i <= numberOfControllers; i++) {
  createController(app, 'Controller' + i);
}

app.run(function(Service50) {
  var end = timestamp();
  console.log("Angular run @" + end);
  console.log("Boottime: " + (end - start));

  console.log("Service: " + Service50.asdf());
});