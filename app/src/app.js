(function () {
    'use strict';
    
    const _templateBase = 'src';

    angular.module('i18n')
    .config(['i18nServiceProvider', function(i18nServiceProvider) {
      i18nServiceProvider.setLocales({
        'default': 'i18n/resources-locale_fr_FR.json',
        'en': 'i18n/resources-locale_fr_FR.json',
        'fr': 'i18n/resources-locale_fr_FR.json'
      }, true);
    }]);

    angular.module('app', [
      'ngRoute',
      'ngCookies',
      'ngSanitize',
      'ui.router',
      'ui.materialize',
      'i18n'
    ])
    .run(function($rootScope) {
      $rootScope.conf = {
        dbName: conf.dbName,
        keyPath: conf.keyPath,
        objectStoreVersion: conf.objectStoreVersion,
        clientIndexes: conf.clientIndexes
      };
    })
    .config(['$stateProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('welcome', {
        url: '/welcome',
        views: {
          'body': {
            templateUrl: _templateBase + '/welcome/welcome.html' ,
            controller: 'welcomeController',
            controllerAs: '_welContr'
          }
        }
      })
      .state('form', {
        url: '/form',
        views: {
          'body': {
            templateUrl: _templateBase + '/simpleForm/simpleForm.html' ,
            controller: 'simpleFormController',
            controllerAs: '_simpFormContr'
          }
        }
      })
	  .state('clientForm', {
        url: '/clientForm',
      views: {
        'body': {
          templateUrl: _templateBase + '/clientForm/clientForm.html' ,
          controller: 'clientFormController',
          controllerAs: 'vm'
        }
      }
	  });
    //$urlRouterProvider.otherwise('/');
    }]);
})();