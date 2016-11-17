(function () {
    'use strict';
    angular.module('app')
        .controller('welcomeController', [WelcomeController]);
    
    function WelcomeController() {
        var self = this;
        let name = "Pierre";

        self.hello = `Hello ${name}`;
        self.nodeJsVersion = process.versions.node;
        self.chromiumVersion = process.versions.chrome;
        self.electronVersion = process.versions.electron;
    }
})();