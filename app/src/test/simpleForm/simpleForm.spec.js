describe('Simple Form test', function() {

    var key1 = 'foo';
    var key2 = 'baz';
    var savedItem1 = {'foo' : 'bar'};
    var savedItem2 = {'baz' : 'bat'};
    var datatypeName = 'does_not_matter';

    beforeEach(inject(function ($injector, $rootScope, $timeout) {
        resetIndexedDBMock();
        commitIndexedDBMockData(key1, savedItem1);
        commitIndexedDBMockData(key2, savedItem2);

        scope = $rootScope.$new();

        service = $injector.get('?');
        timeout = $timeout;

        spyOn(service, window.indexedDB).andReturn(mockIndexedDB);
   }));

   it('should call openCursor', inject(function () {
          spyOn(window.mockIndexedDBStore, 'openCursor').andCallThrough();

          // the mocked db open has a timer for calling request.onsuccess.
          // we need to pause the test until that time expires (via the
          // mockIndexedDB_openDBSuccess variable), then we can continue.
          runs(function() {
              service.get(datatypeName).then(function(response) {
                  scope.data = response;
              });
          });

          waitsFor(function() {
              return window.mockIndexedDB_openDBSuccess;
          }, 'open DB success', 500);

          runs(function() {
              timeout.flush();
              scope.$apply();

              expect(window.mockIndexedDBStore.openCursor).toHaveBeenCalled();
          });
    }));
});