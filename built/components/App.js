"use strict";
var React = require('react');
var EmoteDataHolder_1 = require('./EmoteDataHolder');
var emotes_1 = require('emotes');
var SampleData_1 = require('./SampleData');
const emoteMap = new emotes_1.EmoteMap(SampleData_1.emoteData);
const emoteExpansionOptions = new emotes_1.EmoteExpansionOptions();
const emoteHtml = new emotes_1.EmoteHtml(emoteMap, emoteExpansionOptions);
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", null, React.createElement(EmoteDataHolder_1.default, {emoteMap: emoteMap})));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
//# sourceMappingURL=App.js.map