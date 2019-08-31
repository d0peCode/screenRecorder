(function () {
    'use strict';

    const { ipcRenderer } = require('electron');

    angular
        .module('app')
        .controller('uploader', Controller);

    Controller.$inject = ['$scope', 'recorderService'];

    function Controller($scope, recorderService) {
        $scope.progress = 0;
        $scope.url = "";

        ipcRenderer.on('upload::progress', (e, progress) => {
            console.log(e, progress);
            $scope.progress = progress;
            $scope.$apply();
        });
        ipcRenderer.on('upload::finish', (e, url) => {
            $scope.url = url;
            $scope.$apply();
        });
    }
})();