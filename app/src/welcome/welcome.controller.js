(function () {
    'use strict';
    angular.module('app')
        .controller('welcomeController', [WelcomeController]);
    
    function WelcomeController() {
        let ctx = this;
        let name = "Pierre";

        ctx.hello = `Hello ${name}`;
        ctx.nodeJsVersion = process.versions.node;
        ctx.chromiumVersion = process.versions.chrome;
        ctx.electronVersion = process.versions.electron;
    }
})();