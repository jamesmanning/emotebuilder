import * as React from 'react';
import { EmoteDataHolder } from './EmoteDataHolder';
import { EmoteArrayRender } from './EmoteArrayRender';
import { EmoteArrayText } from './EmoteArrayText';
import { EmoteMap, EmoteObject, EmoteObjectBuilder, IEmoteDataEntry } from 'emotes';
import { bootstrapEmoteData } from './SampleData';
import './EmoteBuilder.css';

interface EmoteBuilderProps {
}

interface EmoteBuilderState {
    emoteObjects: EmoteObject[];
    emoteMap: EmoteMap;
}

export class EmoteBuilder extends React.Component<EmoteBuilderProps, EmoteBuilderState> {
    private defaultEmoteObjects = [
        EmoteObjectBuilder.create({
            emoteIdentifier: 'adviceajlie',
            firstLineText: 'apples?',
            secondLineText: 'I didn\'t see any apples',
        }),
        EmoteObjectBuilder.create({
            emoteIdentifier: 'ivyrage',
        }),
        EmoteObjectBuilder.create({
            emoteIdentifier: 'keystrokeguitar',
        }),
        EmoteObjectBuilder.create({
            emoteIdentifier: 'rdwut',
        }),
    ];

    constructor(props: EmoteBuilderProps) {
        super(props);
        this.state = {
            emoteObjects: [
                EmoteObjectBuilder.clone(this.defaultEmoteObjects[0]),
                EmoteObjectBuilder.clone(this.defaultEmoteObjects[1]),
            ],
            emoteMap: new EmoteMap(bootstrapEmoteData),
        };

        this.numberOfEmotesChanged = this.numberOfEmotesChanged.bind(this);
        this.emoteObjectDataChanged = this.emoteObjectDataChanged.bind(this);

        this.populateEmoteMap(); // kick off loading the real emote data
    }

    async populateEmoteMap() {
        const response = await fetch('//berrymotes.com/assets/berrymotes_json_data.json');
        const emoteData: IEmoteDataEntry[] = await response.json();
        this.state.emoteMap.loadData(emoteData);
        this.setState({}); // trigger a re-render so count updates
    }

    numberOfEmotesChanged(event: React.FormEvent<HTMLSelectElement>) {
        const targetNumberOfEmotes = Number(event.currentTarget.value);
        const newEmoteObjects = this.state.emoteObjects;

        if (targetNumberOfEmotes < newEmoteObjects.length) {
            // truncating
            newEmoteObjects.length = targetNumberOfEmotes;
        } else {
            // expanding, so fill in new ones as needed
            while (newEmoteObjects.length < targetNumberOfEmotes) {
                const defaultEmoteInSlot = this.defaultEmoteObjects[newEmoteObjects.length];
                newEmoteObjects.push(EmoteObjectBuilder.clone(defaultEmoteInSlot));
            }
        }

        this.setState({
            emoteObjects: newEmoteObjects,
        });
    }

    emoteObjectDataChanged() {
        // the emote objects are already in the state, we just need to signal a rerender is needed
        this.setState({}); 
    }

    render() {
        const dataHolderColumnSizeClass = `col-md-${12 / Number(this.state.emoteObjects.length)}`;
        const dataHolders = this.state.emoteObjects.map((emoteObject, emoteObjectIndex) => (
            <div className={dataHolderColumnSizeClass} key={emoteObjectIndex}>
                <EmoteDataHolder
                    emoteMap={this.state.emoteMap}
                    emoteObject={emoteObject}
                    emoteObjectDataChanged={this.emoteObjectDataChanged}
                />
            </div>
        ));
        return (
            <div className="container-fluid theme-showcase" role="main">
                {/* header stuff row */}
                <div className="row">
                    <div className="col-md-3">
                        <label>Number of emotes:
                            <select
                                defaultValue={this.state.emoteObjects.length.toString()}
                                onChange={this.numberOfEmotesChanged}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </label>
                    </div>
                    <div className="col-md-3">
                        <label>
                            Available emote count: {this.state.emoteMap.emoteCount}
                        </label>
                    </div>
                    <div className="col-md-6">
                        <form className="form-horizontal">
                            <label>
                                Import existing emote string:
                                <input type="text" name="existingEmoteString" placeholder="like [](/ajlie)" />
                            </label>
                            <button className="btn btn-primary" type="submit">Import</button>
                        </form>
                    </div>
                </div>
                {/* actual emote objects row */}
                <div className="row">
                    {dataHolders}
                </div>
                {/* output row */}
                <div className="row">
                    <EmoteArrayRender emoteMap={this.state.emoteMap} emoteObjects={this.state.emoteObjects} />
                    <br />
                    <EmoteArrayText emoteObjects={this.state.emoteObjects} />
                </div>
            </div >
        );
    }
}
