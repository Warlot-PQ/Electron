/**
 * Created by pqwarlot on 17/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
  .factory('IndexedDB', ['$q', '$window', indexedDBFactory]);

  const keyPath = "uuid";
  const objectStoreVersion = 1;
  const clientIndexes = [{name: "by_name", column: "lastName", option: {unique: false}}];

  function indexedDBFactory($q, $window) {
    return {
      relations: {
        clients: 'clients'
      },
      drop: drop,
      readAll: readAll,
      save: save
    };

    function drop() {
      let deletion = $window.indexedDB.deleteDatabase('Proto');
      deletion.onsuccess = function () {
        console.log("Deletion success.");
      };
      deletion.onerror = function () {
        console.log("Deletion error!");
      };
    }

    /**
     * Save given data in indexedDB.
     *
     * @param filesData array of data to save
     */
    function init(callback, promise, tableName) {
      if (!$window.indexedDB) {
        console.log("This browser does not support indexedDB!")
        promise.reject("This browser does not support indexedDB!");
        return;
      } else {
        console.log("This browser supports indexedDB.");
      }

      let request = $window.indexedDB.open('Proto', objectStoreVersion);

      request.onupgradeneeded = function(e) {
        console.log("DB initialising...");
        // The database did not previously exist, so create object stores and fileIndexes.
        let db = e.target.result;
        let store = db.createObjectStore(tableName, {keyPath: keyPath});
        for (let index of clientIndexes) {
          store.createIndex(index.name, index.column, index.option);
        }

        console.log("DB initialising done.");
      };

      request.onsuccess = function() {
        console.log("DB opened.");
        let db = request.result;
        // process query
        callback(db, promise, tableName);
        // Close connexion
        db.close();
      };

      request.onerror = function(error) {
        console.log("DB could not be opened.");
        console.log(error);
        promise.reject(error);
      };
    }

    function readAll(tableName, callbackMapper) {
      let promise = $q.defer();

      init(function (db, promise, tableName) {
        console.log("Reading...");
        let tx = db.transaction([tableName], IDBTransaction.READ_ONLY ? IDBTransaction.READ_ONLY : 'readonly');
        let store = tx.objectStore(tableName);
        let cursorRequest = store.openCursor();
        let items = [];

        cursorRequest.onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor) {
            // Called for each matching record.
            items.push(callbackMapper(cursor.value));
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
      }, promise, tableName);

      return promise.promise;
    }

    function save(tableName, data) {
        var promise = $q.defer();

        init(function (db, promise) {
            console.log("Saving...");
            var tx = db.transaction([tableName], IDBTransaction.READ_WRITE ? IDBTransaction.READ_WRITE : 'readwrite');
            var store = tx.objectStore(tableName);
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
        }, promise, tableName);

        return promise.promise;
    }
  }
})();