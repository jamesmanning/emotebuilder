var EmoteInfo = (function () {
    function EmoteInfo(emoteName, vibrate, reverse, brody, invert, hueRotate, speed, slide, spin, rotateDegrees, xAxisTranspose, zAxisTranspose) {
        if (typeof emoteName === "undefined") { emoteName = ''; }
        if (typeof vibrate === "undefined") { vibrate = false; }
        if (typeof reverse === "undefined") { reverse = false; }
        if (typeof brody === "undefined") { brody = false; }
        if (typeof invert === "undefined") { invert = false; }
        if (typeof hueRotate === "undefined") { hueRotate = false; }
        if (typeof speed === "undefined") { speed = ''; }
        if (typeof slide === "undefined") { slide = ''; }
        if (typeof spin === "undefined") { spin = ''; }
        if (typeof rotateDegrees === "undefined") { rotateDegrees = 0; }
        if (typeof xAxisTranspose === "undefined") { xAxisTranspose = 0; }
        if (typeof zAxisTranspose === "undefined") { zAxisTranspose = 0; }
        this.emoteName = emoteName;
        this.vibrate = vibrate;
        this.reverse = reverse;
        this.brody = brody;
        this.invert = invert;
        this.hueRotate = hueRotate;
        this.speed = speed;
        this.slide = slide;
        this.spin = spin;
        this.rotateDegrees = rotateDegrees;
        this.xAxisTranspose = xAxisTranspose;
        this.zAxisTranspose = zAxisTranspose;
    }
    return EmoteInfo;
})();
//# sourceMappingURL=EmoteInfo.js.map
