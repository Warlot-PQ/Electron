(function () {
    'use strict';
    
    const _templateBase = 'src';
    
    angular.module('app', [
      'ui.router',
      'ui.materialize'
    ])
    .config(['$stateProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('welcome', {
        url: '/welcome',
        templateUrl: _templateBase + '/welcome/welcome.html' ,
        controller: 'welcomeController',
        controllerAs: '_welContr'
      })
      .state('form', {
        url: '/form',
        templateUrl: _templateBase + '/simpleForm/simpleForm.html' ,
        controller: 'simpleFormController',
        controllerAs: '_simpFormContr'
      })
	  .state('clientForm', {
        url: '/clientForm',
        templateUrl: _templateBase + '/clientForm/clientForm.html' ,
        controller: 'clientFormController',
        controllerAs: 'vm'
	  });
      //$urlRouterProvider.otherwise('/');
    }]);
})();