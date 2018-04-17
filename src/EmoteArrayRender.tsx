import * as React from 'react';
import { EmoteMap, EmoteObject } from 'emotes';
import { EmoteRender } from './EmoteRender';

interface EmoteArrayRenderProps {
    emoteObjects: EmoteObject[];
    emoteMap: EmoteMap;
}

export class EmoteArrayRender extends React.Component<EmoteArrayRenderProps, {}> {
    constructor(props: EmoteArrayRenderProps) {
        super(props);
    }

    render() {
        const objectRenders = this.props.emoteObjects
            .map((emoteObject,  emoteIndex) => (
                <EmoteRender 
                    emoteMap={this.props.emoteMap} 
                    emoteObject={emoteObject} 
                    key={emoteIndex} 
                />)
            );

        return (<div>{objectRenders}</div>);
    }
}
