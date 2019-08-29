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
                ipcRenderer.send('start::record');
                recorderService.recorder.init();
            } else alert('Please establish saving path.')
        };

        ipcRenderer.on('path::chosen', (e, path) => {
            console.log('path', path)
            $scope.outputVideoPath = path;
            console.log('$scope.outputVideoPath',$scope.outputVideoPath);
            $scope.$apply();
        });
        ipcRenderer.on('video::finished', () => {
            alert('finished');
        });
    }
})();