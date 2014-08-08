/* global EmoteInfo, EmoteInfoSerializer, EmoteExpander, $ */
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
    .controller('MainCtrl', function ($scope, $http) {

        $scope.emoteInfo = new EmoteInfo();
        $scope.emoteInfo.emoteName = 'adviceajlie';
        $scope.emoteInfo.firstLineText = 'apples?';
        $scope.emoteInfo.secondLineText = 'I didn\'t see any apples';


        $scope.spinOptions = EmoteInfo.spinOptions;
        $scope.speedOptions = EmoteInfo.speedOptions;
        $scope.coloringOptions = EmoteInfo.coloringOptions;

        $scope.emoteInfoSerializer = new EmoteInfoSerializer();

        $scope.currentEmoteDataEntry = null;

        // populate with a few inline so the page can render one by default
        $scope.emoteData = [
            {
                'apng_url': 'http://backstage.berrytube.tv/marminator/images/a/-UJ20dLxrm_8r4kr.png',
                'background-image': 'http://a.thumbs.redditmedia.com/-UJ20dLxrm_8r4kr.png',
                'height': 140,
                'names': ['welliwashungryandwhenyoucravehands'],
                'sr': 'marmemotes',
                'tags': ['lyra'],
                'width': 126
            },
            {
                'apng_url': 'http://backstage.berrytube.tv/marminator/images/a/1ERLWojxsUO7nFQT.png',
                'background-image': 'http://a.thumbs.redditmedia.com/1ERLWojxsUO7nFQT.png',
                'height': 140,
                'names': ['doodoodooluna'],
                'sr': 'marmemotes',
                'tags': ['luna', ''],
                'width': 121
            },
            {
                'apng_url': 'http://backstage.berrytube.tv/marminator/images/a/84ozl2WMmiYp6Euf.png',
                'background-image': 'http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png',
                'height': 140,
                'names': ['ivyrage', 'ierage'],
                'sr': 'marmemotes',
                'tags': ['oc', ''],
                'width': 200
            },
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
            },
            {
                'apng_url': 'http://backstage.berrytube.tv/marminator/images/a/E1FnMA0PMGL9qnwx.png',
                'background-image': 'http://a.thumbs.redditmedia.com/E1FnMA0PMGL9qnwx.png',
                'height': 140,
                'names': ['keystrokeguitar'],
                'sr': 'marmemotes',
                'tags': ['oc', 'berrytube'],
                'width': 118
            }
        ];
        $scope.expander = new EmoteExpander($scope.emoteData);

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
                    $scope.expander = new EmoteExpander($scope.emoteData, $scope.options);
                    console.log('loaded ' + $scope.emoteData.length + ' emotes');
                });
        };

        $scope.serializeEmoteInfo = function () {
            var afterSerialize = $('#afterSerialize');
            var serialized = $scope.emoteInfoSerializer.serialize($scope.emoteInfo);

            $scope.currentEmoteDataEntry = $scope.expander.emoteMap.findEmote($scope.emoteInfo.emoteName);

            afterSerialize.text(serialized);
            afterSerialize.val(serialized);

            var afterElement = $('#after-expansion');
            var afterEscapedElement = $('#after-expansion-escaped');
            var beforeText = serialized;
            console.log('running expansion on', beforeText);
            var afterHtml = $scope.expander.expand(beforeText);

            // TODO: get rid of this stupid hack and figure out how to get jquery or angular to do this for us
            afterHtml = afterHtml.replace(/; animation: ([^;]+);/g, '; animation: $1; -webkit-animation: $1;');

            afterElement.html(afterHtml);
            var escapedHtml = $scope.escapeHtml(afterHtml);
            afterEscapedElement.html(escapedHtml);
        };

        $scope.serializeEmoteInfo();
        $scope.populateEmoteData();
    });
