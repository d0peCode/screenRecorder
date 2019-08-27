(function () {
    'use strict';

    angular
        .module('app')
        .config(configure);

    configure.$inject = ['$routeProvider', '$httpProvider'];

    function configure($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'html/loggedScreenView.html',
                controller: 'loggedScreen',
            })
            .when('/loggedScreen', {
                templateUrl: 'html/firstScreenView.html',
                controller: 'firstScreen'
            })
        ;

        $httpProvider.interceptors.push('authInterceptorService');
    }

})();