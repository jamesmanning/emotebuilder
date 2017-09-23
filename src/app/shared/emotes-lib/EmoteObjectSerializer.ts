import { EmoteObject } from "./EmoteObject";

export class EmoteObjectSerializer {
    serialize(emoteObject: EmoteObject): string {
      return `[${this.serializeTextParts(emoteObject)}](/${emoteObject.emoteIdentifier}${this.serializeFlags(emoteObject)})`;
    }

    serializeTextParts(emoteObject: EmoteObject): string {
        var parts = <string[]> [];

        if (emoteObject.firstLineText)  parts.push(`*${emoteObject.firstLineText}*`);
        if (emoteObject.secondLineText) parts.push(`**${emoteObject.secondLineText}**`);
        if (emoteObject.altText)        parts.push(`${emoteObject.altText}`);

        const ret = parts.join(' ');
        return ret;
    }

    serializeFlags(emoteObject: EmoteObject): string {
        var ret = '';

        if (emoteObject.vibrate)       ret += '-v';
        if (emoteObject.reverse)       ret += '-r';
        if (emoteObject.brody)         ret += '-brody';
        if (emoteObject.slide)         ret += '-slide';
        if (emoteObject.speed)         ret += '-' + emoteObject.speed;
        if (emoteObject.spin)          ret += '-' + emoteObject.spin;
        if (emoteObject.hueRotate)     ret += '-i';
        if (emoteObject.invertColors)  ret += '-invert';

        if (emoteObject.rotateDegrees > 0)        ret += '-' + emoteObject.rotateDegrees;
        if (emoteObject.xAxisTranspose > 0)       ret += '-x' + emoteObject.xAxisTranspose;
        if (emoteObject.xAxisTranspose < 0)       ret += '-!x' + Math.abs(emoteObject.xAxisTranspose);
        if (emoteObject.zAxisTranspose > 0)       ret += '-z' + emoteObject.zAxisTranspose;

        return ret;
    }
}
