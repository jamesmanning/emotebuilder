import * as React from 'react';
import './App.css';
import { EmoteDataHolder } from './EmoteDataHolder';
import { EmoteMap } from 'emotes';
import { emoteData } from './SampleData';

const emoteMap = new EmoteMap(emoteData);
// const emoteExpansionOptions = new EmoteExpansionOptions();
// const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    header stuff will go here
                </div>

                <div className="row">
                    <EmoteDataHolder emoteMap={emoteMap} />
                </div>
            </div>
        );
    }
}

export default App;
