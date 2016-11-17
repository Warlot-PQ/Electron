(function () {
    'use strict';
    
    const _templateBase = 'src';
    
    angular.module('app', [
      'ngRoute',
      'ui.materialize'
    ])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/form', {
          templateUrl: _templateBase + '/welcome/welcome.html' ,
          controller: 'welcomeController',
          controllerAs: '_welContr'
        })
        .when('/', {
          templateUrl: _templateBase + '/simpleForm/simpleForm.html' ,
          controller: 'simpleFormController',
          controllerAs: 'simpFormContr'
        })
        .otherwise({ redirectTo: '/' });
      }
    ]);
})();