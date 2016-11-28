exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/*-spec.js'],
  framework: 'jasmine2',

  onPrepare: function() {
    var folderName = (new Date()).toString().split(' ').splice(1, 4).join(' ');
    var mkdirp = require('mkdirp');
    var newFolder = "./reports/" + folderName;
    var jasmineReporters = require('jasmine-reporters');

    return browser.getProcessedConfig().then(function(config) {
      mkdirp(newFolder, function(err) {
        if (err) {
          console.error(err);
        } else {
          jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: newFolder,
            filePrefix: ''
          }));
        }
      });
    });
  }
};