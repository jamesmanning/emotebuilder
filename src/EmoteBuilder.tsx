import * as React from 'react';
import './EmoteBuilder.css';
import { EmoteDataHolder } from './EmoteDataHolder';
import { EmoteMap } from 'emotes';
import { emoteData } from './SampleData';

const emoteMap = new EmoteMap(emoteData);
// const emoteExpansionOptions = new EmoteExpansionOptions();
// const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);

interface EmoteBuilderProps {
}

interface EmoteBuilderState {
    numberOfEmotes: '1' | '2' | '3' | '4';
}

export class EmoteBuilder extends React.Component<EmoteBuilderProps, EmoteBuilderState> {
    constructor(props: EmoteBuilderProps) {
        super(props);
        this.state = {
            numberOfEmotes: '1'
        };

        this.numberOfEmotesHandler = this.numberOfEmotesHandler.bind(this);
    }

    numberOfEmotesHandler(event: React.FormEvent<HTMLSelectElement>) {
        this.setState({ numberOfEmotes: event.currentTarget.checked });
    }

    // onNumberOfEmotesChanged() {
    //     if (this.numberOfEmotes < this.emoteObjects.length) {
    //       // truncating
    //       this.emoteObjects.length = this.numberOfEmotes;
    //     } else {
    //       // expanding, so fill in new ones as needed
    //       while (this.emoteObjects.length < this.numberOfEmotes) {
    //         const defaultEmoteInSlot = this.defaultEmoteObjects[this.emoteObjects.length];
    //         this.emoteObjects.push(defaultEmoteInSlot);
    //       }
    //     }
    //     this.refreshSerializedAndExpandedEmotes();
    //   }
    
    render() {
        // const dataHolderSize = 12 / this.state.numberOfEmotes;
        // const dataHolders
        return (
            <div className="container-fluid theme-showcase" role="main">
                {/* header stuff row */}
                <div className="row">
                    <div className="col-md-3">
                        <label>Number of emotes:
                            <select
                                defaultValue={this.state.numberOfEmotes}
                                onChange={this.numberOfEmotesHandler}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </label>
                    </div>
                    <div className="col-md-9">
                        import existing string thing goes here
                    </div>
                </div>
                {/* actual emote objects row */}
                <div className="row">
                    <EmoteDataHolder emoteMap={emoteMap} />
                </div>
                {/* output row */}
                <div className="row">
                    output stuff goes here
                </div>
            </div>
        );
    }
}
