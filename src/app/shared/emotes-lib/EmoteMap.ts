import { IEmoteDataEntry } from './IEmoteDataEntry';

export class EmoteMap {
    constructor(public emoteData: IEmoteDataEntry[]) {
        this.mapOfEmotes = this.buildEmoteMap(emoteData);
        this.allEmoteNames = Array.from(this.mapOfEmotes.keys());
        this.mapOfImages = new Map<string, string>();
        this.allEmoteNames.forEach(element => {
            this.mapOfImages.set(element, this.mapOfEmotes.get(element)["background-image"])
        });  
    }

    findEmote(emoteName: string): IEmoteDataEntry {
        return this.mapOfEmotes.get(emoteName);
    }

    public mapOfEmotes: Map<string, IEmoteDataEntry>;
    public mapOfImages: Map<string, string>;
    public allEmoteNames: string[];

    // private buildImagesMap(mapOfEmotes: Map<string, IEmoteDataEntry>): { name: string, url: string }[] {

    // }

    private buildEmoteMap(emoteData: IEmoteDataEntry[]): Map<string, IEmoteDataEntry> {
        const map = new Map<string, IEmoteDataEntry>();
        emoteData.forEach(emote => {
          emote.names.forEach(name => {
                map.set(name, emote);
            });
        });
        return map;
    }
}
