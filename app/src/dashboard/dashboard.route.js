(function () {
  'use strict';

  const _templateBase = 'src';

  angular.module('app')
      .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('menu.dashboard', {
          url: '/dashboard',
          views: {
            'body@': {
              templateUrl: _templateBase + '/dashboard/dashboard.html' ,
              controller: 'dashboardController',
              controllerAs: 'vm'
            }
          }
        });
      }]);
})();