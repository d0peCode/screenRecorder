(function () {
    'use strict';

    angular
        .module('app')
        .config(configure);

    configure.$inject = ['$routeProvider'];

    function configure($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'html/firstView.html',
                controller: 'loggedScreen',
            })
            .when('/recording', {
                templateUrl: 'html/recorderView.html',
                controller: 'firstScreen'
            })
        ;
    }

})();