import * as React from 'react';
import { EmoteObject, IEmoteDataEntry, EmoteMap } from 'emotes';
import { EmoteAutosuggest } from './EmoteAutosuggest';
import './EmoteForm.css';

interface EmoteFormProps {
    emoteMap: EmoteMap;
    emoteObject: EmoteObject;
    currentEmoteDataEntry: IEmoteDataEntry;
    firstLineSupported: boolean;
    secondLineSupported: boolean;

    emoteIdentifierChanged: (newValue: string) => void;
    speedChanged: (newValue: string) => void;
    slideChanged: (newValue: boolean) => void;
    vibrateChanged: (newValue: boolean) => void;
    reverseChanged: (newValue: boolean) => void;
    hueRotateChanged: (newValue: boolean) => void;
    invertColorsChanged: (newValue: boolean) => void;
    spinChanged: (newValue: string) => void;
    rotateDegreesChanged: (newValue: number) => void;
    brodyChanged: (newValue: boolean) => void;
    xAxisTransposeChanged: (newValue: number) => void;
    zAxisTransposeChanged: (newValue: number) => void;
    firstLineTextChanged: (newValue: string) => void;
    secondLineTextChanged: (newValue: string) => void;
    altTextChanged: (newValue: string) => void;
}

export class EmoteForm extends React.Component<EmoteFormProps, {}> {
    constructor(props: EmoteFormProps) {
        super(props);
    }

    render() {
        // const emoteIdentifierIsValid = 
        //     this.props.emoteMap.findEmote(this.props.emoteObject.emoteIdentifier) !== null;
        return (
            <form className="form-horizontal">
                <fieldset>
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="emoteName">Emote Name</label>
                        <div className="col-md-8">
                            {/* <input
                                id="emoteName"
                                name="emoteName"
                                type="text"
                                value={this.props.emoteObject.emoteIdentifier}
                                onChange={this.props.emoteIdentifierChanged}
                                className="form-control input-md"
                                style={{backgroundColor: emoteIdentifierIsValid ? 'lightgreen' : 'red'}}
                                placeholder="emote name (bpsign, ajlie, etc)"
                            /> */}
                            <EmoteAutosuggest
                            />
                        </div>
                    </div>

                    {this.props.firstLineSupported &&
                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="firstLineText">First Line of Text</label>
                            <div className="col-md-8">
                                <input
                                    id="firstLineText"
                                    name="firstLineText"
                                    className="form-control input-md"
                                    type="text"
                                    value={this.props.emoteObject.firstLineText}
                                    onChange={event => this.props.firstLineTextChanged(event.currentTarget.value)}
                                    placeholder="first line of text"
                                />
                            </div>
                        </div>
                    }

                    {this.props.secondLineSupported &&
                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="secondLineText">
                                Second Line of Text
                            </label>
                            <div className="col-md-8">
                                <input
                                    id="secondLineText"
                                    name="secondLineText"
                                    className="form-control input-md"
                                    type="text"
                                    value={this.props.emoteObject.secondLineText}
                                    onChange={event => this.props.secondLineTextChanged(event.currentTarget.value)}
                                    placeholder="second line of text"
                                />
                            </div>
                        </div>
                    }

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="altText">Regular Alt Text</label>
                        <div className="col-md-8">
                            <input
                                id="altText"
                                name="altText"
                                className="form-control input-md"
                                type="text"
                                value={this.props.emoteObject.altText}
                                onChange={event => this.props.altTextChanged(event.currentTarget.value)}
                                placeholder="regular alt text"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="checkboxes">Optional modifiers</label>
                        <div className="col-md-2">
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.vibrate}
                                        onChange={event => this.props.vibrateChanged(event.currentTarget.checked)}
                                    />
                                    vibrate
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.reverse}
                                        onChange={event => this.props.reverseChanged(event.currentTarget.checked)}
                                    />
                                    reverse
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.brody}
                                        onChange={event => this.props.brodyChanged(event.currentTarget.checked)}
                                    />
                                    brody
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.hueRotate}
                                        onChange={event => this.props.hueRotateChanged(event.currentTarget.checked)}
                                    />
                                    hue shift
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.invertColors}
                                        onChange={event => this.props.invertColorsChanged(event.currentTarget.checked)}
                                    />
                                    invert colors
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.slide}
                                        onChange={event => this.props.slideChanged(event.currentTarget.checked)}
                                    />
                                    slide
                                </label>
                                {this.props.emoteObject.slide &&
                                    <select
                                        defaultValue={this.props.emoteObject.speed}
                                        onChange={event => this.props.speedChanged(event.currentTarget.value)}
                                    >
                                        <option value="">-- optional slide speed modifier --</option>
                                        <option value="slowest">slowest</option>
                                        <option value="slower">slower</option>
                                        <option value="slow">slow</option>
                                        <option value="fast">fast</option>
                                        <option value="faster">faster</option>
                                        <option value="fastest">fastest</option>
                                    </select>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="spin">Spin</label>
                        <div className="col-md-8">
                            <select
                                className="form-control"
                                id="spin"
                                name="spin"
                                defaultValue={this.props.emoteObject.spin}
                                onChange={event => this.props.spinChanged(event.currentTarget.value)}
                            >
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
                        </div >
                    </div >

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="rotateDegrees">Rotate (0 to 359)</label>
                        <div className="col-md-8">
                            <div className="input-group">
                                <input
                                    min="0"
                                    max="359"
                                    className="form-control"
                                    id="rotateDegrees"
                                    name="rotateDegrees"
                                    type="number"
                                    value={this.props.emoteObject.rotateDegrees.toString()}
                                    onChange={event => 
                                        this.props.rotateDegreesChanged(Number(event.currentTarget.value))}
                                    placeholder="degrees to rotate"
                                />
                                <span className="input-group-addon">degrees</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="xAxisTranspose">
                            x axis shift (-150 to 150)
                        </label>
                        <div className="col-md-8">
                            <div className="input-group">
                                <input
                                    min="-150"
                                    max="150"
                                    className="form-control"
                                    id="xAxisTranspose"
                                    name="xAxisTranspose"
                                    type="number"
                                    value={this.props.emoteObject.xAxisTranspose.toString()}
                                    onChange={event =>
                                        this.props.xAxisTransposeChanged(Number(event.currentTarget.value))}
                                    placeholder="x axis shift"
                                />
                                <span className="input-group-addon">pixels</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="zAxisTranspose">z index (0 to 10)</label>
                        <div className="col-md-8">
                            <input
                                min="0"
                                max="10"
                                className="form-control"
                                id="zAxisTranspose"
                                name="zAxisTranspose"
                                type="number"
                                value={this.props.emoteObject.zAxisTranspose.toString()}
                                onChange={event => this.props.zAxisTransposeChanged(Number(event.currentTarget.value))}
                                placeholder="z index"
                            />
                        </div>
                    </div>
                </fieldset >
            </form >
        );
    }
}
