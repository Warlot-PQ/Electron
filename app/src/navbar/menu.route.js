(function () {
  'use strict';

  const _templateBase = 'src';

  angular.module('app')
      .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('menu', {
          url: '/menu',
          abstract: true,
          views: {
            'title@': {
              templateUrl: _templateBase + '/navbar/title.html',
              controller: 'titleController',
              controllerAs: 'vm'
            },
            'menu@': {
              templateUrl: _templateBase + '/navbar/menu.html',
              controller:  'menuController',
              controllerAs: 'vm'
            },
            'submenu@': {
              templateUrl: _templateBase + '/navbar/subMenu.html'
            }
          }
        });
      }]);
})();