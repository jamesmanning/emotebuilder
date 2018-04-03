import * as React from 'react';
import { EmoteObject, EmoteObjectSerializer } from 'emotes';
// import * as CopyToClipboard from 'react-copy-to-clipboard';
import * as CopyToClipboard from 'react-copy-to-clipboard';

interface EmoteTextProps {
    emoteObject: EmoteObject;
}

interface EmoteTextState {
    copied: boolean;
}

export class EmoteText extends React.Component<EmoteTextProps, EmoteTextState> {
    private emoteObjectSerializer = new EmoteObjectSerializer();

    constructor(props: EmoteTextProps) {
        super(props);
        this.state = {
            copied: false
        };
    }

    componentWillReceiveProps(newProps: EmoteTextProps) {
        this.setState({ copied: false });
    }

    render() {
        const serialized = this.emoteObjectSerializer.serialize(this.props.emoteObject) 
            || this.props.emoteObject.originalString;
        return (
            <div>
                <span>{serialized}</span>

                <br />

                <CopyToClipboard 
                    text={serialized}
                    onCopy={() => this.setState({ copied: true })}
                >
                    <button>Copy to clipboard</button>
                </CopyToClipboard>
                &nbsp;
        
        {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
            </div>
        );
    }
}
