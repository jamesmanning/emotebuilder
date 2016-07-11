// This represents the emote after it has been parsed.
// This should only be based on the emote string, decoupled
// from whether the identifier is valid, any associated lookup data, etc.
// It *should*, however, be in a valid state.  Validations on things like x-axis
// and z-axis transpose values should be done before populating them into this.
export default class EmoteObject {
    originalString: string;
    emoteIdentifier: string;
    flagsString: string;

    speed: string;
    slide: boolean;
    vibrate: boolean;
    reverse: boolean;
    hueRotate: boolean;
    invertColors: boolean;
    spin: string;
    rotateDegrees: number;
    brody: boolean;
    xAxisTranspose: number;
    zAxisTranspose: number;

    firstLineText: string;
    secondLineText: string;
    altText: string;
}
