import * as React from 'react';
import { EmoteObject, IEmoteDataEntry, EmoteMap } from 'emotes';
import { Typeahead } from 'react-bootstrap-typeahead';
import './EmoteForm.css';

interface EmoteFormProps {
    emoteMap: EmoteMap;
    emoteObject: EmoteObject;
    currentEmoteDataEntry: IEmoteDataEntry;
    firstLineSupported: boolean;
    secondLineSupported: boolean;

    emoteIdentifierChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    speedChangeHandler: (event: React.FormEvent<HTMLSelectElement>) => void;
    slideChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    vibrateChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    reverseChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    hueRotateChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    invertColorsChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    spinChangeHandler: (event: React.FormEvent<HTMLSelectElement>) => void;
    rotateDegreesChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    brodyChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    xAxisTransposeChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    zAxisTransposeChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    firstLineTextChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    secondLineTextChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    altTextChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
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
                                onChange={this.props.emoteIdentifierChangeHandler}
                                className="form-control input-md"
                                style={{backgroundColor: emoteIdentifierIsValid ? 'lightgreen' : 'red'}}
                                placeholder="emote name (bpsign, ajlie, etc)"
                            /> */}
                            <Typeahead
                                onChange={(selected) => {
                                    this.props.emoteObject.emoteIdentifier = selected[0];
                                }}
                                maxResults={10}
                                minLength={3}
                                selected={[this.props.emoteObject.emoteIdentifier]}
                                options={this.props.emoteMap.allEmoteNames}
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
                                    onChange={this.props.firstLineTextChangeHandler}
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
                                    onChange={this.props.secondLineTextChangeHandler}
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
                                onChange={this.props.altTextChangeHandler}
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
                                        onChange={this.props.vibrateChangeHandler}
                                    />
                                    vibrate
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.reverse}
                                        onChange={this.props.reverseChangeHandler}
                                    />
                                    reverse
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.brody}
                                        onChange={this.props.brodyChangeHandler}
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
                                        onChange={this.props.hueRotateChangeHandler}
                                    />
                                    hue shift
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.invertColors}
                                        onChange={this.props.invertColorsChangeHandler}
                                    />
                                    invert colors
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={this.props.emoteObject.slide}
                                        onChange={this.props.slideChangeHandler}
                                    />
                                    slide
                                </label>
                                {this.props.emoteObject.slide &&
                                    <select
                                        defaultValue={this.props.emoteObject.speed}
                                        onChange={this.props.speedChangeHandler}
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
                                onChange={this.props.spinChangeHandler}
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
                                    onChange={this.props.rotateDegreesChangeHandler}
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
                                    onChange={this.props.xAxisTransposeChangeHandler}
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
                                onChange={this.props.zAxisTransposeChangeHandler}
                                placeholder="z index"
                            />
                        </div>
                    </div>
                </fieldset >
            </form >
        );
    }
}
