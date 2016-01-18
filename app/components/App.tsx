import * as React from 'react';
import {default as EmoteDataHolder} from './EmoteDataHolder';

import {EmoteMap, EmoteExpansionOptions, EmoteHtml, IEmoteDataEntry} from 'emotes';
import {emoteData} from './SampleData';

// // const emotes = require('emotes');
// // const IEmoteDataEntry = emotes.IEmoteDataEntry;
// // const EmoteMap = emotes.EmoteMap;
const emoteMap = new EmoteMap(emoteData);
const emoteExpansionOptions = new EmoteExpansionOptions();
const emoteHtml = new EmoteHtml(emoteMap, emoteExpansionOptions);


export default class App extends React.Component<any, any> {
	constructor(props: any) {
    super(props);
  }
	// <ItemList items={data} />
	render() {
    return (
			<div>
				<EmoteDataHolder emoteMap={emoteMap} />
			</div>
		);
	}
}
