import EmoteMap from './EmoteMap';
import EmoteHtml from './EmoteHtml';
import EmoteParser from "./EmoteParser";

export default class EmoteExpander {
    private boundEmoteReplacer: (substring: string, ...args: any[]) => string;

    constructor(public emoteMap: EmoteMap, public emoteHtml: EmoteHtml, public emoteParser: EmoteParser) {
        this.boundEmoteReplacer = this.emoteReplacer.bind(this);
    }

    expand(input: string): string {
        const inputWithEmotesReplaced = input.replace(EmoteParser.emoteParseRegexp, this.boundEmoteReplacer);
        return inputWithEmotesReplaced;
    }

    private emoteReplacer(match: string): string {
        const parsedObject = this.emoteParser.parseSingleEmote(match);
        const emoteHtml = this.emoteHtml.getEmoteHtmlForObject(parsedObject);
        return emoteHtml;
    }
}
