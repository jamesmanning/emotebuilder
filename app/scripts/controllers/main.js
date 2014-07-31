'use strict';

/**
 * @ngdoc function
 * @name emotebuilderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the emotebuilderApp
 */
angular.module('emotebuilderApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
