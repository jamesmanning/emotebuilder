import * as React from 'react';
import './EmoteBuilder.css';
import { EmoteDataHolder } from './EmoteDataHolder';
import { EmoteArrayRender } from './EmoteArrayRender';
import { EmoteArrayText } from './EmoteArrayText';
import { 
    EmoteMap, EmoteObject, EmoteObjectBuilder, 
    // EmoteObjectSerializer, EmoteHtml, EmoteExpansionOptions 
} from 'emotes';
import { emoteData } from './SampleData';

const emoteMap = new EmoteMap(emoteData);
// const emoteExpansionOptions = new EmoteExpansionOptions();
// const emoteObjectSerializer = new EmoteObjectSerializer();
// const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);

interface EmoteBuilderProps {
}

interface EmoteBuilderState {
    emoteObjects: EmoteObject[];
    // serializedEmotes: string;
    // expandedEmotes: string;
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
        const initialEmoteObjects = [
            EmoteObjectBuilder.clone(this.defaultEmoteObjects[0]),
            EmoteObjectBuilder.clone(this.defaultEmoteObjects[1]),
        ];
        this.state = this.generateNewState(initialEmoteObjects);

        this.numberOfEmotesChangeHandler = this.numberOfEmotesChangeHandler.bind(this);
        this.emoteObjectDataChanged = this.emoteObjectDataChanged.bind(this);
    }
    numberOfEmotesChangeHandler(event: React.FormEvent<HTMLSelectElement>) {
        const targetNumberOfEmotes = Number(event.currentTarget.value);
        const newEmoteObjects = this.state.emoteObjects;

        if (targetNumberOfEmotes < newEmoteObjects.length) {
            // truncating
            newEmoteObjects.length = targetNumberOfEmotes;
        } else {
            // expanding, so fill in new ones as needed
            while (newEmoteObjects.length < targetNumberOfEmotes) {
                const defaultEmoteInSlot = this.defaultEmoteObjects[newEmoteObjects.length];
                newEmoteObjects.push(defaultEmoteInSlot);
            }
        }

        this.setState({
            emoteObjects: newEmoteObjects,
        });
    }

    generateNewState(emoteObjects: EmoteObject[]): EmoteBuilderState {
        const newState: EmoteBuilderState = {
            emoteObjects: emoteObjects,
            // serializedEmotes: emoteObjects
            //     .map(eo => emoteObjectSerializer.serialize(eo))
            //     .join(' '),
            // expandedEmotes: emoteObjects
            //     .map(eo => emoteHtml.getEmoteHtmlForObject(eo))
            //     .join(' '),
        };
        return newState;
    }
    emoteObjectDataChanged() {
        this.setState(this.generateNewState(this.state.emoteObjects));
    }

    render() {
        const dataHolderColumnSizeClass = `col-md-${12 / Number(this.state.emoteObjects.length)}` ;
        const dataHolders = this.state.emoteObjects.map((emoteObject, emoteObjectIndex) => (
            <div className={dataHolderColumnSizeClass}>
                <EmoteDataHolder 
                    emoteMap={emoteMap} 
                    emoteObject={emoteObject} 
                    emoteObjectDataChanged={this.emoteObjectDataChanged} 
                    key={emoteObjectIndex} 
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
                                onChange={this.numberOfEmotesChangeHandler}
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
                    {dataHolders}
                </div>
                {/* output row */}
                <div className="row">
                    <EmoteArrayRender emoteMap={emoteMap} emoteObjects={this.state.emoteObjects} />
                    <br />
                    <EmoteArrayText emoteObjects={this.state.emoteObjects} />
                </div>
            </div>
        );
    }
}
