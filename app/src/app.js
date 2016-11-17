(function () {
    'use strict';
    
    const _templateBase = 'src';
    
    angular.module('app', [
      'ngRoute',
      'ui.materialize',
    ])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/dashboard', {
          templateUrl: _templateBase + '/dashboard/dashboard.html' ,
          controller: 'dashboardController',
          controllerAs: 'vm'
        })
        .when('/form', {
          templateUrl: _templateBase + '/welcome/welcome.html' ,
          controller: 'welcomeController',
          controllerAs: '_welContr'
        })
        .when('/', {
          templateUrl: _templateBase + '/simpleForm/simpleForm.html' ,
          controller: 'simpleFormController',
          controllerAs: '_simpFormContr'
        })
        .otherwise({ redirectTo: '/' });
    }]);
})();