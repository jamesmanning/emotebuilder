import * as React from 'react';

import {default as EmoteRender} from './EmoteRender';
import {default as EmoteText} from './EmoteText';
import {default as EmoteForm} from './EmoteForm';

import {EmoteMap, EmoteHtml, EmoteObject, HtmlOutputData, EmoteObjectSerializer} from 'emotes';

const emoteObjectSerializer = new EmoteObjectSerializer();

interface EmoteDataHolderProps {
  emoteMap: EmoteMap,
}

interface EmoteDataHolderState {
  emoteObject: EmoteObject,
}

const emoteObject = {
  originalString: '[*first line* **second line** some alt text](/adviceajlie-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5)',
  emoteIdentifier: 'adviceajlie',
  flagsString: '-v-r-brody-slide-fastest-!zspin-i-invert-270-x99-z5',

  speed: "fastest",
  slide: true,

  vibrate: true,
  reverse: true,
  hueRotate: true,
  invertColors: true,
  spin: "!zspin",
  rotateDegrees: 270,
  brody: true,
  xAxisTranspose: 99,
  zAxisTranspose: 5,

  // vibrate: false,
  // reverse: false,
  // hueRotate: false,
  // invertColors: false,
  // spin: "",
  // rotateDegrees: 0,
  // brody: false,
  // xAxisTranspose: 0,
  // zAxisTranspose: 0,

  firstLineText: "first line",
  secondLineText: "second line",
  // altText: "some alt text"
} as EmoteObject;

export default class EmoteDataHolder extends React.Component<EmoteDataHolderProps, EmoteDataHolderState> {
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


    emoteIdentifierChangeHandler(event) {
      this.state.emoteObject.emoteIdentifier = event.target.value;
      this.refreshEmoteState();
    }


    speedChangeHandler(event) {
      this.state.emoteObject.speed = event.target.value;
      this.refreshEmoteState();
    }


    slideChangeHandler(event) {
      this.state.emoteObject.slide = event.target.checked;
      this.refreshEmoteState();
    }


    vibrateChangeHandler(event) {
      this.state.emoteObject.vibrate = event.target.checked;
      this.refreshEmoteState();
    }


    reverseChangeHandler(event) {
      this.state.emoteObject.reverse = event.target.checked;
      this.refreshEmoteState();
    }


    hueRotateChangeHandler(event) {
      this.state.emoteObject.hueRotate = event.target.checked;
      this.refreshEmoteState();
    }


    invertColorsChangeHandler(event) {
      this.state.emoteObject.invertColors = event.target.checked;
      this.refreshEmoteState();
    }


    spinChangeHandler(event) {
      this.state.emoteObject.spin = event.target.value;
      this.refreshEmoteState();
    }


    rotateDegreesChangeHandler(event) {
      this.state.emoteObject.rotateDegrees = Number(event.target.value);
      this.refreshEmoteState();
    }


    brodyChangeHandler(event) {
      this.state.emoteObject.brody = event.target.checked;
      this.refreshEmoteState();
    }


    xAxisTransposeChangeHandler(event) {
      this.state.emoteObject.xAxisTranspose = Number(event.target.value);
      this.refreshEmoteState();
    }


    zAxisTransposeChangeHandler(event) {
      this.state.emoteObject.zAxisTranspose = Number(event.target.value);
      this.refreshEmoteState();
    }


    firstLineTextChangeHandler(event) {
      this.state.emoteObject.firstLineText = event.target.value;
      this.refreshEmoteState();
    }


    secondLineTextChangeHandler(event) {
      this.state.emoteObject.secondLineText = event.target.value;
      this.refreshEmoteState();
    }


    altTextChangeHandler(event) {
      this.state.emoteObject.altText = event.target.value;
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
          emoteObject={this.state.emoteObject} />
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
