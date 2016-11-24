(function () {
    'use strict';
    angular.module('app')
        .controller('welcomeController', [WelcomeController]);
    
    function WelcomeController() {
        let vm = this;
        let name = "Pierre";

        vm.hello = `Hello ${name}`;
        vm.nodeJsVersion = process.versions.node;
        vm.chromiumVersion = process.versions.chrome;
        vm.electronVersion = process.versions.electron;
    }
})();