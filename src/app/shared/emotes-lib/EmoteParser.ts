import EmoteObject from './EmoteObject';
import EmoteFlags from './EmoteFlags';

export default class EmoteParser {
    static emoteParseRegexp = /\[([^\]]*)\]\(\/([\w:!#\/]+)([-\w!]*)([^)]*)\)/;
    private static multipleMatchRegexp = new RegExp(EmoteParser.emoteParseRegexp.source, 'g');

    parseSingleEmote(input: string): EmoteObject {
        const emoteObject: EmoteObject = {
            originalString: input,
            emoteIdentifier: null,
            flagsString: null,

            speed: null,
            slide: false,
            vibrate: false,
            reverse: false,
            hueRotate: false,
            invertColors: false,
            spin: null,
            rotateDegrees: 0,
            brody: false,
            xAxisTranspose: 0,
            zAxisTranspose: 0,

            firstLineText: null,
            secondLineText: null,
            altText: null
        };

        const result = EmoteParser.emoteParseRegexp.exec(input);
        if (result) {
          emoteObject.emoteIdentifier = result[2];
          if (result[3]) {
            emoteObject.flagsString = result[3];
          }
          this.setTextOnObject(result[1], emoteObject)
          this.setFlagsOnObject(result[3], emoteObject);
        }

        return emoteObject;
    }

    parseMultipleEmotes(input: string): EmoteObject[] {
        const individualEmoteStrings = input.match(EmoteParser.multipleMatchRegexp);
        if (!individualEmoteStrings) return [];

        var emoteInfos = individualEmoteStrings
            .map(emoteString => this.parseSingleEmote(emoteString))
            .filter(emoteObject => emoteObject != null);

        return emoteInfos;
    }

    setTextOnObject(textString: string, emoteObject: EmoteObject) {

      const doubleStarSplit = textString.split('**');
      if (doubleStarSplit.length == 3) {
        emoteObject.secondLineText = doubleStarSplit[1];
        textString = doubleStarSplit[0] + doubleStarSplit[2];
      }

      const singleStarSplit = textString.split('*');
      if (singleStarSplit.length == 3) {
        emoteObject.firstLineText = singleStarSplit[1];
        textString = singleStarSplit[0] + singleStarSplit[2];
      }

      // trim just to make sure we're not keeping around just whitespace
      textString = textString.trim();
      if (textString.length > 0) {
        emoteObject.altText = textString;
      }
    }

    setFlagsOnObject(flagsString: string, emoteObject: EmoteObject) {
        const flagsArray = flagsString.split('-');

        for (let i = 0; i < flagsArray.length; ++i) {
            if (flagsArray[i]) {
                this.setFlagOnObject(flagsArray[i], emoteObject);
            }
        }
    }

    setFlagOnObject(flag: string, emoteObject: EmoteObject) {
        // fixed string checks first, since those should be fastest
        if (flag == 'r') {
            emoteObject.reverse = true;
        } else if (flag == 'slide' || flag == '!slide') {
            emoteObject.slide = true;
        } else if (flag == 'brody') {
            emoteObject.brody = true;
        } else if (flag == 'vibrate' || flag == 'chargin' || flag == 'v') {
            emoteObject.vibrate = true;
        } else if (flag == 'i') {
            emoteObject.hueRotate = true;
          } else if (flag == 'invert') {
              emoteObject.invertColors = true;

            // now the mapping structures to check for those strings
          } else if (EmoteFlags.berryEmoteAnimationDescriptionToSpeedMap[flag]) {
              emoteObject.speed = flag; // convert to the time value in EmoteHtml instead
          } else if (EmoteFlags.berryEmoteSpinAnimations.indexOf(flag) != -1) {
              emoteObject.spin = flag;

            // finally the regex matches
        } else if (flag.match(/^\d+$/)) {
            emoteObject.rotateDegrees = parseInt(flag);
        } else if (flag.match(/^s\d+/)) {
            emoteObject.speed = flag.substring(1) + 's';
        } else if (flag.match(/^x\d+$/)) {
            const shiftPosx = +flag.replace('x', '');
            if (shiftPosx <= 150) {
                emoteObject.xAxisTranspose = shiftPosx;
            }
        } else if (flag.match(/^!x\d+$/)) {
            const shiftNegx = -1 * +flag.replace('!x', '');
            if (shiftNegx >= -150) {
                emoteObject.xAxisTranspose = shiftNegx;
            }
        } else if (flag.match(/^z\d+$/)) {
            const zindex = +flag.replace('z', '');
            if (zindex <= 10) {
                emoteObject.zAxisTranspose = zindex;
            }
        } else {
            console.error(`ignoring unknown flag ${flag}`);
        }
    }
}
