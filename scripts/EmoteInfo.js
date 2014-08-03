var EmoteFlagInfo = (function () {
    function EmoteFlagInfo(name, emoteFlag) {
        this.name = name;
        this.emoteFlag = emoteFlag;
    }
    return EmoteFlagInfo;
})();
var EmoteInfo = (function () {
    function EmoteInfo(emoteName, vibrate, reverse, brody, //        public invert: boolean = false,
    //        public hueRotate: boolean = false,
    slide, speed, spin, coloring, rotateDegrees, xAxisTranspose, zAxisTranspose) {
        if (typeof emoteName === "undefined") { emoteName = ''; }
        if (typeof vibrate === "undefined") { vibrate = false; }
        if (typeof reverse === "undefined") { reverse = false; }
        if (typeof brody === "undefined") { brody = false; }
        if (typeof slide === "undefined") { slide = false; }
        if (typeof speed === "undefined") { speed = ''; }
        if (typeof spin === "undefined") { spin = null; }
        if (typeof coloring === "undefined") { coloring = null; }
        if (typeof rotateDegrees === "undefined") { rotateDegrees = 0; }
        if (typeof xAxisTranspose === "undefined") { xAxisTranspose = 0; }
        if (typeof zAxisTranspose === "undefined") { zAxisTranspose = 0; }
        this.emoteName = emoteName;
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
//# sourceMappingURL=EmoteInfo.js.map
