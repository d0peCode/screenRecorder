(function () {
    'use strict';

    const { ipcRenderer } = require('electron');

    angular
        .module('app')
        .controller('firstView', Controller);

    Controller.$inject = ['$scope', 'recorderService'];

    function Controller($scope, recorderService) {
        $scope.hello = "Hello World";
        $scope.outputVideoPath = "";

        $scope.openDialog = () => {
            ipcRenderer.send('pick::path');
        };
        $scope.startRecord = () => {
            ipcRenderer.send('start::recording');
        };

        ipcRenderer.on('path::chosen', (e, path) => {
            console.log('path', path)
            $scope.outputVideoPath = path;
            console.log('$scope.outputVideoPath',$scope.outputVideoPath);
            $scope.$apply();
        });
        ipcRenderer.on('video::finished', (e, path) => {
            $scope.outputVideoPath = path;
        });
    }
})();