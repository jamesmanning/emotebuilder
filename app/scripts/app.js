/* global EmoteInfo, EmoteInfoParser, EmoteInfoSerializer, EmoteExpander, $ */
'use strict';

/**
 * @ngdoc overview
 * @name emotebuilderApp
 * @description
 * # emotebuilderApp
 *
 * Main module of the application.
 */


angular
    .module('emotebuilderApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch'
    ])
    .filter('renderAsHtml', ['$sce', function($sce){
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }])
    .controller('MainCtrl', function ($scope, $http) {

        // populate with a few inline so the page can render one by default
        $scope.emoteData = [
            {
                'text-text-align': 'center',
                'text-font-size': '26px',
                'text-font-family': 'Impact,sans-serif',
                'tags': ['applejack', 'meme'],
                'strong-bottom': '5px',
                'text-text-shadow': '2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black',
                'height': 300,
                'em-width': '280px',
                'strong-left': '50%',
                'names': ['adviceajlie'],
                'em-position': 'absolute',
                'strong-position': 'absolute',
                'background-image': 'http://b.thumbs.redditmedia.com/5g6WH3RD7F5aMC-O.png',
                'em-font-style': 'normal',
                'em-color': 'white',
                'em-top': '5px',
                'width': 300,
                'sr': 'adviceponies',
                'strong-color': 'white',
                'strong-margin-left': '-140px',
                'text-color': 'white',
                'strong-width': '280px',
                'em-left': '50%',
                'text-text-transform': 'uppercase',
                'strong-font-weight': 'normal',
                'background-position': ['-2px', '-2px'],
                'text-line-height': '26px',
                'em-margin-left': '-140px'
            }
        ];
        $scope.emoteExpander = new EmoteExpander($scope.emoteData);

        $scope.numberOfEmotes = 1;

        $scope.$watch('numberOfEmotes', function() {
            if ($scope.numberOfEmotes == 1) {
                $scope.emoteInfo2 = null;
            } else if ($scope.numberOfEmotes == 2) {
                if ($scope.emoteInfo2 == null) {
                    $scope.emoteInfo2 = new EmoteInfo();
                    $scope.emoteInfo2.emoteName = 'ierage';
                }
            }
            $scope.serializeEmoteInfos();
        });

        $scope.emoteInfo1 = new EmoteInfo();
        $scope.emoteInfo1.emoteName = 'adviceajlie';
        $scope.emoteInfo1.firstLineText = 'apples?';
        $scope.emoteInfo1.secondLineText = 'I didn\'t see any apples';
        $scope.currentEmoteDataEntry1 = null;
        $scope.$watch('emoteInfo1.emoteName', function() {
            if ($scope.emoteInfo1 && $scope.emoteInfo1.emoteName) {
                $scope.currentEmoteDataEntry1 = $scope.emoteExpander.emoteMap.findEmote($scope.emoteInfo1.emoteName);
                if ($scope.currentEmoteDataEntry1) {
                    if ($scope.currentEmoteDataEntry1['em-top'] == undefined) {
                        $scope.emoteInfo1.firstLineText = '';
                        $scope.serializeEmoteInfos();
                    }
                    if ($scope.currentEmoteDataEntry1['strong-bottom'] == undefined) {
                        $scope.emoteInfo1.secondLineText = '';
                        $scope.serializeEmoteInfos();
                    }
                }
            } else {
                $scope.currentEmoteDataEntry1 = null;
            }
        });

        $scope.emoteInfo2 = null;
//        $scope.emoteInfo2 = new EmoteInfo();
//        $scope.emoteInfo2.emoteName = 'ierage';
        $scope.currentEmoteDataEntry2 = null;
        $scope.$watch('emoteInfo2.emoteName', function() {
            if ($scope.emoteInfo2 && $scope.emoteInfo2.emoteName) {
                $scope.currentEmoteDataEntry2 = $scope.emoteExpander.emoteMap.findEmote($scope.emoteInfo2.emoteName);
                if ($scope.currentEmoteDataEntry2) {
                    if ($scope.currentEmoteDataEntry2['em-top'] == undefined) {
                        $scope.emoteInfo2.firstLineText = '';
                        $scope.serializeEmoteInfos();
                    }
                    if ($scope.currentEmoteDataEntry2['strong-bottom'] == undefined) {
                        $scope.emoteInfo2.secondLineText = '';
                        $scope.serializeEmoteInfos();
                    }
                }
            } else {
                $scope.currentEmoteDataEntry2 = null;
            }
        });

        $scope.spinOptions = EmoteInfo.spinOptions;
        $scope.speedOptions = EmoteInfo.speedOptions;
        $scope.coloringOptions = EmoteInfo.coloringOptions;

        $scope.emoteInfoSerializer = new EmoteInfoSerializer();
        $scope.emoteInfoParser = new EmoteInfoParser();

        $scope.existingEmoteString = null;

        $scope.escapeHtml = function (str) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        };

        $scope.populateEmoteData = function () {
            console.log('making call to load emote data');
            $http.get('//berrymotes.com/assets/berrymotes_json_data.json')
                .then(function(res) {
                    $scope.emoteData = res.data;
                    $scope.emoteExpander = new EmoteExpander($scope.emoteData);
                    console.log('loaded ' + $scope.emoteData.length + ' emotes');
                });
        };

        $scope.serializedEmotes = null;
        $scope.expandedEmotes = null;

        $scope.serializeEmoteInfos = function () {
            $scope.serializedEmotes = $scope.emoteInfoSerializer.serialize($scope.emoteInfo1);

            if ($scope.emoteInfo2) {
                var serialized2 = $scope.emoteInfoSerializer.serialize($scope.emoteInfo2);
                $scope.serializedEmotes += ' ' + serialized2;
            }

            console.log('running expansion on', $scope.serializedEmotes);
            $scope.expandedEmotes = $scope.emoteExpander.expand($scope.serializedEmotes);

            // TODO: get rid of this stupid hack and figure out how to get jquery or angular to do this for us
            $scope.expandedEmotes = $scope.expandedEmotes.replace(/; animation: ([^;]+);/g, '; animation: $1; -webkit-animation: $1;');

            // TODO: figure out the problem with renderAsHtml firing constantly
            $('#expandedEmotes').html($scope.expandedEmotes);
        };

        $scope.importExistingEmoteString = function() {
            // TODO: in ES6, use destructuring
            var emoteInfos = $scope.emoteInfoParser.parseEmotesFromString($scope.existingEmoteString);

            if (emoteInfos && emoteInfos.length > 0) {
                $scope.emoteInfo1 = emoteInfos[0];
                if (emoteInfos.length == 1) {
                    $scope.numberOfEmotes = 1;
                } else {
                    $scope.numberOfEmotes = 2;
                    $scope.emoteInfo2 = emoteInfos[1];
                }
                $scope.existingEmoteString = null;
                $scope.serializeEmoteInfos();
            }
        };

        $scope.serializeEmoteInfos();
        $scope.populateEmoteData();
    });
