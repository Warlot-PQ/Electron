(function () {
  'use strict';
  angular.module('app')
      .controller('menuController', ['i18nService', 'clientFactory', menuController]);

  function menuController(i18nService, clientFactory) {
    const _clientFactory = clientFactory;
    const _i18n = i18nService;

    let vm = this;

    vm.getDateAsString = getDateAsString;
    vm.sync = sync;
    
    function getDateAsString() {
      let date = new Date();

      let dayOfTheWeek = date.getDay();
      let dayNumber = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();

      return `${_i18n.getArray("date.dayOfTheWeek")[dayOfTheWeek]} ${dayNumber}  ${_i18n.getArray("date.month")[month]} ${year}`;
    }
    
    function sync() {
      _clientFactory.synchronise();
      location.reload();
    }
  }
})();