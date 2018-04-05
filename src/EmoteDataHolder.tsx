import * as React from 'react';

import { EmoteRender } from './EmoteRender';
import { EmoteText } from './EmoteText';
import { EmoteForm } from './EmoteForm';

import { EmoteMap, EmoteObject, EmoteObjectSerializer } from 'emotes';

const emoteObjectSerializer = new EmoteObjectSerializer();

interface EmoteDataHolderProps {
    emoteMap: EmoteMap;
}

interface EmoteDataHolderState {
    emoteObject: EmoteObject;
}

const emoteObject = {
    originalString: '[*first line* **second line** some alt text]' +
        '(/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5)',
    emoteIdentifier: 'adviceajlie',
    flagsString: '-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5',

    speed: 'fastest',
    slide: true,

    vibrate: true,
    reverse: true,
    hueRotate: true,
    invertColors: true,
    spin: '!zspin',
    rotateDegrees: 270,
    brody: true,
    xAxisTranspose: 99,
    zAxisTranspose: 5,

    firstLineText: 'first line',
    secondLineText: 'second line',
    // altText: 'some alt text'
} as EmoteObject;

export class EmoteDataHolder extends React.Component<EmoteDataHolderProps, EmoteDataHolderState> {
    constructor(props: EmoteDataHolderProps) {
        super(props);

        this.state = {
            emoteObject,
        };

        // bind these here so we can just pass it as-is to child components
        this.refreshEmoteState = this.refreshEmoteState.bind(this);

        this.emoteIdentifierChangeHandler = this.emoteIdentifierChangeHandler.bind(this);
        this.speedChangeHandler = this.speedChangeHandler.bind(this);
        this.slideChangeHandler = this.slideChangeHandler.bind(this);
        this.vibrateChangeHandler = this.vibrateChangeHandler.bind(this);
        this.reverseChangeHandler = this.reverseChangeHandler.bind(this);
        this.hueRotateChangeHandler = this.hueRotateChangeHandler.bind(this);
        this.invertColorsChangeHandler = this.invertColorsChangeHandler.bind(this);
        this.spinChangeHandler = this.spinChangeHandler.bind(this);
        this.rotateDegreesChangeHandler = this.rotateDegreesChangeHandler.bind(this);
        this.brodyChangeHandler = this.brodyChangeHandler.bind(this);
        this.xAxisTransposeChangeHandler = this.xAxisTransposeChangeHandler.bind(this);
        this.zAxisTransposeChangeHandler = this.zAxisTransposeChangeHandler.bind(this);
        this.firstLineTextChangeHandler = this.firstLineTextChangeHandler.bind(this);
        this.secondLineTextChangeHandler = this.secondLineTextChangeHandler.bind(this);
        this.altTextChangeHandler = this.altTextChangeHandler.bind(this);
    }

    refreshEmoteState() {
        // update these just so they're consistent with the rest of the values in the object
        emoteObject.originalString = emoteObjectSerializer.serialize(this.state.emoteObject);
        emoteObject.flagsString = emoteObjectSerializer.serializeFlags(this.state.emoteObject);

        // setState so it'll flow the props down to children
        this.setState({
            emoteObject: this.state.emoteObject,
        });
    }

    emoteIdentifierChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.emoteIdentifier = event.currentTarget.value;
        this.refreshEmoteState();
    }

    speedChangeHandler(event: React.FormEvent<HTMLSelectElement>) {
        this.state.emoteObject.speed = event.currentTarget.value;
        this.refreshEmoteState();
    }

    slideChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.slide = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    vibrateChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.vibrate = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    reverseChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.reverse = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    hueRotateChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.hueRotate = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    invertColorsChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.invertColors = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    spinChangeHandler(event: React.FormEvent<HTMLSelectElement>) {
        this.state.emoteObject.spin = event.currentTarget.value;
        this.refreshEmoteState();
    }

    rotateDegreesChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.rotateDegrees = Number(event.currentTarget.value);
        this.refreshEmoteState();
    }

    brodyChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.brody = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    xAxisTransposeChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.xAxisTranspose = Number(event.currentTarget.value);
        this.refreshEmoteState();
    }

    zAxisTransposeChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.zAxisTranspose = Number(event.currentTarget.value);
        this.refreshEmoteState();
    }

    firstLineTextChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.firstLineText = event.currentTarget.value;
        this.refreshEmoteState();
    }

    secondLineTextChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.secondLineText = event.currentTarget.value;
        this.refreshEmoteState();
    }

    altTextChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.state.emoteObject.altText = event.currentTarget.value;
        this.refreshEmoteState();
    }

    render() {
        return (
            <div>
                <EmoteForm
                    emoteIdentifierChangeHandler={this.emoteIdentifierChangeHandler}
                    speedChangeHandler={this.speedChangeHandler}
                    slideChangeHandler={this.slideChangeHandler}
                    vibrateChangeHandler={this.vibrateChangeHandler}
                    reverseChangeHandler={this.reverseChangeHandler}
                    hueRotateChangeHandler={this.hueRotateChangeHandler}
                    invertColorsChangeHandler={this.invertColorsChangeHandler}
                    spinChangeHandler={this.spinChangeHandler}
                    rotateDegreesChangeHandler={this.rotateDegreesChangeHandler}
                    brodyChangeHandler={this.brodyChangeHandler}
                    xAxisTransposeChangeHandler={this.xAxisTransposeChangeHandler}
                    zAxisTransposeChangeHandler={this.zAxisTransposeChangeHandler}
                    firstLineTextChangeHandler={this.firstLineTextChangeHandler}
                    secondLineTextChangeHandler={this.secondLineTextChangeHandler}
                    altTextChangeHandler={this.altTextChangeHandler}
                    emoteObject={this.state.emoteObject} 
                />
                <br />
                <br />
                <br />
                <br />
                <EmoteRender emoteMap={this.props.emoteMap} emoteObject={this.state.emoteObject} />
                <br />
                <br />
                <br />
                <br />
                <EmoteText emoteObject={this.state.emoteObject} />
            </div>
        );
    }
}
