'use strict';

/**
 * @ngdoc function
 * @name emotebuilderApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the emotebuilderApp
 */
angular.module('emotebuilderApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
