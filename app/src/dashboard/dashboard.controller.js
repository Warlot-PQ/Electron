/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .controller('dashboardController', ['clientFactory', dashboardController]);

  function dashboardController(clientFactory, $location) {
    const _clientFactory = clientFactory;

    let vm = this;
    vm.itemsPerRow = 1;
    vm.items = [];

    vm.clearClients = clearClients;

    let promise = _clientFactory.getAll();

    promise.then(function (datas) {
      let dimension = -1;
      console.log(`data read length: ${datas.length}`);
      datas.forEach(function(data, index) {

        if (index % vm.itemsPerRow == 0) {
          dimension += 1;
          vm.items[dimension] = [];
        }
        vm.items[dimension].push(data);

      });
    }, function (error) {
      console.log(error);
    });

    function clearClients() {
      _clientFactory.clear();
      location.reload();
    }
  }
})();