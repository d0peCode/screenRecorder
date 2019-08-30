(function () {
    'use strict';

    const { ipcRenderer } = require('electron');

    angular
        .module('app')
        .controller('recorder', Controller);

    Controller.$inject = ['$scope', 'recorderService'];

    function Controller($scope, recorderService) {
        $scope.stopRecord = () => {
            ipcRenderer.send('stop::record');
        }
    }
})();