var conf = {
  dbName: 'test123',
  keyPath: 'uuid',
  objectStoreVersion: 1,
  clientIndexes: [
    {name: "by_name", column: "lastName", option: {unique: false}}
  ]
};