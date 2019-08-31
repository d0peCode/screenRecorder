(function () {
    'use strict';

    angular
        .module('app')
        .config(configure);

    configure.$inject = ['$routeProvider'];

    function configure($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../html/views/landing.html',
                controller: 'landing',
            })
            .when('/transparent', {
                templateUrl: '../html/views/transparent.html'
            })
            .when('/recording', {
                templateUrl: '../html/views/recorder.html',
                controller: 'recorder'
            })
            .when('/uploading', {
                templateUrl: '../html/views/uploader.html',
                controller: 'uploader'
            })
        ;
    }

})();