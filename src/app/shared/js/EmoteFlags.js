"use strict";
var EmoteFlags = (function () {
    function EmoteFlags() {
    }
    EmoteFlags.invertHashMapOfStrings = function (obj) {
        var ret = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                ret[obj[prop]] = prop;
            }
        }
        return ret;
    };
    EmoteFlags.getSpeedForDescription = function (description) {
        return EmoteFlags.berryEmoteAnimationDescriptionToSpeedMap[description] || description;
    };
    EmoteFlags.getDescriptionForSpeed = function (speed) {
        return EmoteFlags.berryEmoteAnimationSpeedToDescriptionMap[speed] || speed;
    };
    EmoteFlags.berryEmoteSpinAnimations = ['spin', 'zspin', 'xspin', 'yspin', '!spin', '!zspin', '!xspin', '!yspin'];
    EmoteFlags.spinOptions = [
        { name: 'spin clockwise around x axis', emoteFlag: 'xspin' },
        { name: 'spin clockwise around y axis', emoteFlag: 'yspin' },
        { name: 'spin clockwise around z axis', emoteFlag: 'zspin' },
        { name: 'spin clockwise around all 3 axes ', emoteFlag: 'spin' },
        { name: 'spin counterclockwise around x axis', emoteFlag: '!xspin' },
        { name: 'spin counterclockwise around y axis', emoteFlag: '!yspin' },
        { name: 'spin counterclockwise around z axis', emoteFlag: '!zspin' },
        { name: 'spin counterclockwise around all 3 axes ', emoteFlag: '!spin' }
    ];
    EmoteFlags.coloringOptions = [
        { name: 'hue rotate', emoteFlag: 'i' },
        { name: 'invert', emoteFlag: 'invert' }
    ];
    EmoteFlags.berryEmoteAnimationDescriptionToSpeedMap = {
        'slowest': '14s',
        'slower': '12s',
        'slow': '10s',
        'fast': '6s',
        'faster': '4s',
        'fastest': '2s'
    };
    EmoteFlags.berryEmoteAnimationSpeedToDescriptionMap = EmoteFlags.invertHashMapOfStrings(EmoteFlags.berryEmoteAnimationDescriptionToSpeedMap);
    return EmoteFlags;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteFlags;
//# sourceMappingURL=EmoteFlags.js.map