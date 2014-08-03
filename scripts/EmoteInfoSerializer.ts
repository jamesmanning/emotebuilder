/// <reference path="EmoteInfo.ts" />

class EmoteInfoSerializer {
    Serialize(emoteInfo: EmoteInfo): string {
        return '[](/' +
            emoteInfo.emoteName +
            this.SerializeFlags(emoteInfo) +
            ')';
    }

    SerializeFlags(emoteInfo: EmoteInfo): string {
        var ret = '';

        if (emoteInfo.vibrate)    ret += '-v';
        if (emoteInfo.reverse)    ret += '-r';
        if (emoteInfo.brody)      ret += '-brody';
        if (emoteInfo.slide)         ret += '-slide';

        if (emoteInfo.speed)         ret += '-' + emoteInfo.speed;
        if (emoteInfo.spin)          ret += '-' + emoteInfo.spin.emoteFlag;
        if (emoteInfo.rotateDegrees) ret += '-' + emoteInfo.rotateDegrees;
        if (emoteInfo.coloring)      ret += '-' + emoteInfo.coloring.emoteFlag;

        if (emoteInfo.xAxisTranspose > 0) {
            ret += '-x' + emoteInfo.xAxisTranspose;
        }
        if (emoteInfo.xAxisTranspose < 0) {
            ret += '-x!' + emoteInfo.xAxisTranspose;
        }
        if (emoteInfo.zAxisTranspose > 0) {
            ret += '-z' + emoteInfo.zAxisTranspose;
        }
        return ret;
    }
}