/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .controller('dashboardController', ['IndexedDB', dashboardController]);

  function dashboardController(IndexedDB) {
    let vm = this;
    vm.itemsPerRow = 3;
    vm.items = [];

    let promise = IndexedDB.readAll();

    promise.then(function (datas) {
      let dimension = 0;
      console.log(`data read: ${datas.length}`);
      datas.forEach(function(data, index) {

        if (index % vm.itemsPerRow == 0) {
          vm.items[dimension] = [];
        }
        vm.items[dimension].push(data);

      });
    }, function (error) {
      console.log(error);
    });
  }
})();