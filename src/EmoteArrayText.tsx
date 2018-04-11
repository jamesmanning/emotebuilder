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

    // get encodedSerializedEmotes(): string { return encodeURIComponent(this.serializedEmotes); }

    // get linkForCurrentSettings(): string { 
    //   const appRelativeUrl = this.router.createUrlTree([''], 
            // {queryParams: {emoteString: this.encodedSerializedEmotes}}).toString();
    //   // TODO: figure out the right way to make this into an absolute url
    //   const absoluteUrl = location.href + appRelativeUrl.substring(1);
    //   return absoluteUrl;
    // }

    render() {
        const serializedEmotes = this.props.emoteObjects
            .map(eo => this.emoteObjectSerializer.serialize(eo) || eo.originalString)
            .join(' ');
        // const encodedSerialized = encodeURIComponent(serializedEmotes);
        
        return (
            <div>
                <div className="input-group">
                    <span className="input-group-btn">
                        <CopyToClipboard
                            text={serializedEmotes}
                            onCopy={() => this.setState({ copied: true })}
                        >
                            <button className="btn btn-primary">copy emote string to clipboard</button>
                        </CopyToClipboard>
                    </span>
                    <input type="text" className="form-control" readOnly={true} value={serializedEmotes} />
                </div>
                &nbsp;
                    {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
            </div>
        );
    }
}
