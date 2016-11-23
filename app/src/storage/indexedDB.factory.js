/**
 * Created by pqwarlot on 17/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
  .factory('IndexedDB', ['$q', '$window', indexedDBFactory]);

  const IDB_TABLE = new IDBTableApp('', '', '', '', '');

  function indexedDBFactory($q, $window) {
    let factory = {
      drop: drop,
      readAll: readAll,
      save: save,
      synchronise: synchronise
    };

    return factory;

    function drop(idbTable) {
      // Update IDB_TABLE values before operation
      updateIDB_TABLE(idbTable);

      let deletion = $window.indexedDB.deleteDatabase(IDB_TABLE.objectStoreName);
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
    function init(callback, promise) {
      if (!$window.indexedDB) {
        console.log("This browser does not support indexedDB!")
        promise.reject("This browser does not support indexedDB!");
        return;
      } else {
        console.log("This browser supports indexedDB.")
      }

      let request = $window.indexedDB.open(IDB_TABLE.objectStoreName, IDB_TABLE.objectStoreVersion);

      request.onupgradeneeded = function() {
        console.log("DB initialising...");
        // The database did not previously exist, so create object stores and fileIndexes.
        let db = request.result;
        let store = db.createObjectStore(IDB_TABLE.objectStoreName, {keyPath: IDB_TABLE.keyPath});
        for (let index of IDB_TABLE.indexes) {
          store.createIndex(index.name, index.column, index.option);
        }

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

    function readAll(idbTable) {
      // Update IDB_TABLE values before operation
      updateIDB_TABLE(idbTable);

      let promise = $q.defer();

      init(function (db, promise) {
        console.log("Reading...");
        let tx = db.transaction([IDB_TABLE.objectStoreName], IDBTransaction.READ_ONLY ? IDBTransaction.READ_ONLY : 'readonly');
        let store = tx.objectStore(IDB_TABLE.objectStoreName);
        let cursorRequest = store.openCursor();
        let items = [];

        cursorRequest.onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor) {
            // Called for each matching record.
            items.push(cursor.value);
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

    function updateIDB_TABLE(idbTable) {
        IDB_TABLE.keyPath = idbTable.keyPath;
        IDB_TABLE.objectStoreName = idbTable.objectStoreName;
        IDB_TABLE.objectStoreVersion = idbTable.objectStoreVersion;
        IDB_TABLE.indexes = idbTable.indexes;
        IDB_TABLE.dataset = idbTable.dataset;
    }

    function save(idbTable, data) {
        // Update IDB_TABLE values before operation
        updateIDB_TABLE(idbTable);
        var promise = $q.defer();

        init(function (db, promise) {
            console.log("Saving...");
            var tx = db.transaction([IDB_TABLE.objectStoreName], IDBTransaction.READ_WRITE ? IDBTransaction.READ_WRITE : 'readwrite');
            var store = tx.objectStore(IDB_TABLE.objectStoreName);
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

    function synchronise(idbTable) {
        // Update IDB_TABLE values before operation
        updateIDB_TABLE(idbTable);

        for (let data of IDB_TABLE.dataset) {
          save(idbTable, data);
        }
    }
  }
})();