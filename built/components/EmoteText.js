"use strict";
var React = require('react');
var emotes_1 = require('emotes');
class EmoteText extends React.Component {
    constructor(props) {
        super(props);
        this.emoteObjectSerializer = new emotes_1.EmoteObjectSerializer();
    }
    render() {
        const serialized = this.emoteObjectSerializer.serialize(this.props.emoteObject);
        return (React.createElement("span", null, serialized || this.props.emoteObject.originalString));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteText;
//# sourceMappingURL=EmoteText.js.map