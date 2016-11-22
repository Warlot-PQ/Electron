(function () {
  'use strict';

  const _templateBase = 'src';

  angular.module('app')
      .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('menu', {
          url: '/menu',
          views: {
            '': {
              templateUrl: _templateBase + '/navbar/menu.html'
            },
            'title': {
              template: 'Home'
            },
            'navbar': {
              template: '<h1>navBar</h1>'
            },
            'subnavbar': {
              template: '<h2>navBar</h2>'
            }
          }
        });
      }]);
})();