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
      <div>
        <EmoteDataHolder emoteMap={emoteMap} />
      </div>
    );
  }
}

export default App;
