import {
  Component,
  OnInit
} from '@angular/core';
import { Http, Response } from '@angular/http';
import {
  EmoteObject,
  EmoteExpander,
  EmoteExpansionOptions,
  EmoteFlags,
  EmoteObjectSerializer,
  EmoteParser,
  IEmoteDataEntry
} from './shared/emotes-lib/index'
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private http: Http) {}


  ngOnInit() {
    this.emoteObject1 = new EmoteObject();
    this.emoteObject1.emoteIdentifier = 'adviceajlie';
    this.emoteObject1.firstLineText = 'apples?';
    this.emoteObject1.secondLineText = 'I didn\'t see any apples';

    this.serializeEmoteObjects();
    this.populateEmoteData();
  }

  // populate with a few inline so the page can render one by default
  emoteData = <IEmoteDataEntry[]> [
    {
      'text-text-align': 'center',
      'text-font-size': '26px',
      'text-font-family': 'Impact,sans-serif',
      'tags': ['applejack', 'meme'],
      'strong-bottom': '5px',
      'text-text-shadow': '2px 2px 2px black,-2px -2px 2px black,-2px 2px 2px black,2px -2px 2px black',
      'height': 300,
      'em-width': '280px',
      'strong-left': '50%',
      'names': ['adviceajlie'],
      'em-position': 'absolute',
      'strong-position': 'absolute',
      'background-image': 'http://b.thumbs.redditmedia.com/5g6WH3RD7F5aMC-O.png',
      'em-font-style': 'normal',
      'em-color': 'white',
      'em-top': '5px',
      'width': 300,
      'sr': 'adviceponies',
      'strong-color': 'white',
      'strong-margin-left': '-140px',
      'text-color': 'white',
      'strong-width': '280px',
      'em-left': '50%',
      'text-text-transform': 'uppercase',
      'strong-font-weight': 'normal',
      'background-position': ['-2px', '-2px'],
      'text-line-height': '26px',
      'em-margin-left': '-140px'
    }
  ];
  emoteExpander = new EmoteExpander(this.emoteData, new EmoteExpansionOptions());

  numberOfEmotes = 1;

  // $watch('numberOfEmotes', function () {
  //   if (numberOfEmotes == 1) {
  //     emoteInfo2 = null;
  //   } else if (numberOfEmotes == 2) {
  //     if (emoteInfo2 == null) {
  //       emoteInfo2 = new EmoteObject();
  //       emoteInfo2.emoteName = 'ierage';
  //     }
  //   }
  //   serializeEmoteObjects();
  // });

  emoteObject1 = new EmoteObject();
  currentEmoteDataEntry1 = null;
  // $watch('emoteInfo1.emoteName', function () {
  //   if (emoteInfo1 && emoteInfo1.emoteName) {
  //     currentEmoteDataEntry1 = emoteExpander.emoteMap.findEmote(emoteInfo1.emoteName);
  //     if (currentEmoteDataEntry1) {
  //       if (currentEmoteDataEntry1['em-top'] == undefined) {
  //         emoteInfo1.firstLineText = '';
  //         serializeEmoteObjects();
  //       }
  //       if (currentEmoteDataEntry1['strong-bottom'] == undefined) {
  //         emoteInfo1.secondLineText = '';
  //         serializeEmoteObjects();
  //       }
  //     }
  //   } else {
  //     currentEmoteDataEntry1 = null;
  //   }
  // });

  emoteObject2 = null;
//        emoteInfo2 = new EmoteObject();
//        emoteInfo2.emoteName = 'ierage';
  currentEmoteDataEntry2 = null;
  // $watch('emoteInfo2.emoteName', function () {
  //   if (emoteInfo2 && emoteInfo2.emoteName) {
  //     currentEmoteDataEntry2 = emoteExpander.emoteMap.findEmote(emoteInfo2.emoteName);
  //     if (currentEmoteDataEntry2) {
  //       if (currentEmoteDataEntry2['em-top'] == undefined) {
  //         emoteInfo2.firstLineText = '';
  //         serializeEmoteObjects();
  //       }
  //       if (currentEmoteDataEntry2['strong-bottom'] == undefined) {
  //         emoteInfo2.secondLineText = '';
  //         serializeEmoteObjects();
  //       }
  //     }
  //   } else {
  //     currentEmoteDataEntry2 = null;
  //   }
  // });

  spinOptions = EmoteFlags.spinOptions;
  speedOptions = EmoteFlags.speedOptions;
  coloringOptions = EmoteFlags.coloringOptions;

  emoteObjectSerializer = new EmoteObjectSerializer();
  emoteParser = new EmoteParser();

  existingEmoteString = null;

  escapeHtml = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  private populateEmoteData() {
    this.getEmoteData
  } 
  private getEmoteData(): Observable<IEmoteDataEntry[]> {
    console.log('making call to load emote data');
    return this.http.get('//berrymotes.com/assets/berrymotes_json_data.json')
             .map(this.extractData)
             .catch(this.handleError);
  }
  //     .then(function (res) {
  //       emoteData = res.data;
  //       emoteExpander = new EmoteExpander(emoteData);
  //       console.log('loaded ' + emoteData.length + ' emotes');
  //     });
  // };
  private extractData(res: Response): IEmoteDataEntry[] {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  serializedEmotes: string;
  expandedEmotes = null;

  serializeEmoteObjects() {
    this.serializedEmotes = this.emoteObjectSerializer.serialize(this.emoteObject1);

    if (this.emoteObject2) {
      var serialized2 = this.emoteObjectSerializer.serialize(this.emoteObject2);
      this.serializedEmotes += ' ' + serialized2;
    }

    console.log(`running expansion on ${this.serializedEmotes}`);
    this.expandedEmotes = this.emoteExpander.expand(this.serializedEmotes);

    // TODO: get rid of this stupid hack and figure out how to get jquery or angular to do this for us
    this.expandedEmotes = this.expandedEmotes.replace(/; animation: ([^;]+);/g, '; animation: $1; -webkit-animation: $1;');

    // TODO: figure out the problem with renderAsHtml firing constantly
    // $('#expandedEmotes').html(expandedEmotes);
  }

  importExistingEmoteString = function () {
    // TODO: in ES6, use destructuring
    var emoteInfos = this.emoteInfoParser.parseEmotesFromString(this.existingEmoteString);

    if (emoteInfos && emoteInfos.length > 0) {
      this.emoteObject1 = emoteInfos[0];
      if (emoteInfos.length == 1) {
        this.numberOfEmotes = 1;
      } else {
        this.numberOfEmotes = 2;
        this.emoteObject2 = emoteInfos[1];
      }
      this.existingEmoteString = null;
      this.serializeEmoteObjects();
    }
  };

  swapEmotes = function () {
    console.log('starting emote swap');
    [this.emoteInfo1, this.emoteInfo2] = [this.emoteInfo2, this.emoteInfo1];
    console.log('finished emote swap');
  };
}
