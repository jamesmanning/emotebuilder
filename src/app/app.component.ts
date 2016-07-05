import {
  Component,
  Pipe,
  PipeTransform,
  OnInit,
  OnChanges,
  Input,
} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Http, Response } from '@angular/http';
import {
  EmoteObject,
  EmoteMap,
  EmoteExpander,
  EmoteExpansionOptions,
  EmoteFlags,
  EmoteHtml,
  EmoteObjectSerializer,
  EmoteParser,
  IEmoteDataEntry,
} from './shared/';
import { SafePipe } from './safe.pipe';
import { EmoteFormComponent } from './emote-form/'
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [EmoteFormComponent],
  pipes: [SafePipe],
})
export class AppComponent implements OnInit, OnChanges {
  constructor (private http: Http) {}

  get diagnostic() { return JSON.stringify(this.emoteObject1); }

  ngOnChanges() {
    console.log('running ngOnChanges in AppComponent');
    this.refreshSerializedEmotes();
  }

  ngOnInit() {
    // populate with some initial emote data so the page can render the default emote objects
    this.useEmoteData(this.initialEmoteData);
    this.refreshSerializedEmotes();
    this.refreshExpandedEmotes();
    this.populateEmoteData();
  }

  private initialEmoteData = <IEmoteDataEntry[]> [
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
    },
    {
      "background-image": "//a.thumbs.redditmedia.com/84ozl2WMmiYp6Euf.png",
      "tags": ["oc", ""],
      "sr": "marmemotes",
      "height": 140,
      "width": 200,
      "names": ["ivyrage", "ierage"],
      "apng_url": "http://berrymotes.com/images/a/84ozl2WMmiYp6Euf.png"
    },
  ];

  emoteData: IEmoteDataEntry[];
  emoteMap: EmoteMap;
  emoteHtml: EmoteHtml;
  emoteExpander: EmoteExpander;
  emoteExpansionOptions = new EmoteExpansionOptions();
  emoteParser = new EmoteParser();
  emoteObjectSerializer = new EmoteObjectSerializer();

  useEmoteData(emoteData: IEmoteDataEntry[]) {
    this.emoteData = emoteData;
    this.emoteMap = new EmoteMap(this.emoteData);
    this.emoteHtml = new EmoteHtml(this.emoteMap, this.emoteExpansionOptions);
    this.emoteExpander = new EmoteExpander(this.emoteMap, this.emoteHtml, this.emoteParser);
  }

  @Input() numberOfEmotes = 2;

  // $watch('numberOfEmotes', function () {
  //   if (numberOfEmotes == 1) {
  //     emoteObject2 = null;
  //   } else if (numberOfEmotes == 2) {
  //     if (emoteObject2 == null) {
  //       emoteObject2 = new EmoteObject();
  //       emoteObject2.emoteIdentifier = 'ierage';
  //     }
  //   }
  //   serializeEmoteObjects();
  // });

  @Input() public emoteObject1: EmoteObject = {
    originalString: '',
    emoteIdentifier: 'adviceajlie',
    firstLineText: 'apples?',
    secondLineText: 'I didn\'t see any apples',
    altText: '',
    spin: '',
    flagsString: '',
    brody: false,
    hueRotate: false,
    invertColors: false,
    reverse: false,
    rotateDegrees: 0,
    slide: false,
    speed: '',
    vibrate: false,
    xAxisTranspose: 0,
    zAxisTranspose: 0,
  }

  @Input() public emoteObject2: EmoteObject = {
    originalString: '',
    emoteIdentifier: 'ierage',
    firstLineText: '',
    secondLineText: '',
    altText: '',
    spin: '',
    flagsString: '',
    brody: false,
    hueRotate: false,
    invertColors: false,
    reverse: false,
    rotateDegrees: 0,
    slide: false,
    speed: '',
    vibrate: false,
    xAxisTranspose: 0,
    zAxisTranspose: 0,
  }

  existingEmoteString: string;

  escapeHtml = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  private populateEmoteData() {
    console.log('making call to load emote data');
    return this.http.get('//berrymotes.com/assets/berrymotes_json_data.json')
             .map(this.extractData)
             .catch(this.handleError)
             .subscribe(emoteData => this.useEmoteData(emoteData));
  } 

  private extractData(res: Response): IEmoteDataEntry[] {
    return res.json();
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  expandedEmotes: string;
  serializedEmotes: string;

  onEmoteObjectChanged() {
    console.log(`an emote object changed, refreshing serialized and expanded emote objects`);
    this.refreshSerializedEmotes();
    this.refreshExpandedEmotes();
  }

  refreshSerializedEmotes() {
    this.serializedEmotes = this.emoteObjectSerializer.serialize(this.emoteObject1);

    if (this.numberOfEmotes == 2 && this.emoteObject2) {
      this.serializedEmotes += ' ' + this.emoteObjectSerializer.serialize(this.emoteObject2);
    }
    console.log(`serializedEmotes is now ${this.serializedEmotes}`);
  }

  refreshExpandedEmotes() {
    this.expandedEmotes = this.emoteHtml.getEmoteHtmlForObject(this.emoteObject1);

    if (this.numberOfEmotes == 2 && this.emoteObject2) {
      this.expandedEmotes += ' ' + this.emoteHtml.getEmoteHtmlForObject(this.emoteObject2);
    }

    console.log(`expandedEmotes is now ${this.expandedEmotes}`);
  }

  importExistingEmoteString = function () {
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
    [this.emoteObject1, this.emoteObject2] = [this.emoteObject2, this.emoteObject1];
    this.serializeEmoteObjects();
    console.log('finished emote swap');
  };
}
