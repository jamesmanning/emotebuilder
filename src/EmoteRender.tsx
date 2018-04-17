import * as React from 'react';
import { EmoteMap, EmoteObject, EmoteHtml } from 'emotes';

const MAX_HEIGHT = 200;

interface EmoteRenderProps {
    emoteObject: EmoteObject;
    emoteMap: EmoteMap;
}

export class EmoteRender extends React.Component<EmoteRenderProps, {}> {
    private emoteHtml: EmoteHtml;

    constructor(props: EmoteRenderProps) {
        super(props);
        this.emoteHtml = new EmoteHtml(this.props.emoteMap);
    }

    render() {
        const htmlOutputData = this.emoteHtml.getEmoteHtmlMetadataForObject(this.props.emoteObject);
        if (!htmlOutputData) {
            return <span>{this.props.emoteObject.originalString}</span>;
        }

        const emoteData = htmlOutputData.emoteData;
        if (!emoteData) {
            return <span>{this.props.emoteObject.originalString}</span>;
        }

        const textNodes = [];

        if (htmlOutputData.emText) {
            textNodes.push(<em key="em" style={htmlOutputData.emStyles}>{htmlOutputData.emText}</em>);
        }
        if (htmlOutputData.strongText) {
            textNodes.push(
                <strong key="strong" style={htmlOutputData.strongStyles}>
                    {htmlOutputData.strongText}
                </strong>
            );
        }
        if (htmlOutputData.altText) {
            textNodes.push(htmlOutputData.altText);
        }

        let emoteNode = (
            <span 
                className={htmlOutputData.cssClassesForEmoteNode.join(' ')}
                title={htmlOutputData.titleForEmoteNode}
                style={htmlOutputData.cssStylesForEmoteNode}
            >
                {textNodes}
            </span>
        );

        // provide a wrapper node if necessary to apply the styles/classes from the 'parent node' info
        if (htmlOutputData.cssClassesForParentNode.length > 0 || htmlOutputData.cssStylesForParentNode) {
            emoteNode = (
                <span 
                    className={htmlOutputData.cssClassesForParentNode.join(' ')} 
                    style={htmlOutputData.cssStylesForParentNode}
                >
                    {emoteNode}
                </span>
            );
        }

        // provide wrapping to implement scaling down to meet MAX_HEIGHT requirement
        if (emoteData.height > MAX_HEIGHT) {
            const scale = MAX_HEIGHT / emoteData.height;

            const outerWrapperStyle = {
                height: MAX_HEIGHT,
                width: emoteData.width * scale,
                position: 'relative' as 'relative',
                display: 'inline-block'
            };

            const innerWrapperStyle = {
                transform: `scale(${scale})`,
                transformOrigin: 'left top 0px',
                position: 'absolute' as 'absolute',
                top: 0,
                left: 0
            };

            emoteNode = (
                <span className="berrymotes-wrapper-outer" style={outerWrapperStyle}>
                    <span className="berrymotes-wrapper" style={innerWrapperStyle}>
                        {emoteNode}
                    </span>
                </span>
            );
        }
        // useful for debugging
        // emoteNode = (
        //   <span>
        //     <pre>
        //       {JSON.stringify(htmlOutputData, null, 4)}
        //     </pre>
        //     <span>
        //       {emoteNode}
        //     </span>
        //   </span>
        // );

        return emoteNode;
    }
}
