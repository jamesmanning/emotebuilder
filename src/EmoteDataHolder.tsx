import * as React from 'react';

import { EmoteRender } from './EmoteRender';
import { EmoteText } from './EmoteText';
import { EmoteForm } from './EmoteForm';

import { EmoteMap, EmoteObject, EmoteObjectSerializer } from 'emotes';

const emoteObjectSerializer = new EmoteObjectSerializer();

interface EmoteDataHolderProps {
    emoteMap: EmoteMap;
    emoteObject: EmoteObject;
}

export class EmoteDataHolder extends React.Component<EmoteDataHolderProps, {}> {
    constructor(props: EmoteDataHolderProps) {
        super(props);

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
        this.props.emoteObject.originalString = emoteObjectSerializer.serialize(this.props.emoteObject);
        this.props.emoteObject.flagsString = emoteObjectSerializer.serializeFlags(this.props.emoteObject);
    }

    emoteIdentifierChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.emoteIdentifier = event.currentTarget.value;
        this.refreshEmoteState();
    }

    speedChangeHandler(event: React.FormEvent<HTMLSelectElement>) {
        this.props.emoteObject.speed = event.currentTarget.value;
        this.refreshEmoteState();
    }

    slideChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.slide = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    vibrateChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.vibrate = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    reverseChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.reverse = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    hueRotateChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.hueRotate = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    invertColorsChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.invertColors = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    spinChangeHandler(event: React.FormEvent<HTMLSelectElement>) {
        this.props.emoteObject.spin = event.currentTarget.value;
        this.refreshEmoteState();
    }

    rotateDegreesChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.rotateDegrees = Number(event.currentTarget.value);
        this.refreshEmoteState();
    }

    brodyChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.brody = event.currentTarget.checked;
        this.refreshEmoteState();
    }

    xAxisTransposeChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.xAxisTranspose = Number(event.currentTarget.value);
        this.refreshEmoteState();
    }

    zAxisTransposeChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.zAxisTranspose = Number(event.currentTarget.value);
        this.refreshEmoteState();
    }

    firstLineTextChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.firstLineText = event.currentTarget.value;
        this.refreshEmoteState();
    }

    secondLineTextChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.secondLineText = event.currentTarget.value;
        this.refreshEmoteState();
    }

    altTextChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.altText = event.currentTarget.value;
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
                    emoteObject={this.props.emoteObject} 
                />
                <br />
                <br />
                <br />
                <br />
                <EmoteRender emoteMap={this.props.emoteMap} emoteObject={this.props.emoteObject} />
                <br />
                <br />
                <br />
                <br />
                <EmoteText emoteObject={this.props.emoteObject} />
            </div>
        );
    }
}
