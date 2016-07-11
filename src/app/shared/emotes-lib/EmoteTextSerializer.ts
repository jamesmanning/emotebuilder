import EmoteObject from './EmoteObject';
import IEmoteDataEntry from './IEmoteDataEntry';
import IHashMapOfStrings from './IHashMapOfStrings';
import HtmlOutputData from './HtmlOutputData';
import StringUtils from './StringUtils';

export default class EmoteTextSerializer {

    serializeFromObjectToHtmlOutputData(emoteData: IEmoteDataEntry, emoteObject: EmoteObject, htmlOutputData: HtmlOutputData): void {
      if (emoteObject.firstLineText) {
        htmlOutputData.emText = emoteObject.firstLineText;
        htmlOutputData.emStyles = this.getStylesFromEntry("em-", emoteData);
      }
      if (emoteObject.secondLineText) {
        htmlOutputData.strongText = emoteObject.secondLineText;
        htmlOutputData.strongStyles = this.getStylesFromEntry("strong-", emoteData);
      }
      if (emoteObject.altText) {
        htmlOutputData.altText = emoteObject.altText;
      }
      const textStyles = this.getStylesFromEntry("text-", emoteData);
      if (textStyles) {
        // since these need to apply to all text, they go on the emote node itself
        for (var property in textStyles) {
          // if (!textStyles.hasOwnProperty(property)) {
          //   continue;
          // }
          htmlOutputData.cssStylesForEmoteNode[property] = textStyles[property];
        }
      }
    }

    getStylesFromEntry(prefix: string, emoteDataEntry: IEmoteDataEntry): IHashMapOfStrings {
      const ret = <IHashMapOfStrings> {};
      for (var property in emoteDataEntry) {
        // if (!emoteDataEntry.hasOwnProperty(property)) {
        //   continue;
        // }
        if (property.startsWith(prefix)) {
          let strippedPropertyName = (<string>property).slice(prefix.length);
          let convertedProperyName = StringUtils.convertHyphenatedToCamelCase(strippedPropertyName);
          ret[convertedProperyName] = emoteDataEntry[property];
        }
      }
      return ret;
    }
}
