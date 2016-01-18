"use strict";
var React = require('react');
var Item_1 = require('./Item');
class ConferenceList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var items = this.props.items.map(function (item) {
            return (React.createElement(Item_1.default, {name: item.name}));
        });
        return (React.createElement("div", null, items));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConferenceList;
//# sourceMappingURL=ItemList.js.map