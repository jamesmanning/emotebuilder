import HtmlOutputData from "./HtmlOutputData";
import EmoteMap from './EmoteMap';
import EmoteExpansionOptions from './EmoteExpansionOptions';
import EmoteEffectsModifier from './EmoteEffectsModifier';
import EmoteTextSerializer from './EmoteTextSerializer';
import EmoteFlags from './EmoteFlags';
import EmoteObject from './EmoteObject';
import IEmoteDataEntry from './IEmoteDataEntry';
import IHashMapOfStrings from './IHashMapOfStrings';
import StringUtils from './StringUtils';

export default class EmoteHtml {
    private effectsModifier = new EmoteEffectsModifier();
    private textSerializer = new EmoteTextSerializer();

    constructor(private emoteMap: EmoteMap, private emoteExpansionOptions = new EmoteExpansionOptions()) {

    }

    // private isEmoteEligible(emote: IEmoteDataEntry): boolean {
    //     // TODO: replace with config check (nsfw, etc)
    //     return true;
    // }

    private getBaseHtmlDataForEmote(emoteDataEntry: IEmoteDataEntry): HtmlOutputData {

        const ret = <HtmlOutputData> {
            emoteData: emoteDataEntry,
            titleForEmoteNode: `${emoteDataEntry.names.join(',')} from /r/${emoteDataEntry.sr}`,

            cssClassesForEmoteNode: ['berryemote'],
            cssStylesForEmoteNode: <IHashMapOfStrings> {
              height              : `${emoteDataEntry.height}px`                  ,
              width               : `${emoteDataEntry.width}px`                   ,
              display             : 'inline-block'                                ,
              position            : 'relative'                                    ,
              overflow            : 'hidden'                                      ,
              backgroundPosition  : (emoteDataEntry['background-position'] || ['0px', '0px']).join(' '),
              backgroundImage     : `url(${emoteDataEntry['background-image']})`
            },

            cssClassesForParentNode: [],
            cssStylesForParentNode: <IHashMapOfStrings> {}
        };

        if (emoteDataEntry.nsfw) {
            ret.cssClassesForEmoteNode.push('nsfw');
        }

        return ret;
    }

    getEmoteHtmlMetadataForObject(emoteObject: EmoteObject): HtmlOutputData {
        const emoteData = this.emoteMap.findEmote(emoteObject.emoteIdentifier);
        if (!emoteData) return null;

        // if (this.isEmoteEligible(emoteData) === false) {
        //     return null;
        // }

        const htmlOutputData = this.getBaseHtmlDataForEmote(emoteData);

        this.effectsModifier.applyFlagsFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);

        this.textSerializer.serializeFromObjectToHtmlOutputData(emoteData, emoteObject, htmlOutputData);

        return htmlOutputData;
    }

    getEmoteHtmlForObject(emoteObject: EmoteObject): string {
        const htmlOutputData = this.getEmoteHtmlMetadataForObject(emoteObject);
        const htmlString = this.serializeHtmlOutputData(htmlOutputData);
        return htmlString;
    }

    private serializeHtmlOutputData(htmlOutputData: HtmlOutputData): string {
        const styleValue = StringUtils.createMarkupForStyles(htmlOutputData.cssStylesForEmoteNode);
        const outerStyleValue = StringUtils.createMarkupForStyles(htmlOutputData.cssStylesForParentNode);

        const innerHtml = StringUtils.createInnerHtml(htmlOutputData) || '';
        let html = `<span class="${htmlOutputData.cssClassesForEmoteNode.join(' ')}" title="${htmlOutputData.titleForEmoteNode}" style="${styleValue}">${innerHtml}</span>`;
        if (htmlOutputData.cssClassesForParentNode.length > 0 || outerStyleValue) {
            // wrap with the specified span tag
            html = `<span class="${htmlOutputData.cssClassesForParentNode.join(' ')}" style="${outerStyleValue}">${html}</span>`;
        }

        return html;
    }
}
