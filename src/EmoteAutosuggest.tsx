import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { ChangeEvent } from 'react-autosuggest';
import { EmoteMap, EmoteObjectBuilder } from 'emotes';
import './EmoteAutosuggest.css';
import { EmoteRender } from './EmoteRender';

export class Suggestion {
    name: string;
    imageUrl: string;
}

interface EmoteAutosuggestProps {
    emoteMap: EmoteMap;
    value: string;
    onValueChanged: (newValue: string) => void;
}

interface EmoteAutosuggestState {
    // value: string;
    suggestions: Suggestion[];
    matchCount: number;
}

export class EmoteAutosuggest extends React.Component<EmoteAutosuggestProps, EmoteAutosuggestState> {
    constructor(props: EmoteAutosuggestProps) {
        super(props);

        this.state = {
            // value: props.value,
            suggestions: [],
            matchCount: 1
        };
    }

    getSuggestions = (value: string): Suggestion[] => {
        const allMatches = this.props.emoteMap.emoteImages
            .filter(emote => emote.name.includes(value));
        this.setState({ matchCount: allMatches.length });
        return allMatches.slice(0, 50);
    }

    getSuggestionValue = (suggestion: Suggestion) => {
        return suggestion.name;
    }

    renderSuggestion = (suggestion: Suggestion) => {
        return (
            <div>
                <span>{suggestion.name}</span>
                <EmoteRender
                    emoteMap={this.props.emoteMap}
                    emoteObject={EmoteObjectBuilder.create({ emoteIdentifier: suggestion.name })}
                />
                {/* {this.state.matchCount < 50 && 
                    <img src={'https://atte.fi/berrymotes/render.php?emote=' + suggestion.name} />
                } */}
            </div>
        );
    }

    onChange = (event: React.FormEvent<string>, params: ChangeEvent | undefined) => {
        if (params) {
            // this.setState({
            //     value: params.newValue
            // });
            this.props.onValueChanged(params.newValue);
        }
    }

    onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }

    render() {
        const { suggestions, matchCount } = this.state;
        const inputProps = {
            placeholder: 'Type emote name',
            value: this.props.value,
            onChange: this.onChange
        };

        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
                {suggestions.length > 0 &&
                    <span>&nbsp; <b>{matchCount}</b> match{matchCount === 1 ? '' : 'es'}</span>
                }
            </div>
        );
    }
}
