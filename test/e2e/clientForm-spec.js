var AngularClientForm = require('./clientForm.po.js');
describe('ClientForm Tests', function() {
  it('should greet the named user', function() {
    var angularClientForm = new AngularClientForm();
    angularClientForm.get();
    angularClientForm.setName('Jeremy');

    expect(angularClientForm.getGreeting()).toEqual('Hello Jeremy!');
  });
});