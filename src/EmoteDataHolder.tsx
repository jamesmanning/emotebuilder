import * as React from 'react';

// import { EmoteRender } from './EmoteRender';
// import { EmoteText } from './EmoteText';
import { EmoteForm } from './EmoteForm';

import { EmoteMap, EmoteObject, EmoteObjectSerializer } from 'emotes';

const emoteObjectSerializer = new EmoteObjectSerializer();

interface EmoteDataHolderProps {
    emoteMap: EmoteMap;
    emoteObject: EmoteObject;
    emoteObjectDataChanged: () => void;
}

export class EmoteDataHolder extends React.Component<EmoteDataHolderProps, {}> {
    constructor(props: EmoteDataHolderProps) {
        super(props);

        // bind these here so we can just pass it as-is to child components
        this.refreshEmoteObjectState = this.refreshEmoteObjectState.bind(this);

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

    refreshEmoteObjectState() {
        // update these just so they're consistent with the rest of the values in the object
        this.props.emoteObject.originalString = emoteObjectSerializer.serialize(this.props.emoteObject);
        this.props.emoteObject.flagsString = emoteObjectSerializer.serializeFlags(this.props.emoteObject);

        this.props.emoteObjectDataChanged();
    }

    emoteIdentifierChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.emoteIdentifier = event.currentTarget.value;
        this.refreshEmoteObjectState();
    }

    speedChangeHandler(event: React.FormEvent<HTMLSelectElement>) {
        this.props.emoteObject.speed = event.currentTarget.value;
        this.refreshEmoteObjectState();
    }

    slideChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.slide = event.currentTarget.checked;
        this.refreshEmoteObjectState();
    }

    vibrateChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.vibrate = event.currentTarget.checked;
        this.refreshEmoteObjectState();
    }

    reverseChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.reverse = event.currentTarget.checked;
        this.refreshEmoteObjectState();
    }

    hueRotateChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.hueRotate = event.currentTarget.checked;
        this.refreshEmoteObjectState();
    }

    invertColorsChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.invertColors = event.currentTarget.checked;
        this.refreshEmoteObjectState();
    }

    spinChangeHandler(event: React.FormEvent<HTMLSelectElement>) {
        this.props.emoteObject.spin = event.currentTarget.value;
        this.refreshEmoteObjectState();
    }

    rotateDegreesChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.rotateDegrees = Number(event.currentTarget.value);
        this.refreshEmoteObjectState();
    }

    brodyChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.brody = event.currentTarget.checked;
        this.refreshEmoteObjectState();
    }

    xAxisTransposeChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.xAxisTranspose = Number(event.currentTarget.value);
        this.refreshEmoteObjectState();
    }

    zAxisTransposeChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.zAxisTranspose = Number(event.currentTarget.value);
        this.refreshEmoteObjectState();
    }

    firstLineTextChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.firstLineText = event.currentTarget.value;
        this.refreshEmoteObjectState();
    }

    secondLineTextChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.secondLineText = event.currentTarget.value;
        this.refreshEmoteObjectState();
    }

    altTextChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.emoteObject.altText = event.currentTarget.value;
        this.refreshEmoteObjectState();
    }

    render() {
        return (
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
        );
    }
}
