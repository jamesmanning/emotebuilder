import * as React from 'react';
import { EmoteParser, EmoteObject } from 'emotes';
import './EmoteBuilder.css';

interface EmoteImportFormProps {
    importCallback: (emoteObjects: EmoteObject[]) => void;
}

interface EmoteImportFormState {
    currentImportString: string;
}

export class EmoteImportForm extends React.Component<EmoteImportFormProps, EmoteImportFormState> {
    private emoteParser = new EmoteParser();

    constructor(props: EmoteImportFormProps) {
        super(props);
        this.state = {
            currentImportString: ''
        };

        this.currentImportStringChanged = this.currentImportStringChanged.bind(this);
        this.importCurrentString = this.importCurrentString.bind(this);
    }

    currentImportStringChanged(event: React.FormEvent<HTMLInputElement>) {
        // the emote objects are already in the state, we just need to signal a rerender is needed
        this.setState({ currentImportString: event.currentTarget.value });
    }

    importCurrentString(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        var emoteInfos = this.emoteParser.parseMultipleEmotes(this.state.currentImportString);

        if (emoteInfos && emoteInfos.length > 0) {
            this.props.importCallback(emoteInfos.slice(0, 4)); // import at most 4 emotes
        }
        this.setState({ currentImportString: '' });
    }

    render() {
        return (
            <form onSubmit={this.importCurrentString} className="form-horizontal">
                <label>
                    Import existing emote string:
                    <input 
                        type="text" 
                        placeholder="like [](/ajlie)" 
                        value={this.state.currentImportString} 
                        onChange={this.currentImportStringChanged} 
                    />
                </label>
                <button className="btn btn-primary" type="submit">Import</button>
            </form>
        );
    }
}
