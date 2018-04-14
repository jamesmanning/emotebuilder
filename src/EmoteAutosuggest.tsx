import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { ChangeEvent } from 'react-autosuggest';
import './EmoteAutosuggest.css';

const languages = [
    {
        name: 'C',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'C#',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'C++',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Clojure',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Elm',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Go',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Haskell',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Java',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Javascript',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Perl',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'PHP',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Python',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Ruby',
        imageUrl: 'http://via.placeholder.com/140x100'
    },
    {
        name: 'Scala',
        imageUrl: 'http://via.placeholder.com/140x100'
    }
];

export class Suggestion {
    name: string;
    imageUrl: string;
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value: string): Suggestion[] {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion: Suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion: Suggestion) {
    return (
        <div style={{zIndex: 100}}>
            <span>{suggestion.name}</span>
            <img src={suggestion.imageUrl} />
        </div>
    );
}

interface EmoteAutosuggestProps {
}

interface EmoteAutosuggestState {
    value: string;
    suggestions: Suggestion[];
}

export class EmoteAutosuggest extends React.Component<EmoteAutosuggestProps, EmoteAutosuggestState> {
    constructor(props: EmoteAutosuggestProps) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        };
    }

    onChange = (event: React.FormEvent<string>, params: ChangeEvent | undefined) => {
        if (params) {
            this.setState({
                value: params.newValue
            });
        }
    }

    onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Type c',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}
