import IEmoteDataEntry from './IEmoteDataEntry';
import IHashMapOfStrings from './IHashMapOfStrings';

export default class HtmlOutputData {
    emoteData: IEmoteDataEntry;
    titleForEmoteNode: string;

    cssClassesForEmoteNode: string[] = [];
    cssStylesForEmoteNode: IHashMapOfStrings = <IHashMapOfStrings> {};

    cssClassesForParentNode: string[] = [];
    cssStylesForParentNode: IHashMapOfStrings = <IHashMapOfStrings> {};

    emText: string;
    emStyles: IHashMapOfStrings;
    strongText: string;
    strongStyles: IHashMapOfStrings;
    altText: string;
}
