import IHashMapOfStrings from "./IHashMapOfStrings";
export default class EmoteFlags {
    static berryEmoteSpinAnimations: string[];
    static spinOptions: {
        name: string;
        emoteFlag: string;
    }[];
    static coloringOptions: {
        name: string;
        emoteFlag: string;
    }[];
    static berryEmoteAnimationDescriptionToSpeedMap: IHashMapOfStrings;
    static berryEmoteAnimationSpeedToDescriptionMap: IHashMapOfStrings;
    private static invertHashMapOfStrings(obj);
    static getSpeedForDescription(description: string): string;
    static getDescriptionForSpeed(speed: string): string;
}
