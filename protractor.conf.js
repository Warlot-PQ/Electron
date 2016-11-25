exports.config = {
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
  },

  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: { 'browserName': 'chrome' },

  suites: {
    clientForm: 'app/tests/e2e/clientForm/**/*spec.js'
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: true
  }
};