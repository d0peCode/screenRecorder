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
            ipcRenderer.send('video:finished');
            //$scope.outputVideoPath = dialog.showOpenDialog({ properties: ['openDirectory'] });
        };
        $scope.startRecord = () => {
            recorderService.recorder.init()
                .then(() => {
                    console.log('Recorded');
                });
        }
    }

})();