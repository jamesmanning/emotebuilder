import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { ChangeEvent } from 'react-autosuggest';
import { EmoteMap } from 'emotes';
import './EmoteAutosuggest.css';

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
}

export class EmoteAutosuggest extends React.Component<EmoteAutosuggestProps, EmoteAutosuggestState> {
    constructor(props: EmoteAutosuggestProps) {
        super(props);

        this.state = {
            // value: props.value,
            suggestions: []
        };
    }

    // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
    escapeRegexCharacters = (str: string): string => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions = (value: string): Suggestion[] => {
        const escapedValue = this.escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return this.props.emoteMap.emoteImages.filter(emote => regex.test(emote.name));
    }

    getSuggestionValue = (suggestion: Suggestion) => {
        return suggestion.name;
    }

    renderSuggestion = (suggestion: Suggestion) => {
        return (
            <div>
                <span>{suggestion.name}</span>
                {/* <img src={'https://atte.fi/berrymotes/render.php?emote=' + suggestion.name} /> */}
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
        const { suggestions } = this.state;
        const inputProps = {
            placeholder: 'Type emote name',
            value: this.props.value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}
