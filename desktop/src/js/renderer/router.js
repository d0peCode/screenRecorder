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
                templateUrl: '../html/views/transparentView.html'
            })
            .when('/recording', {
                templateUrl: '../html/views/recorderView.html',
                controller: 'recorder'
            })
            .when('/uploading', {
                templateUrl: '../html/views/uploaderView.html',
                controller: 'uploader'
            })
        ;
    }

})();