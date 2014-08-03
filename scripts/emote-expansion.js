var EmoteEffectsModifier = (function () {
    function EmoteEffectsModifier() {
    }
    EmoteEffectsModifier.prototype.applyFlagsToEmote = function (emoteFlags, $emote) {
        var animations = [];
        var wrapperAnimations = [];
        var transforms = [];
        var needsWrapper = false;

        if (emoteFlags.spin === 'spin' || emoteFlags.spin === 'zspin' || emoteFlags.rotateDegrees || emoteFlags.brody) {
            needsWrapper = true;
        }

        var emoteRoot = $emote;
        if (emoteFlags.spin) {
            animations.push(emoteFlags.spin + ' 2s infinite linear');
            if (emoteFlags.spin == 'zspin' || emoteFlags.spin == 'spin') {
                var diag = Math.sqrt($emote.width() * $emote.width() + $emote.height() * $emote.height());
                emoteRoot = this.wrapEmoteHeight($emote, diag);
            }
        }
        if (emoteFlags.slide) {
            var slideAnimations = [];
            var slideSpeed = emoteFlags.speed || '8s';

            slideAnimations.push(['slideleft', slideSpeed, 'infinite ease'].join(' '));
            if (!emoteFlags.brody && !emoteFlags.spin) {
                if (emoteFlags.slide == 'slide' && emoteFlags.reverse) {
                    slideAnimations.push(['!slideflip', slideSpeed, 'infinite ease'].join(' '));
                } else {
                    slideAnimations.push(['slideflip', slideSpeed, 'infinite ease'].join(' '));
                }
            }
            if (!emoteFlags.needsWrapper) {
                animations.push.apply(animations, slideAnimations);
            } else {
                wrapperAnimations.push.apply(wrapperAnimations, slideAnimations);
            }
        }
        if (emoteFlags.rotateDegrees) {
            transforms.push('rotate(' + emoteFlags.rotateDegrees + 'deg)');
            var rotateHeight = $emote.width() * Math.abs(Math.sin(emoteFlags.rotateDegrees * Math.PI / 180)) + $emote.height() * Math.abs(Math.cos(emoteFlags.rotateDegrees * Math.PI / 180));
            emoteRoot = this.wrapEmoteHeight($emote, rotateHeight);
        }
        if (emoteFlags.xAxisTranspose) {
            $emote.css('left', emoteFlags.xAxisTranspose);
        }
        if (emoteFlags.zAxisTranspose) {
            $emote.css('z-index', emoteFlags.zAxisTranspose);
        }
        if (emoteFlags.vibrate) {
            animations.unshift('vibrate 0.05s infinite linear');
        }
        if (emoteFlags.brody) {
            animations.push('brody  1.27659s infinite ease');
            var brodyHeight = 1.01 * ($emote.width() * Math.sin(10 * Math.PI / 180) + $emote.height() * Math.cos(10 * Math.PI / 180));
            emoteRoot = this.wrapEmoteHeight($emote, brodyHeight);
        }
        if (emoteFlags.reverse) {
            transforms.push('scaleX(-1)');
        }

        if (animations.length > 0) {
            $emote.css('animation', animations.join(',').replace('!', '-'));
        }
        if (wrapperAnimations.length > 0) {
            $emote.parent().css('animation', wrapperAnimations.join(',').replace('!', '-'));
        }
        if (transforms.length > 0) {
            $emote.css('transform', transforms.join(' '));
        }

        return emoteRoot;
    };

    EmoteEffectsModifier.prototype.wrapEmoteHeight = function ($emote, height) {
        var offset = Math.floor((height - $emote.height()) / 2);
        return $emote.wrap('<span class="rotation-wrapper" />').parent().css({
            'height': Math.ceil(height - offset),
            'display': 'inline-block',
            'margin-top': offset,
            'position': 'relative'
        });
    };
    return EmoteEffectsModifier;
})();
/// <reference path="IEmoteDataEntry.ts"/>
var isNode = typeof global !== "undefined" && {}.toString.call(global) == '[object global]';

if (isNode) {
    var _ = require('underscore');
    var $ = require('jquery');
    //module.exports = EmoteExpander;
}

//import _ = require('underscore');
//import $ = require('jquery');
var EmoteExpander = (function () {
    function EmoteExpander(emoteData, options) {
        this.regexp = /\[\]\(\/([\w:!#\/]+)([-\w!]*)([^)]*)\)/gi;
        this.debug = true;
        var emoteMap = new EmoteMap(emoteData);
        this.emoteHtml = new EmoteHtml(emoteMap, options);
        this.boundEmoteReplacer = this.emoteReplacer.bind(this);
    }
    EmoteExpander.prototype.expand = function (input) {
        var inputWithEmotesReplaced = input.replace(this.regexp, this.boundEmoteReplacer);
        return inputWithEmotesReplaced;
    };

    EmoteExpander.prototype.emoteReplacer = function (match, emoteName, optionalEffects, offset, stringArg) {
        var emoteHtml = this.emoteHtml.getEmoteHtml(emoteName, optionalEffects);
        return emoteHtml;
    };

    EmoteExpander.prototype.debugLog = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        if (this.debug) {
            //Function.prototype.apply.apply(console.log, [console, arguments]);
            Function.prototype.apply.apply(console.log, [console, args]);
        }
    };
    return EmoteExpander;
})();

if (isNode) {
    module.exports = EmoteExpander;
}
var EmoteExpansionOptions = (function () {
    function EmoteExpansionOptions() {
        this.berryEmoteEnabled = true;
        this.berryEmotesEffects = true;
        this.showNsfwEmotes = true;
        this.berryDrunkMode = false;
        //berryOnlyHover = false;
        //maxEmoteHeight = 200;
        //berryEmoteEffectTTL = 20;
        //apngSupported = true;
        this.berryEnableSlide = true;
        this.berryEnableSpin = true;
        this.berryEnableVibrate = true;
        this.berryEnableTranspose = true;
        this.berryEnableReverse = true;
        this.berryEnableRotate = true;
        this.berryEnableBrody = true;
        this.berryEmoteBlacklist = [];
    }
    return EmoteExpansionOptions;
})();
var EmoteFlags = (function () {
    function EmoteFlags(flags, options) {
        this.berryEmoteAnimationSpeedMap = {
            'slowest': '14s',
            'slower': '12s',
            'slow': '10s',
            'fast': '6s',
            'faster': '4s',
            'fastest': '2s'
        };
        this.berryEmoteSpinAnimations = ['spin', 'zspin', 'xspin', 'yspin', '!spin', '!zspin', '!xspin', '!yspin'];
        var flagsArray = flags.split('-');
        this.parseFlags(flagsArray, options);
    }
    EmoteFlags.prototype.parseFlag = function (flag, options) {
        // fixed string checks first, since those should be fastest
        if (flag == 'r') {
            if (options.berryEnableReverse)
                this.reverse = true;
        } else if (flag == 'slide' || flag == '!slide') {
            if (options.berryEnableSlide)
                this.slide = flag;
        } else if (flag == 'brody') {
            if (options.berryEnableBrody)
                this.brody = true;
        } else if (flag == 'vibrate' || flag == 'chargin' || flag == 'v') {
            if (options.berryEnableVibrate)
                this.vibrate = true;
            // now the mapping structures to check for those strings
        } else if (this.berryEmoteAnimationSpeedMap[flag]) {
            this.speed = this.berryEmoteAnimationSpeedMap[flag];
        } else if (this.berryEmoteSpinAnimations.indexOf(flag) != -1) {
            if (options.berryEnableSpin)
                this.spin = flag;
            // finally the regex matches
        } else if (flag.match(/^\d+$/)) {
            if (options.berryEnableRotate)
                this.rotateDegrees = parseInt(flag);
        } else if (flag.match(/^s\d/)) {
            this.speed = flag;
        } else if (flag.match(/^x\d+$/)) {
            if (options.berryEnableTranspose) {
                var shiftPosx = +flag.replace('x', '');
                if (shiftPosx <= 150) {
                    this.xAxisTranspose = shiftPosx;
                }
            }
        } else if (flag.match(/^!x\d+$/)) {
            if (options.berryEnableTranspose) {
                var shiftNegx = +flag.replace('!x', '');
                shiftNegx = shiftNegx * -1;
                if (shiftNegx >= -150) {
                    this.xAxisTranspose = shiftNegx;
                }
            }
        } else if (flag.match(/^z\d+$/)) {
            if (options.berryEnableTranspose) {
                var zindex = +flag.replace('z', '');
                if (zindex <= 10) {
                    this.zAxisTranspose = zindex;
                }
            }
        } else {
            console.log('failed to parse flag', flag);
        }
    };

    EmoteFlags.prototype.parseFlags = function (flags, options) {
        var i;
        for (i = 0; i < flags.length; ++i) {
            this.parseFlag(flags[i], options);
        }
    };
    return EmoteFlags;
})();
var EmoteHtml = (function () {
    function EmoteHtml(emoteMap, emoteExpansionOptions) {
        this.emoteMap = emoteMap;
        this.emoteExpansionOptions = emoteExpansionOptions;
        this.debug = true;
        this.effectsModifier = new EmoteEffectsModifier();
    }
    EmoteHtml.prototype.isEmoteEligible = function (emote) {
        // TODO: replace with config check (nsfw, etc)
        return true;
    };

    EmoteHtml.prototype.getBaseEmote = function (emoteDataEntry) {
        var $emote = $('<span />').addClass('berryemote').attr('title', [emoteDataEntry.names, ' from ', emoteDataEntry.sr].join('')).css('height', emoteDataEntry.height).css('width', emoteDataEntry.width).css('display', 'inline-block').css('position', 'relative').css('overflow', 'hidden');

        if (emoteDataEntry.nsfw) {
            $emote.addClass('nsfw');
        }

        this.addBackgroundImage($emote, emoteDataEntry);

        return $emote;
    };

    EmoteHtml.prototype.addBackgroundImage = function ($emote, emoteDataEntry) {
        this.debugLog('Adding bgimage to ', $emote);

        var positionString = (emoteDataEntry['background-position'] || ['0px', '0px']).join(' ');
        $emote.css('background-position', positionString);
        $emote.css('background-image', ['url(', emoteDataEntry['background-image'], ')'].join(''));
    };

    EmoteHtml.prototype.getEmoteHtml = function (emoteName, flags) {
        var emoteData = this.emoteMap.findEmote(emoteName);
        if (typeof emoteData === "undefined") {
            return "Unable to find emote by name <b>" + emoteName + "</b>";
        }
        if (this.isEmoteEligible(emoteData) === false) {
            return '[skipped expansion of emote ' + emoteName + ']';
        }

        var $emote = this.getBaseEmote(emoteData);

        if (flags) {
            var emoteFlags = new EmoteFlags(flags, this.emoteExpansionOptions);
            var $modifiedEmote = this.effectsModifier.applyFlagsToEmote(emoteFlags, $emote);
            $emote = $modifiedEmote;
        }
        var html = $emote[0].outerHTML;
        return html;
    };

    EmoteHtml.prototype.debugLog = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        if (this.debug) {
            Function.prototype.apply.apply(console.log, [console, arguments]);
        }
    };
    return EmoteHtml;
})();
/// <reference path="EmoteInfo.ts"/>
var EmoteInfoParser = (function () {
    function EmoteInfoParser() {
        this.berryEmoteAnimationSpeedMap = {
            'slowest': '14s',
            'slower': '12s',
            'slow': '10s',
            'fast': '6s',
            'faster': '4s',
            'fastest': '2s'
        };
        this.berryEmoteSpinAnimations = ['spin', 'zspin', 'xspin', 'yspin', '!spin', '!zspin', '!xspin', '!yspin'];
    }
    EmoteInfoParser.prototype.parseString = function (emoteString) {
        var emoteInfo = new EmoteInfo();
        var emoteStringSplit = emoteString.split('-');
        emoteInfo.emoteName = emoteStringSplit[0];
        var flagsArray = emoteStringSplit.slice(1);
        this.parseFlags(flagsArray, emoteInfo);
    };

    EmoteInfoParser.prototype.parseFlag = function (flag, emoteInfo) {
        // fixed string checks first, since those should be fastest
        if (flag == 'r') {
            emoteInfo.reverse = true;
        } else if (flag == 'slide' || flag == '!slide') {
            emoteInfo.slide = flag;
        } else if (flag == 'brody') {
            emoteInfo.brody = true;
        } else if (flag == 'vibrate' || flag == 'chargin' || flag == 'v') {
            emoteInfo.vibrate = true;
            // now the mapping structures to check for those strings
        } else if (this.berryEmoteAnimationSpeedMap[flag]) {
            emoteInfo.speed = this.berryEmoteAnimationSpeedMap[flag];
        } else if (this.berryEmoteSpinAnimations.indexOf(flag) != -1) {
            emoteInfo.spin = flag;
            // finally the regex matches
        } else if (flag.match(/^\d+$/)) {
            emoteInfo.rotateDegrees = parseInt(flag);
        } else if (flag.match(/^s\d/)) {
            emoteInfo.speed = flag;
        } else if (flag.match(/^x\d+$/)) {
            var shiftPositiveX = +flag.replace('x', '');
            if (shiftPositiveX <= 150) {
                emoteInfo.xAxisTranspose = shiftPositiveX;
            }
        } else if (flag.match(/^!x\d+$/)) {
            var shiftNegativeX = +flag.replace('!x', '');
            shiftNegativeX = shiftNegativeX * -1;
            if (shiftNegativeX >= -150) {
                emoteInfo.xAxisTranspose = shiftNegativeX;
            }
        } else if (flag.match(/^z\d+$/)) {
            var zIndex = +flag.replace('z', '');
            if (zIndex <= 10) {
                emoteInfo.zAxisTranspose = zIndex;
            }
        } else {
            console.log('failed to parse flag', flag);
        }
    };

    EmoteInfoParser.prototype.parseFlags = function (flags, emoteInfo) {
        var i;
        for (i = 0; i < flags.length; ++i) {
            this.parseFlag(flags[i], emoteInfo);
        }
    };
    return EmoteInfoParser;
})();
var isNode = typeof global !== "undefined" && {}.toString.call(global) == '[object global]';

if (isNode) {
    var _ = require('underscore');
}

var EmoteMap = (function () {
    function EmoteMap(emoteData) {
        this.emoteMap = this.buildEmoteMap(emoteData);
    }
    EmoteMap.prototype.findEmote = function (emoteName) {
        return this.emoteMap[emoteName];
    };

    EmoteMap.prototype.buildEmoteMap = function (emoteData) {
        var map = {};
        _.each(emoteData, function (emote) {
            _.each(emote.names, function (name) {
                map[name] = emote;
            });
        });
        console.log('emote map', map);

        //this.debugLog('emote map', map);
        return map;
    };
    return EmoteMap;
})();
