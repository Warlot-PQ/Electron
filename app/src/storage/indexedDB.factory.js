/**
 * Created by pqwarlot on 17/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
  .factory('IndexedDB', ['$q', '$window', indexedDBFactory]);

  const objectStoreName = "filesProject";
  const keyPath = "uuid";
  const initDataset = [
    {title: "Quarry Memories", author: "Fred", uuid: 123456},
    {title: "Bedrock Nights", author: "Barney", uuid: 345678}
  ];
  const indexes = [{name: "by_name", column: "author", option: {unique: true}}]

  function indexedDBFactory($q, $window) {
    let factory = {
      save: save,
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
      // Open DB
      deleteDB(objectStoreName);

      let request = $window.indexedDB.open(objectStoreName, 1);

      request.onupgradeneeded = function() {
        console.log("DB updating....");
        // The database did not previously exist, so create object stores and indexes.
        let db = request.result;
        let store = db.createObjectStore(objectStoreName, {keyPath: keyPath});
        for (let index of indexes) {
          store.createIndex(index.name, index.column, index.option);
        }

        // Populate with initial data.
        for (let file of initDataset) {
          store.add(file);
        }
        console.log("DB update done.");
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
        console.log(error);
        promise.reject(error);
      };
    }

    function deleteDB(dbName) {
      let deletion = $window.indexedDB.deleteDatabase(objectStoreName);
      deletion.onsuccess = function () {
        console.log("Deletion success.");
      };
      deletion.onerror = function () {
        console.log("Deletion error!");
      };
    }

    // Not tested
    function save(fileData, successCallback, errorCallback) {
      // Open object to store data
      let tx = db.transaction([objectStoreName], "readwrite")
      let store = tx.objectStore(objectStoreName);
      // Add data
      store.put(fileData);

      tx.oncomplete = function () {
        console.log("Save success.");
        successCallback();
      };
      tx.onabort = function () {
        console.log("Save aborted!");
        console.log(tx.error);
        errorCallback();
      };
    }

    function readAll() {
      let promise = $q.defer();

      initDB(function (db, promise) {
        console.log("Reading result...");
        let tx = db.transaction([objectStoreName], IDBTransaction.READ_ONLY);
        let store = tx.objectStore(objectStoreName);
        let cursorRequest = store.openCursor();
        let items = [];

        cursorRequest.onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor) {
            // Called for each matching record.
            items.push(
                new FileApp(cursor.value.uuid, cursor.value.title, cursor.value.author)
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
          console.log(error);
          promise.reject(error);
        };

      }, promise);

      return promise.promise;
    }
  }
})();