/// <reference path="EmoteInfo.ts" />
var EmoteInfoSerializer = (function () {
    function EmoteInfoSerializer() {
    }
    EmoteInfoSerializer.prototype.Serialize = function (emoteInfo) {
        return '[](/' + emoteInfo.emoteName + this.SerializeFlags(emoteInfo) + ')';
    };

    EmoteInfoSerializer.prototype.SerializeFlags = function (emoteInfo) {
        var ret = '';

        if (emoteInfo.vibrate)
            ret += '-v';
        if (emoteInfo.reverse)
            ret += '-r';
        if (emoteInfo.brody)
            ret += '-brody';
        if (emoteInfo.slide)
            ret += '-slide';

        if (emoteInfo.speed)
            ret += '-' + emoteInfo.speed;
        if (emoteInfo.spin)
            ret += '-' + emoteInfo.spin.emoteFlag;
        if (emoteInfo.rotateDegrees)
            ret += '-' + emoteInfo.rotateDegrees;
        if (emoteInfo.coloring)
            ret += '-' + emoteInfo.coloring.emoteFlag;

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
    return EmoteInfoSerializer;
})();
//# sourceMappingURL=EmoteInfoSerializer.js.map
