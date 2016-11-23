/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .controller('dashboardController', ['IndexedDB', dashboardController]);

  const keyPath = "uuid";
  const objectStoreName = "clients";
  const objectStoreVersion = 1;
  const indexes = [{name: "by_name", column: "lastName", option: {unique: false}}];
  const uuid = require('uuid');
  const dataset = [
    {uuid: uuid(), title: "Monsieur", firstName: "Jeremy", lastName: "Scarella", company: "eBusiness Information", workPosition: "Consultant", address: "75020", phoneNumber: "0612345678", children: false},
    {uuid: uuid(), title: "Monsieur", firstName: "Pierre-Quentin", lastName: "Warlot", company: "eBusiness Information", workPosition: "Consultant", address: "94230", phoneNumber: "0687654321", children: false}
  ];
  const idbTable = new IDBTableApp(keyPath, objectStoreName, objectStoreVersion, indexes, dataset);

  function dashboardController(IndexedDB, Client) {
    let vm = this;
    vm.itemsPerRow = 2;
    vm.items = [];

    vm.synchronise = synchronise;
    vm.drop = drop;

    let promise = IndexedDB.readAll(idbTable);

    promise.then(function (datas) {
      let dimension = -1;
      console.log(`data read: ${datas.length}`);
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

    function synchronise() {
        IndexedDB.synchronise(idbTable);
        location.reload();
    }

    function drop() {
        IndexedDB.drop(idbTable);
        location.reload();
    }
  }
})();