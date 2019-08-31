(function () {
    'use strict';

    const { ipcRenderer } = require('electron');

    angular
        .module('app')
        .controller('firstView', Controller);

    Controller.$inject = ['$scope', 'recorderService'];

    function Controller($scope, recorderService) {
        $scope.app = "ScreenRecorder";
        $scope.outputVideoPath = "";
        $scope.saveOnline = false;
        $scope.justSaved = false;

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
        ipcRenderer.on('video::finish', async() => {
            recorderService.recorder.stopRecord($scope.outputVideoPath, $scope.saveOnline);
            if(!$scope.saveOnline) {
                alert('Saved to:', $scope.outputVideoPath);
            } else {
                ipcRenderer.send('start::upload');
            }
        });
    }
})();