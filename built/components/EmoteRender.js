"use strict";
var React = require('react');
var emotes_1 = require('emotes');
const MAX_HEIGHT = 200;
class EmoteRender extends React.Component {
    constructor(props) {
        super(props);
        this.emoteHtml = new emotes_1.EmoteHtml(this.props.emoteMap);
    }
    render() {
        const htmlOutputData = this.emoteHtml.getEmoteHtmlMetadataForObject(this.props.emoteObject);
        if (!htmlOutputData) {
            return React.createElement("span", null, this.props.emoteObject.originalString);
        }
        let emoteData = htmlOutputData.emoteData;
        let textNodes = [];
        if (htmlOutputData.emText) {
            textNodes.push(React.createElement("em", {style: htmlOutputData.emStyles}, htmlOutputData.emText));
        }
        if (htmlOutputData.strongText) {
            textNodes.push(React.createElement("strong", {style: htmlOutputData.strongStyles}, htmlOutputData.strongText));
        }
        if (htmlOutputData.altText) {
            textNodes.push(htmlOutputData.altText);
        }
        let emoteNode = (React.createElement("span", {ref: "emote", className: htmlOutputData.cssClassesForEmoteNode.join(' '), title: htmlOutputData.titleForEmoteNode, style: htmlOutputData.cssStylesForEmoteNode}, textNodes));
        if (htmlOutputData.cssClassesForParentNode.length > 0 || htmlOutputData.cssStylesForParentNode) {
            emoteNode = (React.createElement("span", {className: htmlOutputData.cssClassesForParentNode.join(' '), style: htmlOutputData.cssStylesForParentNode}, emoteNode));
        }
        if (emoteData.height > MAX_HEIGHT) {
            let scale = MAX_HEIGHT / emoteData.height;
            let outerWrapperStyle = {
                height: MAX_HEIGHT,
                width: emoteData.width * scale,
                position: "relative",
                display: "inline-block"
            };
            let innerWrapperStyle = {
                transform: `scale(${scale})`,
                transformOrigin: "left top 0px",
                position: "absolute",
                top: 0,
                left: 0
            };
            emoteNode = (React.createElement("span", {className: "berrymotes-wrapper-outer", style: outerWrapperStyle}, React.createElement("span", {className: "berrymotes-wrapper", style: innerWrapperStyle}, emoteNode)));
        }
        return emoteNode;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmoteRender;
//# sourceMappingURL=EmoteRender.js.map