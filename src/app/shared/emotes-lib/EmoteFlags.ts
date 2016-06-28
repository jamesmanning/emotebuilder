import EmoteExpansionOptions from "./EmoteExpansionOptions";
import IHashMapOfStrings from "./IHashMapOfStrings";

export default class EmoteFlags {
  static berryEmoteSpinAnimations = ['spin', 'zspin', 'xspin', 'yspin', '!spin', '!zspin', '!xspin', '!yspin'];

  static speedOptions = ['slowest', 'slower', 'slow', 'fast', 'faster', 'fastest'];
  static spinOptions = [
      { name: 'spin clockwise around x axis', emoteFlag: 'xspin' },
      { name: 'spin clockwise around y axis', emoteFlag: 'yspin' },
      { name: 'spin clockwise around z axis', emoteFlag: 'zspin' },
      { name: 'spin clockwise around all 3 axes ', emoteFlag: 'spin' },
      { name: 'spin counterclockwise around x axis', emoteFlag: '!xspin' },
      { name: 'spin counterclockwise around y axis', emoteFlag: '!yspin' },
      { name: 'spin counterclockwise around z axis', emoteFlag: '!zspin' },
      { name: 'spin counterclockwise around all 3 axes ', emoteFlag: '!spin' }
  ];
  static coloringOptions = [
      { name: 'hue rotate', emoteFlag: 'i' },
      { name: 'invert', emoteFlag: 'invert' }
  ];

    static berryEmoteAnimationDescriptionToSpeedMap: IHashMapOfStrings = {
        'slowest': '14s',
        'slower': '12s',
        'slow': '10s',
        'fast': '6s',
        'faster': '4s',
        'fastest': '2s'
    };
    static berryEmoteAnimationSpeedToDescriptionMap: IHashMapOfStrings = EmoteFlags.invertHashMapOfStrings(EmoteFlags.berryEmoteAnimationDescriptionToSpeedMap);

    private static invertHashMapOfStrings(obj: IHashMapOfStrings): IHashMapOfStrings {
      const ret: IHashMapOfStrings = {};

      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          ret[obj[prop]] = prop;
        }
      }
      return ret;
    }

    static getSpeedForDescription(description: string): string {
      return EmoteFlags.berryEmoteAnimationDescriptionToSpeedMap[description] || description;
    }
    static getDescriptionForSpeed(speed: string): string {
      return EmoteFlags.berryEmoteAnimationSpeedToDescriptionMap[speed] || speed;
    }
}
