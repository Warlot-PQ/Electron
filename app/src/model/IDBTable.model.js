/**
 * Created by jscarella on 22/11/16.
 */
class IDBTableApp {

  constructor(keyPath, objectStoreName, objectStoreVersion, indexes, dataset) {
    this.keyPath = keyPath;
    this.objectStoreName = objectStoreName;
    this.objectStoreVersion = objectStoreVersion;
    this.indexes = indexes;
    this.dataset = dataset;
  }
}