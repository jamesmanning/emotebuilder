import * as React from 'react';
import './EmoteBuilder.css';
// import * as EmoteLib from 'emotes';

export class EmoteForm extends React.Component {
    render() {
        return (
            <form className="form-horizontal">
                <fieldset>
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="emoteName">Emote Name</label>
                        <div className="col-md-8">
                            <input
                                id="emoteName"
                                name="emoteName"
                                className="form-control input-md"
                                type="text"
                                placeholder="emote name (bpsign, ajlie, etc)" 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="firstLineText">First Line of Text</label>
                        <div className="col-md-8">
                            <input
                                id="firstLineText"
                                name="firstLineText"
                                className="form-control input-md"
                                type="text"
                                placeholder="first line of text" 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="secondLineText">Second Line of Text</label>
                        <div className="col-md-8">
                            <input
                                id="secondLineText"
                                name="secondLineText"
                                className="form-control input-md"
                                type="text"
                                placeholder="second line of text" 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="altText">Regular Alt Text</label>
                        <div className="col-md-8">
                            <input
                                id="altText"
                                name="altText"
                                className="form-control input-md"
                                type="text"
                                placeholder="regular alt text" 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="checkboxes">Optional modifiers</label>
                        <div className="col-md-2">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />
                                    vibrate
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />
                                    reverse
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />
                                    brody
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />
                                    hue shift
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />
                                    invert colors
                                </label>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" />
                                    slide
                                </label>
                                <select>
                                    <option value="">-- optional slide speed modifier --</option>
                                    <option value="todoSpeedValue">todoSpeedLabel</option>
                                </select>
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
                            >
                                <option value="">-- optional spin --</option>
                                <option value="todoSpinValue">todoSpinLabel</option>
                            </select>
                        </div>
                    </div>

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
                                placeholder="z index" 
                            />
                        </div>
                    </div>

                </fieldset >
            </form >
        );
    }
}
