var EmoteEffectsModifier = (function () {
    function EmoteEffectsModifier() {
    }
    EmoteEffectsModifier.prototype.applyFlagsToEmote = function (emoteInfo, emoteHtml) {
        var needsWrapper = false;

        if (emoteInfo.spin === 'spin' || emoteInfo.spin === 'zspin' || emoteInfo.rotateDegrees || emoteInfo.brody) {
            needsWrapper = true;
        }

        if (emoteInfo.spin) {
            emoteHtml.animations.push(emoteInfo.spin + ' 2s infinite linear');
            if (emoteInfo.spin == 'zspin' || emoteInfo.spin == 'spin') {
                var diag = Math.sqrt(emoteHtml.width * emoteHtml.width + emoteHtml.height * emoteHtml.height);
                this.setEmoteWrapHeight(emoteHtml, diag);
            }
        }
        if (emoteInfo.slide) {
            var slideAnimations = [];
            var slideSpeed = emoteInfo.speed || '8s';

            slideAnimations.push(['slideleft', slideSpeed, 'infinite ease'].join(' '));
            if (!emoteInfo.brody && !emoteInfo.spin) {
                if (emoteInfo.reverse) {
                    slideAnimations.push(['!slideflip', slideSpeed, 'infinite ease'].join(' '));
                } else {
                    slideAnimations.push(['slideflip', slideSpeed, 'infinite ease'].join(' '));
                }
            }
            if (!needsWrapper) {
                emoteHtml.animations = emoteHtml.animations.concat(slideAnimations);
            } else {
                emoteHtml.wrapperAnimations = emoteHtml.wrapperAnimations.concat(slideAnimations);
            }
        }
        if (emoteInfo.rotateDegrees) {
            emoteHtml.transforms.push('rotate(' + emoteInfo.rotateDegrees + 'deg)');
            var rotateHeight = emoteHtml.width * Math.abs(Math.sin(emoteInfo.rotateDegrees * Math.PI / 180)) + emoteHtml.height * Math.abs(Math.cos(emoteInfo.rotateDegrees * Math.PI / 180));
            this.setEmoteWrapHeight(emoteHtml, rotateHeight);
        }
        if (emoteInfo.xAxisTranspose) {
            emoteHtml.left = emoteInfo.xAxisTranspose;
        }
        if (emoteInfo.zAxisTranspose) {
            emoteHtml.zIndex = emoteInfo.zAxisTranspose;
        }
        if (emoteInfo.vibrate) {
            emoteHtml.animations.unshift('0.05s linear 0s normal none infinite vibrate');
        }
        if (emoteInfo.brody) {
            emoteHtml.animations.push('brody  1.27659s infinite ease');
            var brodyHeight = 1.01 * (emoteHtml.width * Math.sin(10 * Math.PI / 180) + emoteHtml.height * Math.cos(10 * Math.PI / 180));
            this.setEmoteWrapHeight(emoteHtml, brodyHeight);
        }
        if (emoteInfo.reverse) {
            emoteHtml.transforms.push('scaleX(-1)');
        }
        if (emoteInfo.coloring === 'invert') {
            emoteHtml.cssClasses.push('bem-invert');
        } else if (emoteInfo.coloring === 'i') {
            emoteHtml.cssClasses.push('bem-hue-rotate');
        }
    };

    EmoteEffectsModifier.prototype.setEmoteWrapHeight = function (emoteHtml, height) {
        var newWrapperEmoteMarginTop = Math.floor((height - emoteHtml.height) / 2);
        var newWrapperEmoteHeight = Math.ceil(height - newWrapperEmoteMarginTop);

        // we only want to keep the max needed wrapper height
        if (newWrapperEmoteHeight > emoteHtml.wrapperEmoteHeight) {
            emoteHtml.wrapperEmoteHeight = newWrapperEmoteHeight;
            emoteHtml.wrapperEmoteMarginTop = newWrapperEmoteMarginTop;
        }
    };
    return EmoteEffectsModifier;
})();
/// <reference path="IEmoteDataEntry.ts" />
var EmoteMap = (function () {
    function EmoteMap(emoteData) {
        this.emoteMap = this.buildEmoteMap(emoteData);
    }
    EmoteMap.prototype.findEmote = function (emoteName) {
        return this.emoteMap[emoteName];
    };

    EmoteMap.prototype.buildEmoteMap = function (emoteData) {
        var map = {};
        emoteData.forEach(function (emote) {
            emote.names.forEach(function (name) {
                map[name] = emote;
            });
        });
        return map;
    };
    return EmoteMap;
})();
/// <reference path="EmoteEffectsModifier.ts"/>
/// <reference path="EmoteMap.ts"/>
/// <reference path="IEmoteDataEntry.ts"/>
var EmoteHtmlBuilder = (function () {
    function EmoteHtmlBuilder(emoteMap) {
        this.emoteMap = emoteMap;
        this.debug = true;
        this.effectsModifier = new EmoteEffectsModifier();
        this.textModifier = new EmoteTextModifier();
        this.emoteHtmlSerializer = new EmoteHtmlSerializer();
        this.emoteInfoParser = new EmoteInfoParser();
    }
    EmoteHtmlBuilder.prototype.isEmoteEligible = function (emote) {
        // TODO: replace with config check (nsfw, etc)
        return true;
    };

    EmoteHtmlBuilder.prototype.addBackgroundImage = function (emoteInfo, emoteHtml) {
        var image = emoteInfo.emoteDataEntry.apng_url || emoteInfo.emoteDataEntry['background-image'];

        var positionString = (emoteInfo.emoteDataEntry['background-position'] || ['0px', '0px']).join(' ');
        emoteHtml.backgroundImage = ['url(', image, ')'].join('');
        emoteHtml.backgroundPosition = positionString;
    };

    EmoteHtmlBuilder.prototype.getEmoteHtml = function (textPart, emoteName, flags) {
        var emoteDataEntry = this.emoteMap.findEmote(emoteName);
        var emoteInfo = this.emoteInfoParser.parseTextAndNameAndFlags(emoteDataEntry, textPart, emoteName, flags);

        var emoteHtml = this.getEmoteHtmlForEmoteInfo(emoteInfo);
        var htmlString = this.emoteHtmlSerializer.serialize(emoteHtml);
        return htmlString;
    };

    EmoteHtmlBuilder.prototype.getEmoteHtmlForEmoteInfo = function (emoteInfo) {
        var emoteHtml = new EmoteHtml();

        if (typeof emoteInfo.emoteDataEntry === "undefined") {
            emoteHtml.htmlOverride = '[Unable to find emote by name <b>' + emoteInfo.emoteName + '</b>]';
            return emoteHtml;
        }
        if (this.isEmoteEligible(emoteInfo.emoteDataEntry) === false) {
            emoteHtml.htmlOverride = '[skipped expansion of emote ' + emoteInfo.emoteName + ']';
            return emoteHtml;
        }

        var titleParts = [emoteInfo.emoteDataEntry.names, ' from /r/', emoteInfo.emoteDataEntry.sr];
        if (emoteInfo.originalFlagsString.trim()) {
            titleParts.push(' effects: ' + emoteInfo.originalFlagsString);
        }

        emoteHtml.title = titleParts.join('');
        emoteHtml.cssClasses = ['berryemote'];

        emoteHtml.height = emoteInfo.emoteDataEntry.height;
        emoteHtml.width = emoteInfo.emoteDataEntry.width;

        if (emoteInfo.emoteDataEntry.nsfw) {
            emoteHtml.cssClasses.push('nsfw');
        }

        this.addBackgroundImage(emoteInfo, emoteHtml);
        this.effectsModifier.applyFlagsToEmote(emoteInfo, emoteHtml);
        this.textModifier.applyTextToEmote(emoteInfo, emoteHtml);

        return emoteHtml;
    };
    return EmoteHtmlBuilder;
})();
/// <reference path="IEmoteDataEntry.ts"/>
/// <reference path="EmoteHtmlBuilder.ts"/>
/// <reference path="EmoteMap.ts"/>
var EmoteExpander = (function () {
    function EmoteExpander(emoteData) {
        this.regexp = /\[([^\]]*)\]\(\/([\w:!#\/]+)([-\w!]*)([^)]*)\)/gi;
        var emoteMap = new EmoteMap(emoteData);
        this.emoteHtmlBuilder = new EmoteHtmlBuilder(emoteMap);
        this.boundEmoteReplacer = this.emoteReplacer.bind(this);
    }
    EmoteExpander.prototype.expand = function (input) {
        var inputWithEmotesReplaced = input.replace(this.regexp, this.boundEmoteReplacer);
        return inputWithEmotesReplaced;
    };

    EmoteExpander.prototype.emoteReplacer = function (match, optionalText, emoteName, optionalEffects, offset, stringArg) {
        var emoteHtml = this.emoteHtmlBuilder.getEmoteHtml(optionalText, emoteName, optionalEffects);
        return emoteHtml;
    };
    return EmoteExpander;
})();
var EmoteHtml = (function () {
    function EmoteHtml(title, cssClasses, // properties that will populate into the resulting css
    height, width, backgroundPosition, backgroundImage, left, zIndex, textCssProperties, animations, transforms, wrapperEmoteHeight, wrapperEmoteMarginTop, wrapperAnimations, htmlOverride, firstLineText, firstLineStyles, secondLineText, secondLineStyles, regularAltText) {
        if (typeof title === "undefined") { title = ''; }
        if (typeof cssClasses === "undefined") { cssClasses = []; }
        if (typeof height === "undefined") { height = 0; }
        if (typeof width === "undefined") { width = 0; }
        if (typeof backgroundPosition === "undefined") { backgroundPosition = ''; }
        if (typeof backgroundImage === "undefined") { backgroundImage = ''; }
        if (typeof left === "undefined") { left = 0; }
        if (typeof zIndex === "undefined") { zIndex = 0; }
        if (typeof textCssProperties === "undefined") { textCssProperties = {}; }
        if (typeof animations === "undefined") { animations = []; }
        if (typeof transforms === "undefined") { transforms = []; }
        if (typeof wrapperEmoteHeight === "undefined") { wrapperEmoteHeight = 0; }
        if (typeof wrapperEmoteMarginTop === "undefined") { wrapperEmoteMarginTop = 0; }
        if (typeof wrapperAnimations === "undefined") { wrapperAnimations = []; }
        if (typeof htmlOverride === "undefined") { htmlOverride = ''; }
        if (typeof firstLineText === "undefined") { firstLineText = ''; }
        if (typeof firstLineStyles === "undefined") { firstLineStyles = {}; }
        if (typeof secondLineText === "undefined") { secondLineText = ''; }
        if (typeof secondLineStyles === "undefined") { secondLineStyles = {}; }
        if (typeof regularAltText === "undefined") { regularAltText = ''; }
        this.title = title;
        this.cssClasses = cssClasses;
        this.height = height;
        this.width = width;
        this.backgroundPosition = backgroundPosition;
        this.backgroundImage = backgroundImage;
        this.left = left;
        this.zIndex = zIndex;
        this.textCssProperties = textCssProperties;
        this.animations = animations;
        this.transforms = transforms;
        this.wrapperEmoteHeight = wrapperEmoteHeight;
        this.wrapperEmoteMarginTop = wrapperEmoteMarginTop;
        this.wrapperAnimations = wrapperAnimations;
        this.htmlOverride = htmlOverride;
        this.firstLineText = firstLineText;
        this.firstLineStyles = firstLineStyles;
        this.secondLineText = secondLineText;
        this.secondLineStyles = secondLineStyles;
        this.regularAltText = regularAltText;
    }
    return EmoteHtml;
})();
var EmoteHtmlSerializer = (function () {
    function EmoteHtmlSerializer() {
    }
    EmoteHtmlSerializer.prototype.serialize = function (emoteHtml) {
        if (emoteHtml.htmlOverride) {
            return emoteHtml.htmlOverride;
        }

        var htmlAttributes = [];
        var cssAttributes = {
            height: emoteHtml.height + 'px',
            width: emoteHtml.width + 'px',
            display: 'inline-block',
            position: 'relative',
            overflow: 'hidden'
        };

        Object.keys(emoteHtml.textCssProperties).forEach(function (k) {
            return cssAttributes[k] = emoteHtml.textCssProperties[k];
        });

        htmlAttributes.push(this.createHtmlAttribute('title', emoteHtml.title));
        htmlAttributes.push(this.createHtmlAttribute('class', emoteHtml.cssClasses.join(' ')));

        if (emoteHtml.left != 0) {
            cssAttributes.left = emoteHtml.left + 'px';
        }

        if (emoteHtml.zIndex != 0) {
            cssAttributes['z-index'] = emoteHtml.zIndex + '';
        }

        if (emoteHtml.animations.length > 0) {
            cssAttributes['-webkit-animation'] = emoteHtml.animations.join(',').replace('!', '-');
        }

        if (emoteHtml.transforms.length > 0) {
            cssAttributes.transform = emoteHtml.transforms.join(' ');
        }

        cssAttributes['background-position'] = emoteHtml.backgroundPosition;
        cssAttributes['background-image'] = emoteHtml.backgroundImage;

        var styleAttributeValue = this.createStyleAttributeValue(cssAttributes);

        var htmlAttributesString = this.createHtmlAttributesString({
            title: emoteHtml.title,
            class: emoteHtml.cssClasses.join(' '),
            style: styleAttributeValue
        });

        var emoteSpanContents = this.getEmoteSpanContents(emoteHtml);
        var emoteSpan = '<span ' + htmlAttributesString + '>' + emoteSpanContents + '</span>';

        if (emoteHtml.wrapperEmoteHeight > 0) {
            emoteSpan = this.addRotationWrapper(emoteSpan, emoteHtml.wrapperEmoteHeight, emoteHtml.wrapperEmoteMarginTop);
        }
        return emoteSpan;
    };

    EmoteHtmlSerializer.prototype.getEmoteSpanContents = function (emoteHtml) {
        var spanContents = '';
        if (emoteHtml.firstLineText && emoteHtml.firstLineText.trim()) {
            var styleAttributeValue = this.createStyleAttributeValue(emoteHtml.firstLineStyles);
            var htmlAttributesString = this.createHtmlAttributesString({
                style: styleAttributeValue
            });

            spanContents += '<em ' + htmlAttributesString + '>' + emoteHtml.firstLineText.trim() + '</em>';
        }
        if (emoteHtml.secondLineText && emoteHtml.secondLineText.trim()) {
            var styleAttributeValue = this.createStyleAttributeValue(emoteHtml.secondLineStyles);
            var htmlAttributesString = this.createHtmlAttributesString({
                style: styleAttributeValue
            });

            spanContents += '<strong ' + htmlAttributesString + '>' + emoteHtml.secondLineText.trim() + '</strong>';
        }
        if (emoteHtml.regularAltText && emoteHtml.regularAltText.trim()) {
            spanContents += emoteHtml.regularAltText.trim();
        }

        return spanContents;
    };

    EmoteHtmlSerializer.prototype.addRotationWrapper = function (emoteSpan, wrapperEmoteHeight, wrapperEmoteMarginTop) {
        var styleAttributeValue = this.createStyleAttributeValue({
            height: wrapperEmoteHeight + 'px',
            display: 'inline-block',
            'margin-top': wrapperEmoteMarginTop + 'px',
            position: 'relative'
        });

        var htmlAttributesString = this.createHtmlAttributesString({
            class: 'rotation-wrapper',
            style: styleAttributeValue
        });

        var wrapperSpan = '<span ' + htmlAttributesString + '>' + emoteSpan + '</span>';

        return wrapperSpan;
    };

    EmoteHtmlSerializer.prototype.createHtmlAttribute = function (attributeName, attributeValue) {
        return attributeName + '="' + attributeValue + '"';
    };

    EmoteHtmlSerializer.prototype.createCssAttributeString = function (attributeName, attributeValue) {
        return attributeName + ': ' + attributeValue;
    };

    //    private createStyleAttributeValue(cssAttributes: CssAttribute[]): string {
    //        var cssAttributeStrings = cssAttributes.map(attr => this.createCssAttributeString(attr.attributeName, attr.attributeValue));
    //
    //        var cssAttributesJoined = cssAttributeStrings.join('; ') + ';';
    //
    //        return cssAttributesJoined;
    //    }
    EmoteHtmlSerializer.prototype.createStyleAttributeValue = function (cssAttributes) {
        var _this = this;
        var cssAttributeStrings = Object.keys(cssAttributes).map(function (name) {
            return _this.createCssAttributeString(name, cssAttributes[name]);
        });

        var cssAttributesJoined = cssAttributeStrings.join('; ') + ';';

        return cssAttributesJoined;
    };

    EmoteHtmlSerializer.prototype.createHtmlAttributesString = function (htmlAttributes) {
        var _this = this;
        var htmlAttributeStrings = Object.keys(htmlAttributes).map(function (name) {
            return _this.createHtmlAttribute(name, htmlAttributes[name]);
        });

        var htmlAttributesJoined = htmlAttributeStrings.join(' ');

        return htmlAttributesJoined;
    };
    return EmoteHtmlSerializer;
})();
var EmoteInfo = (function () {
    function EmoteInfo(emoteDataEntry, emoteName, originalFlagsString, originalAltTextString, firstLineText, secondLineText, regularAltText, vibrate, reverse, brody, //        public invert: boolean = false,
    //        public hueRotate: boolean = false,
    slide, speed, spin, coloring, rotateDegrees, xAxisTranspose, zAxisTranspose) {
        if (typeof emoteDataEntry === "undefined") { emoteDataEntry = null; }
        if (typeof emoteName === "undefined") { emoteName = ''; }
        if (typeof originalFlagsString === "undefined") { originalFlagsString = ''; }
        if (typeof originalAltTextString === "undefined") { originalAltTextString = ''; }
        if (typeof firstLineText === "undefined") { firstLineText = ''; }
        if (typeof secondLineText === "undefined") { secondLineText = ''; }
        if (typeof regularAltText === "undefined") { regularAltText = ''; }
        if (typeof vibrate === "undefined") { vibrate = false; }
        if (typeof reverse === "undefined") { reverse = false; }
        if (typeof brody === "undefined") { brody = false; }
        if (typeof slide === "undefined") { slide = false; }
        if (typeof speed === "undefined") { speed = ''; }
        if (typeof spin === "undefined") { spin = ''; }
        if (typeof coloring === "undefined") { coloring = ''; }
        if (typeof rotateDegrees === "undefined") { rotateDegrees = 0; }
        if (typeof xAxisTranspose === "undefined") { xAxisTranspose = 0; }
        if (typeof zAxisTranspose === "undefined") { zAxisTranspose = 0; }
        this.emoteDataEntry = emoteDataEntry;
        this.emoteName = emoteName;
        this.originalFlagsString = originalFlagsString;
        this.originalAltTextString = originalAltTextString;
        this.firstLineText = firstLineText;
        this.secondLineText = secondLineText;
        this.regularAltText = regularAltText;
        this.vibrate = vibrate;
        this.reverse = reverse;
        this.brody = brody;
        this.slide = slide;
        this.speed = speed;
        this.spin = spin;
        this.coloring = coloring;
        this.rotateDegrees = rotateDegrees;
        this.xAxisTranspose = xAxisTranspose;
        this.zAxisTranspose = zAxisTranspose;
    }
    EmoteInfo.speedOptions = ['slowest', 'slower', 'slow', 'fast', 'faster', 'fastest'];
    EmoteInfo.spinOptions = [
        { name: 'spin clockwise around x axis', emoteFlag: 'xspin' },
        { name: 'spin clockwise around y axis', emoteFlag: 'yspin' },
        { name: 'spin clockwise around z axis', emoteFlag: 'zspin' },
        { name: 'spin clockwise around all 3 axes ', emoteFlag: 'spin' },
        { name: 'spin counterclockwise around x axis', emoteFlag: '!xspin' },
        { name: 'spin counterclockwise around y axis', emoteFlag: '!yspin' },
        { name: 'spin counterclockwise around z axis', emoteFlag: '!zspin' },
        { name: 'spin counterclockwise around all 3 axes ', emoteFlag: '!spin' }
    ];
    EmoteInfo.coloringOptions = [
        { name: 'hue rotate', emoteFlag: 'i' },
        { name: 'invert', emoteFlag: 'invert' }
    ];
    return EmoteInfo;
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
    EmoteInfoParser.prototype.parseTextAndNameAndFlags = function (emoteDataEntry, textPart, emoteName, emoteFlags) {
        var emoteInfo = new EmoteInfo();

        emoteInfo.emoteDataEntry = emoteDataEntry;
        emoteInfo.emoteName = emoteName;
        emoteInfo.originalFlagsString = emoteFlags;
        emoteInfo.originalAltTextString = textPart;

        this.parseFlags(emoteFlags, emoteInfo);
        this.parseText(textPart, emoteInfo);
        return emoteInfo;
    };

    EmoteInfoParser.prototype.parseText = function (textPart, emoteInfo) {
        var doubleStarSplit = textPart.trim().split(/\*\*(?!\*)/);
        if (doubleStarSplit.length == 3) {
            emoteInfo.secondLineText = doubleStarSplit[1];
            textPart = doubleStarSplit[0] + doubleStarSplit[2];
        }
        var singleStarSplit = textPart.trim().split(/\*(?!\*)/);
        if (singleStarSplit.length == 3) {
            emoteInfo.firstLineText = singleStarSplit[1];
            textPart = singleStarSplit[0] + singleStarSplit[2];
        }
        if (textPart.trim()) {
            emoteInfo.regularAltText = textPart.trim();
        }
    };

    EmoteInfoParser.prototype.parseFlags = function (emoteFlags, emoteInfo) {
        var emoteFlagsArray = emoteFlags.split('-');
        var i;
        for (i = 0; i < emoteFlagsArray.length; ++i) {
            this.parseFlag(emoteFlagsArray[i], emoteInfo);
        }
    };

    EmoteInfoParser.prototype.parseFlag = function (emoteFlag, emoteInfo) {
        // fixed string checks first, since those should be fastest
        if (emoteFlag == '') {
            // ignore empty flags (due to split, or consecutive dashes, or whatever)
        } else if (emoteFlag == 'r') {
            emoteInfo.reverse = true;
        } else if (emoteFlag == 'slide' || emoteFlag == '!slide') {
            emoteInfo.slide = true;
        } else if (emoteFlag == 'brody') {
            emoteInfo.brody = true;
        } else if (emoteFlag == 'invert') {
            emoteInfo.coloring = emoteFlag;
        } else if (emoteFlag == 'i') {
            emoteInfo.coloring = emoteFlag;
        } else if (emoteFlag == 'vibrate' || emoteFlag == 'chargin' || emoteFlag == 'v') {
            emoteInfo.vibrate = true;
            // now the mapping structures to check for those strings
        } else if (this.berryEmoteAnimationSpeedMap[emoteFlag]) {
            emoteInfo.speed = this.berryEmoteAnimationSpeedMap[emoteFlag];
        } else if (this.berryEmoteSpinAnimations.indexOf(emoteFlag) != -1) {
            emoteInfo.spin = emoteFlag;
            // finally the regex matches
        } else if (emoteFlag.match(/^\d+$/)) {
            emoteInfo.rotateDegrees = parseInt(emoteFlag);
        } else if (emoteFlag.match(/^s\d/)) {
            emoteInfo.speed = emoteFlag;
        } else if (emoteFlag.match(/^x\d+$/)) {
            var shiftPositiveX = +emoteFlag.replace('x', '');
            if (shiftPositiveX <= 150) {
                emoteInfo.xAxisTranspose = shiftPositiveX;
            }
        } else if (emoteFlag.match(/^!x\d+$/)) {
            var shiftNegativeX = +emoteFlag.replace('!x', '');
            shiftNegativeX = shiftNegativeX * -1;
            if (shiftNegativeX >= -150) {
                emoteInfo.xAxisTranspose = shiftNegativeX;
            }
        } else if (emoteFlag.match(/^z\d+$/)) {
            var zIndex = +emoteFlag.replace('z', '');
            if (zIndex <= 10) {
                emoteInfo.zAxisTranspose = zIndex;
            }
        } else {
            console.log('failed to parse emoteFlag', emoteFlag);
        }
    };
    return EmoteInfoParser;
})();
/// <reference path="EmoteInfo.ts" />
var EmoteInfoSerializer = (function () {
    function EmoteInfoSerializer() {
    }
    EmoteInfoSerializer.prototype.serialize = function (emoteInfo) {
        // if no emote name populated, nothing to write
        if (!emoteInfo.emoteName)
            return '';

        return '[' + this.serializeText(emoteInfo) + '](/' + emoteInfo.emoteName + this.serializeFlags(emoteInfo) + ')';
    };

    EmoteInfoSerializer.prototype.serializeFlags = function (emoteInfo) {
        if (emoteInfo.originalFlagsString) {
            return emoteInfo.originalFlagsString;
        }

        var ret = '';

        if (emoteInfo.vibrate)
            ret += '-v';
        if (emoteInfo.reverse)
            ret += '-r';
        if (emoteInfo.brody)
            ret += '-brody';
        if (emoteInfo.slide)
            ret += '-slide';

        if (emoteInfo.slide && emoteInfo.speed)
            ret += '-' + emoteInfo.speed;
        if (emoteInfo.spin)
            ret += '-' + emoteInfo.spin;
        if (emoteInfo.coloring)
            ret += '-' + emoteInfo.coloring;

        if (emoteInfo.rotateDegrees > 0 && emoteInfo.rotateDegrees <= 359) {
            ret += '-' + emoteInfo.rotateDegrees;
        }
        if (emoteInfo.xAxisTranspose > 0 && emoteInfo.xAxisTranspose <= 150) {
            ret += '-x' + emoteInfo.xAxisTranspose;
        }
        if (emoteInfo.xAxisTranspose < 0 && emoteInfo.xAxisTranspose >= -150) {
            ret += '-x!' + Math.abs(emoteInfo.xAxisTranspose);
        }
        if (emoteInfo.zAxisTranspose > 0 && emoteInfo.zAxisTranspose <= 10) {
            ret += '-z' + emoteInfo.zAxisTranspose;
        }
        return ret;
    };

    EmoteInfoSerializer.prototype.serializeText = function (emoteInfo) {
        if (emoteInfo.originalAltTextString) {
            return emoteInfo.originalAltTextString;
        }

        var parts = [];

        if (emoteInfo.firstLineText.trim()) {
            parts.push('*' + emoteInfo.firstLineText.trim() + '*');
        }

        if (emoteInfo.secondLineText.trim()) {
            parts.push('**' + emoteInfo.secondLineText.trim() + '**');
        }

        if (emoteInfo.regularAltText.trim()) {
            parts.push(emoteInfo.regularAltText.trim());
        }

        return parts.join(' ');
    };
    return EmoteInfoSerializer;
})();
var EmoteTextModifier = (function () {
    function EmoteTextModifier() {
    }
    EmoteTextModifier.prototype.applyTextToEmote = function (emoteInfo, emoteHtml) {
        if (emoteInfo.firstLineText.trim()) {
            emoteHtml.firstLineText = emoteInfo.firstLineText.trim();
            Object.keys(emoteInfo.emoteDataEntry).filter(function (k) {
                return k.indexOf('em-') == 0;
            }).forEach(function (k) {
                return emoteHtml.firstLineStyles[k.substring(3)] = emoteInfo.emoteDataEntry[k];
            });
        }
        if (emoteInfo.secondLineText.trim()) {
            emoteHtml.secondLineText = emoteInfo.secondLineText.trim();
            Object.keys(emoteInfo.emoteDataEntry).filter(function (k) {
                return k.indexOf('strong-') == 0;
            }).forEach(function (k) {
                return emoteHtml.secondLineStyles[k.substring(7)] = emoteInfo.emoteDataEntry[k];
            });
        }
        if (emoteInfo.regularAltText.trim()) {
            emoteHtml.regularAltText = emoteInfo.regularAltText.trim();
        }
        Object.keys(emoteInfo.emoteDataEntry).filter(function (k) {
            return k.indexOf('text-') == 0;
        }).forEach(function (k) {
            return emoteHtml.textCssProperties[k.substring(5)] = emoteInfo.emoteDataEntry[k];
        });
    };
    return EmoteTextModifier;
})();
/// <reference path="../lib/node.d.ts"/>
var isNode = typeof global !== "undefined" && {}.toString.call(global) == '[object global]';

if (isNode) {
    module.exports = {
        EmoteExpander: EmoteExpander,
        EmoteInfoSerializer: EmoteInfoSerializer,
        EmoteInfo: EmoteInfo
    };
}
//# sourceMappingURL=emote-expansion.js.map
