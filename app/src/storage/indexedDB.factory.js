/**
 * Created by pqwarlot on 17/11/16.
 */
(function () {
  'use strict';
  angular.module('app')

  .factory('IndexedDB', [indexedDBFactory]);

  let db;
  const objectStoreName = "filesProject";

  function indexedDBFactory() {
    let factory = {
      save: save,
      readAll: readAll
    }

    initDB();
    return factory;
  }

  /**
   * Save given data in indexedDB.
   *
   * @param filesData array of data to save
   */
  function initDB() {
    if (!indexedDB) {
      console.log("This browser does not support indexedDB!")
      errorCallback();
      return;
    } else {
      console.log("This browser supports indexedDB.")
    }
    // Open DB
    // indexedDB.deleteDatabase(objectStoreName);
    let request = indexedDB.open(objectStoreName); // name, version number

    request.onupgradeneeded = function() {
      console.log("DB updating....");
      // The database did not previously exist, so create object stores and indexes.
      let db = request.result;
      let store = db.createObjectStore(objectStoreName, {keyPath: "uuid"});
      store.createIndex("by_name", "name", {unique: true});

      // Populate with initial data.
      store.add({title: "Quarry Memories", name: "Fred", uuid: 123456});
      store.add({title: "Water Buffaloes", name: "Fred", uuid: 234567});
      store.add({title: "Bedrock Nights", name: "Barney", uuid: 345678});
      console.log("DB update done.");
    };

    request.onsuccess = function(e) {
      console.log("DB opened.");
      db = e.target.result;
    };

    request.onerror = function(e) {
      console.log("Error while openning the DB!");
    };
  }
  
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
    return;


    let tx = db.transaction(['filesProject']);
    let store = tx.objectStore('filesProject');
    let index = store.index("by_author");

    let request = index.openCursor(IDBKeyRange.only("Fred"));
    request.onsuccess = function() {
      let cursor = request.result;
      if (cursor) {
        // Called for each matching record.
        report(cursor.value.isbn, cursor.value.title, cursor.value.author);
        cursor.continue();
      } else {
        // No more matching records.
        report(null);
      }
    };
  }
})();