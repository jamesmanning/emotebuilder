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
    .controller('MainCtrl', function ($scope) {

        $scope.emoteInfo = new EmoteInfo('ierage');
//        {
//            emoteName: "ierage",
//
//            vibrate: false,
//            reverse: false,
//            brody: false,
//
//            speed: null,
//            slide: null,
//            spin: null,
//
//            rotateDegrees: 90,
//            xAxisTranspose: 20,
//            zAxisTranspose: 20
//        };

        $scope.spinOptions = EmoteInfo.spinOptions;
        $scope.speedOptions = EmoteInfo.speedOptions;
        $scope.coloringOptions = EmoteInfo.coloringOptions;

        $scope.emoteInfoSerializer = new EmoteInfoSerializer();

        $scope.sampleData = [
            {
                "apng_url": "http://backstage.berrytube.tv/marminator/images/a/-UJ20dLxrm_8r4kr.png",
                "background-image": "http://a.thumbs.redditmedia.com/-UJ20dLxrm_8r4kr.png",
                "height": 140,
                "names": ["welliwashungryandwhenyoucravehands"],
                "sr": "marmemotes",
                "tags": ["lyra"],
                "width": 126
            },
            {
                "apng_url": "http://backstage.berrytube.tv/marminator/images/a/1ERLWojxsUO7nFQT.png",
                "background-image": "http://a.thumbs.redditmedia.com/1ERLWojxsUO7nFQT.png",
                "height": 140,
                "names": ["doodoodooluna"],
                "sr": "marmemotes",
                "tags": ["luna", ""],
                "width": 121
            },
            {
                "apng_url": "http://backstage.berrytube.tv/marminator/images/a/84ozl2WMmiYp6Euf.png",
                "background-image": "http://a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png",
                "height": 140,
                "names": ["ivyrage", "ierage"],
                "sr": "marmemotes",
                "tags": ["oc", ""],
                "width": 200
            },
            {
                "apng_url": "http://backstage.berrytube.tv/marminator/images/a/E1FnMA0PMGL9qnwx.png",
                "background-image": "http://a.thumbs.redditmedia.com/E1FnMA0PMGL9qnwx.png",
                "height": 140,
                "names": ["keystrokeguitar"],
                "sr": "marmemotes",
                "tags": ["oc", "berrytube"],
                "width": 118
            }
        ];
        $scope.options = new EmoteExpansionOptions();
        $scope.expander = new EmoteExpander($scope.sampleData, $scope.options);

        $scope.escapeHtml = function (str) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        };

        $scope.serializeEmoteInfo = function () {
            var afterSerialize = $('#afterSerialize');
            var serialized = $scope.emoteInfoSerializer.Serialize($scope.emoteInfo);
            afterSerialize.text(serialized);

            var afterElement = $('#after-expansion');
            var afterEscapedElement = $('#after-expansion-escaped');
            var beforeText = serialized;
            console.log('running expansion on', beforeText);
            var afterHtml = $scope.expander.expand(beforeText);
            afterElement.html('<p>Text <b>' + beforeText + '</b> expanded to</p>' + afterHtml);
            var escapedHtml = $scope.escapeHtml(afterHtml);
            afterEscapedElement.html(escapedHtml);
        };

        $scope.serializeEmoteInfo();
    });
