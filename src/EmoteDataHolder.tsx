import * as React from 'react';

// import { EmoteRender } from './EmoteRender';
// import { EmoteText } from './EmoteText';
import { EmoteForm } from './EmoteForm';

import { EmoteMap, EmoteObject, EmoteObjectSerializer, IEmoteDataEntry } from 'emotes';

const emoteObjectSerializer = new EmoteObjectSerializer();

interface EmoteDataHolderProps {
    emoteMap: EmoteMap;
    emoteObject: EmoteObject;
    emoteObjectDataChanged: () => void;
}

interface EmoteDataHolderState {
    currentEmoteDataEntry: IEmoteDataEntry;
    firstLineSupported: boolean;
    secondLineSupported: boolean;
}

export class EmoteDataHolder extends React.Component<EmoteDataHolderProps, EmoteDataHolderState> {
    constructor(props: EmoteDataHolderProps) {
        super(props);

        const emoteDataEntry = props.emoteMap.findEmote(props.emoteObject.emoteIdentifier);
        this.state = this.createStateForEmoteDataEntry(emoteDataEntry);

        // bind these here so we can just pass it as-is to child components
        this.refreshEmoteObjectState = this.refreshEmoteObjectState.bind(this);

        this.emoteIdentifierChanged = this.emoteIdentifierChanged.bind(this);
        this.speedChanged = this.speedChanged.bind(this);
        this.slideChanged = this.slideChanged.bind(this);
        this.vibrateChanged = this.vibrateChanged.bind(this);
        this.reverseChanged = this.reverseChanged.bind(this);
        this.hueRotateChanged = this.hueRotateChanged.bind(this);
        this.invertColorsChanged = this.invertColorsChanged.bind(this);
        this.spinChanged = this.spinChanged.bind(this);
        this.rotateDegreesChanged = this.rotateDegreesChanged.bind(this);
        this.brodyChanged = this.brodyChanged.bind(this);
        this.xAxisTransposeChanged = this.xAxisTransposeChanged.bind(this);
        this.zAxisTransposeChanged = this.zAxisTransposeChanged.bind(this);
        this.firstLineTextChanged = this.firstLineTextChanged.bind(this);
        this.secondLineTextChanged = this.secondLineTextChanged.bind(this);
        this.altTextChanged = this.altTextChanged.bind(this);
    }

    refreshEmoteObjectState() {
        // update these just so they're consistent with the rest of the values in the object
        this.props.emoteObject.originalString = emoteObjectSerializer.serialize(this.props.emoteObject);
        this.props.emoteObject.flagsString = emoteObjectSerializer.serializeFlags(this.props.emoteObject);

        this.props.emoteObjectDataChanged();
    }

    createStateForEmoteDataEntry(newEmoteDataEntry: IEmoteDataEntry): EmoteDataHolderState {
        return {
            currentEmoteDataEntry: newEmoteDataEntry,
            firstLineSupported: !!newEmoteDataEntry['em-top'],
            secondLineSupported: !!newEmoteDataEntry['strong-bottom'],
        };
    }

    emoteIdentifierChanged(newValue: string) {
        this.props.emoteObject.emoteIdentifier = newValue;

        const newEmoteDataEntry = this.props.emoteMap.findEmote(this.props.emoteObject.emoteIdentifier);
        if (newEmoteDataEntry && newEmoteDataEntry !== this.state.currentEmoteDataEntry) {
            const newState = this.createStateForEmoteDataEntry(newEmoteDataEntry);

            // clear first and second line contents if they're not supported
            if (newState.firstLineSupported === false) {
                this.props.emoteObject.firstLineText = '';
            }
            if (newState.secondLineSupported === false) {
                this.props.emoteObject.secondLineText = '';
            }
            this.setState(newState);
        }

        this.refreshEmoteObjectState();
    }

    speedChanged(newValue: string) {
        this.props.emoteObject.speed = newValue;
        this.refreshEmoteObjectState();
    }

    slideChanged(newValue: boolean) {
        this.props.emoteObject.slide = newValue;
        this.refreshEmoteObjectState();
    }

    vibrateChanged(newValue: boolean) {
        this.props.emoteObject.vibrate = newValue;
        this.refreshEmoteObjectState();
    }

    reverseChanged(newValue: boolean) {
        this.props.emoteObject.reverse = newValue;
        this.refreshEmoteObjectState();
    }

    hueRotateChanged(newValue: boolean) {
        this.props.emoteObject.hueRotate = newValue;
        this.refreshEmoteObjectState();
    }

    invertColorsChanged(newValue: boolean) {
        this.props.emoteObject.invertColors = newValue;
        this.refreshEmoteObjectState();
    }

    spinChanged(newValue: string) {
        this.props.emoteObject.spin = newValue;
        this.refreshEmoteObjectState();
    }

    rotateDegreesChanged(newValue: number) {
        this.props.emoteObject.rotateDegrees = newValue;
        this.refreshEmoteObjectState();
    }

    brodyChanged(newValue: boolean) {
        this.props.emoteObject.brody = newValue;
        this.refreshEmoteObjectState();
    }

    xAxisTransposeChanged(newValue: number) {
        this.props.emoteObject.xAxisTranspose = newValue;
        this.refreshEmoteObjectState();
    }

    zAxisTransposeChanged(newValue: number) {
        this.props.emoteObject.zAxisTranspose = newValue;
        this.refreshEmoteObjectState();
    }

    firstLineTextChanged(newValue: string) {
        this.props.emoteObject.firstLineText = newValue;
        this.refreshEmoteObjectState();
    }

    secondLineTextChanged(newValue: string) {
        this.props.emoteObject.secondLineText = newValue;
        this.refreshEmoteObjectState();
    }

    altTextChanged(newValue: string) {
        this.props.emoteObject.altText = newValue;
        this.refreshEmoteObjectState();
    }

    render() {
        return (
            <EmoteForm
                emoteMap={this.props.emoteMap}
                emoteIdentifierChanged={this.emoteIdentifierChanged}
                speedChanged={this.speedChanged}
                slideChanged={this.slideChanged}
                vibrateChanged={this.vibrateChanged}
                reverseChanged={this.reverseChanged}
                hueRotateChanged={this.hueRotateChanged}
                invertColorsChanged={this.invertColorsChanged}
                spinChanged={this.spinChanged}
                rotateDegreesChanged={this.rotateDegreesChanged}
                brodyChanged={this.brodyChanged}
                xAxisTransposeChanged={this.xAxisTransposeChanged}
                zAxisTransposeChanged={this.zAxisTransposeChanged}
                firstLineTextChanged={this.firstLineTextChanged}
                secondLineTextChanged={this.secondLineTextChanged}
                altTextChanged={this.altTextChanged}
                emoteObject={this.props.emoteObject}
                currentEmoteDataEntry={this.state.currentEmoteDataEntry}
                firstLineSupported={this.state.firstLineSupported}
                secondLineSupported={this.state.secondLineSupported}
            />
        );
    }
}
