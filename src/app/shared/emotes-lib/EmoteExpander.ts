import EmoteParser from "./EmoteParser";
import EmoteExpansionOptions from './EmoteExpansionOptions';
import EmoteMap from './EmoteMap';
import EmoteHtml from './EmoteHtml';
import IEmoteDataEntry from './IEmoteDataEntry';

export default class EmoteExpander {
    private boundEmoteReplacer: (substring: string, ...args: any[]) => string;
    private debug = true;
    private emoteHtml: EmoteHtml;
    private emoteParser: EmoteParser;

    constructor(emoteData: IEmoteDataEntry[], options: EmoteExpansionOptions) {
        const emoteMap = new EmoteMap(emoteData);
        this.emoteHtml = new EmoteHtml(emoteMap, options);
        this.emoteParser = new EmoteParser();
        this.boundEmoteReplacer = this.emoteReplacer.bind(this);
    }

    expand(input: string): string {
        const inputWithEmotesReplaced = input.replace(EmoteParser.emoteParseRegexp, this.boundEmoteReplacer);
        return inputWithEmotesReplaced;
    }

    private emoteReplacer(match: string): string {
        const parsedObject = this.emoteParser.parse(match);
        const emoteHtml = this.emoteHtml.getEmoteHtmlForObject(parsedObject);
        return emoteHtml;
    }
}
