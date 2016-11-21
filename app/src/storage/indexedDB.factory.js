/**
 * Created by pqwarlot on 17/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
  .factory('IndexedDB', ['$q', '$window', indexedDBFactory]);

//  const objectStoreName = "filesProject";
  const objectStoreName = "clientsProject";
  const keyPath = "uuid";
  const initFileDataset = [
    {title: "Quarry Memories", author: "Fred", uuid: 123456},
    {title: "Bedrock Nights", author: "Barney", uuid: 345678}
  ];
  const initClientDataset = [
      {firstName: "Jeremy", lastName: "Scarella", option: "Option 1", brand: "Nokia", uuid: 123457},
      {firstName: "Pierre-Quentin", lastName: "Warlot", option: "Option 2", brand: "Samsung", uuid: 345679}
  ];
  const fileIndexes = [{name: "by_name", column: "author", option: {unique: true}}];
  const clientIndexes = [{name: "by_name", column: "lastName", option: {unique: false}}];

  function indexedDBFactory($q, $window) {
    let factory = {
      dropDB: dropDB,
      save: save,
      synchronise: synchronise,
      readAll: readAll
    };

    return factory;

    /**
     * Save given data in indexedDB.
     *
     * @param filesData array of data to save
     */
    function initDB(callback, promise) {
      if (!$window.indexedDB) {
        console.log("This browser does not support indexedDB!")
        promise.reject("This browser does not support indexedDB!");
        return;
      } else {
        console.log("This browser supports indexedDB.")
      }

      let request = $window.indexedDB.open(objectStoreName, 1);

      request.onupgradeneeded = function() {
        console.log("DB initialising...");
        // The database did not previously exist, so create object stores and fileIndexes.
        let db = request.result;
        let store = db.createObjectStore(objectStoreName, {keyPath: keyPath});
//        for (let index of fileIndexes) {
//          store.createIndex(index.name, index.column, index.option);
//        }
        for (let index of clientIndexes) {
          store.createIndex(index.name, index.column, index.option);
        }

        // Populate with initial data.
//        for (let client of initClientDataset) {
//          store.add(client);
//        }
        console.log("DB initialising done.");
      };

      request.onsuccess = function(e) {
        console.log("DB opened.");
        let db = request.result;
        // process query
        callback(db, promise);
        // Close connexion
        db.close();
      };

      request.onerror = function(error) {
        console.log("DB could not be opened.");
        console.log(error);
        promise.reject(error);
      };
    }

    function dropDB(dbName) {
      let deletion = $window.indexedDB.deleteDatabase(dbName);
      deletion.onsuccess = function () {
        console.log("Deletion success.");
      };
      deletion.onerror = function () {
        console.log("Deletion error!");
      };
    }

    function save(data) {
        var promise = $q.defer();

        initDB(function (db, promise) {
            console.log("Saving...");
            var tx = db.transaction([objectStoreName], IDBTransaction.READ_WRITE ? IDBTransaction.READ_WRITE : 'readwrite');
            var store = tx.objectStore(objectStoreName);
            var addRequest = store.add(data);

            addRequest.onsuccess = function (event) {
                console.log("Save done.");
                promise.resolve(data);
            };

            addRequest.onerror = function (error) {
                console.log("Save aborted!");
                console.log(tx.error);
                promise.reject(error);
            };
        }, promise);

        return promise.promise;
    }

    function synchronise() {
        for (let client of initClientDataset) {
          save(client);
        }
    }

    function readAll() {
      let promise = $q.defer();

      initDB(function (db, promise) {
        console.log("Reading...");
        let tx = db.transaction([objectStoreName], IDBTransaction.READ_ONLY);
        let store = tx.objectStore(objectStoreName);
        let cursorRequest = store.openCursor();
        let items = [];

        cursorRequest.onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor) {
            // Called for each matching record.
            items.push(
//                new FileApp(cursor.value.uuid, cursor.value.title, cursor.value.author)
                new ClientApp(cursor.value.uuid, cursor.value.firstName, cursor.value.lastName, cursor.value.option, cursor.value.brand)
            );
            // call cursorRequest.onsuccess
            cursor.continue();
          } else {
            // No more to read
            console.log("Read done.");
            promise.resolve(items);
          }
        };
        cursorRequest.onerror = function(error) {
          console.log("Read aborted!");
          console.log(error);
          promise.reject(error);
        };
      }, promise);

      return promise.promise;
    }
  }
})();