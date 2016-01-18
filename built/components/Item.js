"use strict";
var React = require('react');
class Item extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement("div", null, "Item name: ", this.props.name);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Item;
//# sourceMappingURL=Item.js.map