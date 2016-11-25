/**
 * Created by pqwarlot on 17/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .factory('clientFactory', ['IndexedDB', clientFactory]);

  const dataset = [
    {uuid: guuid(), title: "Monsieur", firstName: "Jeremy", lastName: "Scarella", company: "eBusiness Information", workPosition: "Consultant", address: "75020", phoneNumber: "0612345678", children: false},
    {uuid: guuid(), title: "Monsieur", firstName: "Pierre-Quentin", lastName: "Warlot", company: "eBusiness Information", workPosition: "Consultant", address: "94230", phoneNumber: "0687654321", children: false}
  ];
  
  function clientFactory(IndexedDB) {
    let _IndexedDB = IndexedDB;
    let _relation = _IndexedDB.relations.clients;

    return {
      relation: _relation,
      getAll: getAll,
      add: add,
      synchronise: synchronise,
      clear: clear
    };

    function getAll() {
      return _IndexedDB.readAll(_relation, (data) => {
        return new ClientApp(data.uuid, data.firstName, data.lastName, data.option, data.brand);
      });
    }

    function add(data) {
      return _IndexedDB.save(_relation, data);
    }
    
    function synchronise() {
      //FIXME:PQ wait all promises to be done
      for (let data of dataset) {
        _IndexedDB.save(_relation, data);
      }
    }
    
    function clear() {
      _IndexedDB.drop(_relation);
    }
  }
})();