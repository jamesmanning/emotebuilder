import * as React from 'react';
import {EmoteMap, EmoteObject, EmoteHtml, HtmlOutputData} from 'emotes';

const MAX_HEIGHT = 200;

interface EmoteRenderProps {
  emoteObject: EmoteObject,
  emoteMap: EmoteMap,
}

export default class EmoteRender extends React.Component<EmoteRenderProps, any> {
  constructor(props: EmoteRenderProps) {
    super(props);
    this.emoteHtml = new EmoteHtml(this.props.emoteMap);
  }

  private emoteHtml: EmoteHtml;

  render() {
		const htmlOutputData = this.emoteHtml.getEmoteHtmlMetadataForObject(this.props.emoteObject);
		if(!htmlOutputData) {
			return <span>{this.props.emoteObject.originalString}</span>
		}

		let emoteData = htmlOutputData.emoteData

		let textNodes = []

		if (htmlOutputData.emText) {
			textNodes.push(<em style={htmlOutputData.emStyles}>{htmlOutputData.emText}</em>)
		}
		if (htmlOutputData.strongText) {
			textNodes.push(<strong style={htmlOutputData.strongStyles}>{htmlOutputData.strongText}</strong>)
		}
		if (htmlOutputData.altText) {
			textNodes.push(htmlOutputData.altText)
		}

		let emoteNode = (
			<span ref="emote"
						className={htmlOutputData.cssClassesForEmoteNode.join(' ')}
						title={htmlOutputData.titleForEmoteNode}
						style={htmlOutputData.cssStylesForEmoteNode}>
				{textNodes}
			</span>
		)

		// provide a wrapper node if necessary to apply the styles/classes from the 'parent node' info
		if (htmlOutputData.cssClassesForParentNode.length > 0 || htmlOutputData.cssStylesForParentNode) {
			emoteNode = (
				<span className={htmlOutputData.cssClassesForParentNode.join(' ')} style={htmlOutputData.cssStylesForParentNode}>
					{emoteNode}
				</span>
			)
		}

		// provide wrapping to implement scaling down to meet MAX_HEIGHT requirement
		if (emoteData.height > MAX_HEIGHT) {
			let scale = MAX_HEIGHT/emoteData.height

			let outerWrapperStyle = {
				height: MAX_HEIGHT,
				width: emoteData.width * scale,
				position: "relative",
				display: "inline-block"
			}

			let innerWrapperStyle = {
				transform: `scale(${scale})`,
				transformOrigin: "left top 0px",
				position: "absolute",
				top: 0,
				left: 0
			}

			emoteNode = (
				<span className="berrymotes-wrapper-outer" style={outerWrapperStyle}>
					<span className="berrymotes-wrapper" style={innerWrapperStyle}>
						{emoteNode}
					</span>
				</span>
			)
		}

		return emoteNode
	}
}
