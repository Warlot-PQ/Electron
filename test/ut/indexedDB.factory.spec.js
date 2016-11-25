describe('in rootValGetter', function () {
  let _IndexedDB;

  beforeEach(module('app'));

  beforeEach(inject(function($rootScope) {
    $rootScope.conf = {
      dbName: 'test.spec'
    };
    /*
    module(function($provide) {
      $provide.value('$rootScope', rootScopeMock)
    });
    */
  }));

  it('getVal returns the value from $rootScope', inject(function (IndexedDB) {

    expect(IndexedDB).toBeDefined();
    expect(IndexedDB.dbName).toBe('test.spec');

  }));
});