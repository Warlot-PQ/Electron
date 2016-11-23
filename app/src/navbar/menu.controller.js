(function () {
  'use strict';
  angular.module('app')
      .controller('menuController', ['clientFactory', menuController]);

  function menuController(clientFactory) {
    const _clientFactory = clientFactory;

    let vm = this;

    vm.date = new Date();
    vm.sync = sync;
    
    function sync() {
      _clientFactory.synchronise();
      location.reload();
    }
  }
})();