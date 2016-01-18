import * as React from 'react';
import {EmoteObject} from 'emotes';

interface EmoteFormProps {
  emoteObject: EmoteObject,

  emoteIdentifierChangeHandler: (event : any) => void,
  speedChangeHandler          : (event : any) => void,
  slideChangeHandler          : (event : any) => void,
  vibrateChangeHandler        : (event : any) => void,
  reverseChangeHandler        : (event : any) => void,
  hueRotateChangeHandler      : (event : any) => void,
  invertColorsChangeHandler   : (event : any) => void,
  spinChangeHandler           : (event : any) => void,
  rotateDegreesChangeHandler  : (event : any) => void,
  brodyChangeHandler          : (event : any) => void,
  xAxisTransposeChangeHandler : (event : any) => void,
  zAxisTransposeChangeHandler : (event : any) => void,
  firstLineTextChangeHandler  : (event : any) => void,
  secondLineTextChangeHandler : (event : any) => void,
  altTextChangeHandler        : (event : any) => void,
}


export default class EmoteForm extends React.Component<EmoteFormProps, any> {
  constructor(props: EmoteFormProps) {
    super(props);
  }

  render() {
    return (
      <div>
      <label>emoteIdentifier: <input type="text" value={this.props.emoteObject.emoteIdentifier} onChange={this.props.emoteIdentifierChangeHandler} /></label><br/>
      <label>slide: <input type="checkbox" checked={this.props.emoteObject.slide} onChange={this.props.slideChangeHandler} /></label>
      {!this.props.emoteObject.slide ? '' :
        <label>speed: <input type="text" value={this.props.emoteObject.speed} onChange={this.props.speedChangeHandler} /></label>
      }
      {!this.props.emoteObject.slide ? '' :
        <label>speed:
          <select defaultValue="{this.props.emoteObject.speed}" onChange={this.props.speedChangeHandler}>
            <option value="">-- optional slide speed modifier --</option>
            <option>slowest</option>
            <option>slower</option>
            <option>slow</option>
            <option>fast</option>
            <option>faster</option>
            <option>fastest</option>
          </select>
        </label>
      }
      <br/>

      <label>vibrate: <input type="checkbox" checked={this.props.emoteObject.vibrate} onChange={this.props.vibrateChangeHandler} /></label><br/>
      <label>reverse: <input type="checkbox" checked={this.props.emoteObject.reverse} onChange={this.props.reverseChangeHandler} /></label><br/>
      <label>hueRotate: <input type="checkbox" checked={this.props.emoteObject.hueRotate} onChange={this.props.hueRotateChangeHandler} /></label><br/>
      <label>invertColors: <input type="checkbox" checked={this.props.emoteObject.invertColors} onChange={this.props.invertColorsChangeHandler} /></label><br/>
      <label>spin:
        <select defaultValue="{this.props.emoteObject.spin}" onChange={this.props.spinChangeHandler}>
          <option value="">-- optional spin --</option>
          <option value="xspin">spin clockwise around x axis</option>
          <option value="yspin">spin clockwise around y axis</option>
          <option value="zspin">spin clockwise around z axis</option>
          <option value="spin">spin clockwise around all 3 axes</option>
          <option value="!xspin">spin counterclockwise around x axis</option>
          <option value="!yspin">spin counterclockwise around y axis</option>
          <option value="!zspin">spin counterclockwise around z axis</option>
          <option value="!spin">spin counterclockwise around all 3 axes</option>
        </select>
      </label><br/>
      <label>rotateDegrees:
        <input
          type="number"
          min="0" max="359" step="1"
          value={this.props.emoteObject.rotateDegrees.toString()}
          onChange={this.props.rotateDegreesChangeHandler}/>
      </label><br/>
      <label>brody: <input type="checkbox" checked={this.props.emoteObject.brody} onChange={this.props.brodyChangeHandler} /></label><br/>
      <label>xAxisTranspose:
        <input
          type="number"
          min="-150" max="150" step="1"
          value={this.props.emoteObject.xAxisTranspose.toString()}
          onChange={this.props.xAxisTransposeChangeHandler}/>
      </label><br/>
      <label>zAxisTranspose:
        <input
          type="number"
          min="0" max="10" step="1"
          value={this.props.emoteObject.zAxisTranspose.toString()}
          onChange={this.props.zAxisTransposeChangeHandler}/>
      </label><br/>
      <label>firstLineText: <input type="text" value={this.props.emoteObject.firstLineText} onChange={this.props.firstLineTextChangeHandler} /></label><br/>
      <label>secondLineText: <input type="text" value={this.props.emoteObject.secondLineText} onChange={this.props.secondLineTextChangeHandler} /></label><br/>
      <label>altText: <input type="text" value={this.props.emoteObject.altText} onChange={this.props.altTextChangeHandler} /></label><br/>

      </div>
    );
	}
}
