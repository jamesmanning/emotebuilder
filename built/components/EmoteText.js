"use strict";
var React = require('react');
var emotes_1 = require('emotes');
const CopyToClipboard = require('react-copy-to-clipboard');
class EmoteText extends React.Component {
    constructor(props) {
        super(props);
        this.emoteObjectSerializer = new emotes_1.EmoteObjectSerializer();
        this.state = {
            copied: false
        };
    }
    componentWillReceiveProps(newProps) {
        this.setState({ copied: false });
    }
    render() {
        const serialized = this.emoteObjectSerializer.serialize(this.props.emoteObject) || this.props.emoteObject.originalString;
        return (React.createElement("div", null, React.createElement("span", null, serialized), React.createElement("br", null), React.createElement(CopyToClipboard, {text: serialized, onCopy: () => this.setState({ copied: true })}, React.createElement("button", null, "Copy to clipboard")), " ", this.state.copied ? React.createElement("span", {style: { color: 'red' }}, "Copied.") : null));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteText;
//# sourceMappingURL=EmoteText.js.map