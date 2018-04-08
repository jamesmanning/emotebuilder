import * as React from 'react';
import { EmoteObject, EmoteObjectSerializer } from 'emotes';
// import * as CopyToClipboard from 'react-copy-to-clipboard';
import * as CopyToClipboard from 'react-copy-to-clipboard';

interface EmoteArrayTextProps {
    emoteObjects: EmoteObject[];
}

interface EmoteArrayTextState {
    copied: boolean;
}

export class EmoteArrayText extends React.Component<EmoteArrayTextProps, EmoteArrayTextState> {
    private emoteObjectSerializer = new EmoteObjectSerializer();

    constructor(props: EmoteArrayTextProps) {
        super(props);
        this.state = {
            copied: false
        };
    }

    componentWillReceiveProps(newProps: EmoteArrayTextProps) {
        this.setState({ copied: false });
    }

    render() {
        const serialized = this.props.emoteObjects
            .map(eo => this.emoteObjectSerializer.serialize(eo) || eo.originalString)
            .join(' ');
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
