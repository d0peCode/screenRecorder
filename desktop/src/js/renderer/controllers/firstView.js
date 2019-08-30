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
            if($scope.outputVideoPath) {
                recorderService.recorder.startRecord();
                ipcRenderer.send('start::record');
            } else alert('Please establish saving path.')
        };

        ipcRenderer.on('path::chosen', (e, path) => {
            $scope.outputVideoPath = path;
            $scope.$apply();
        });
        ipcRenderer.on('video::finished', () => {
            recorderService.recorder.stopRecord();
            alert('Saved.');
        });
    }
})();