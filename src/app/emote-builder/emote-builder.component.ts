import {
  Component,
  Pipe,
  PipeTransform,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { Http, Response } from '@angular/http';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Location } from '@angular/common';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';

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
} from '../shared/';
import { SafePipe } from '../safe.pipe';
import { EmoteFormComponent } from '../emote-form/'
import { Observable }     from 'rxjs/Observable';
import {ClipboardDirective} from 'angular2-clipboard';
import '../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'emote-builder',
  templateUrl: 'emote-builder.component.html',
  styleUrls: ['emote-builder.component.css'],
  directives: [EmoteFormComponent, ClipboardDirective, ROUTER_DIRECTIVES, AlertComponent],
  pipes: [SafePipe],
})
export class EmoteBuilderComponent implements OnInit {
  constructor (
    private http: Http, 
    private router: Router, 
    private location: Location) {}

  ngOnInit() {
    // populate with some initial emote data so the page can render the default emote objects
    this.useEmoteData(this.initialEmoteData);
    // kick off the fetch of the real emote data
    this.populateEmoteData();

    const encodedEmoteString = this.router.routerState.snapshot.queryParams['emoteString'];
    if (encodedEmoteString) {
      this.existingEmoteString = decodeURIComponent(encodedEmoteString);
      this.importExistingEmoteString();
      this.router.navigate([''], {queryParams: {}}); // navigate to get rid of the query param
    }

    this.refreshSerializedEmotes();
    this.refreshExpandedEmotes();
  }

  onNumberOfEmotesChanged() {
    if (this.numberOfEmotes < this.emoteObjects.length) {
      // truncating
      this.emoteObjects.length = this.numberOfEmotes;
    } else {
      // expanding, so fill in new ones as needed
      while (this.emoteObjects.length < this.numberOfEmotes) {
        const defaultEmoteInSlot = this.defaultEmoteObjects[this.emoteObjects.length];
        this.emoteObjects.push(defaultEmoteInSlot);
      }
    }
    this.refreshSerializedAndExpandedEmotes();
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

    this.refreshExpandedEmotes(); // since the updated emote data might be needed for the expansion of the current emote string, force a refresh here
  }

  private defaultEmoteObjects: EmoteObject[] = [
    {
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
    }, {
      originalString: '',
      emoteIdentifier: 'twiright',
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
    }, {
      originalString: '',
      emoteIdentifier: 'hahaha',
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
    }, {
      originalString: '',
      emoteIdentifier: 'rdwut',
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
  ];


  @Input() numberOfEmotes = 2;

  @Input() public emoteObjects: EmoteObject[] = [
    this.cloneEmoteObject(this.defaultEmoteObjects[0]),
    this.cloneEmoteObject(this.defaultEmoteObjects[1]),
  ];

  private cloneEmoteObject(source: EmoteObject): EmoteObject {
    return {
      originalString         : source.originalString  ,
      emoteIdentifier        : source.emoteIdentifier ,
      flagsString            : source.flagsString     ,

      speed                  : source.speed           ,
      slide                  : source.slide           ,
      vibrate                : source.vibrate         ,
      reverse                : source.reverse         ,
      hueRotate              : source.hueRotate       ,
      invertColors           : source.invertColors    ,
      spin                   : source.spin            ,
      rotateDegrees          : source.rotateDegrees   ,
      brody                  : source.brody           ,
      xAxisTranspose         : source.xAxisTranspose  ,
      zAxisTranspose         : source.zAxisTranspose  ,

      firstLineText          : source.firstLineText   ,
      secondLineText         : source.secondLineText  ,
      altText                : source.altText         ,
    };
  }

  existingEmoteString: string;

  escapeHtml = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  private populateEmoteData() {
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
  get encodedSerializedEmotes() { return encodeURIComponent(this.serializedEmotes); }

  get linkForCurrentSettings() { 
    const appRelativeUrl = this.router.createUrlTree([''], {queryParams: {emoteString: this.encodedSerializedEmotes}}).toString();
    // TODO: figure out the right way to make this into an absolute url
    const absoluteUrl = location.href + appRelativeUrl.substring(1);
    return absoluteUrl;
  }

  onEmoteObjectChanged() {
    this.refreshSerializedAndExpandedEmotes();
  }

  refreshSerializedAndExpandedEmotes() {
    this.refreshSerializedEmotes();
    this.refreshExpandedEmotes();
  }

  refreshSerializedEmotes() {
    this.serializedEmotes = this.emoteObjects
      .map(eo => this.emoteObjectSerializer.serialize(eo))
      .join(' ');
  }

  refreshExpandedEmotes() {
    this.expandedEmotes = this.emoteObjects
      .map(eo =>this.emoteHtml.getEmoteHtmlForObject(eo))
      .join(' ');
  }

  importExistingEmoteString() {
    var emoteInfos = this.emoteParser.parseMultipleEmotes(this.existingEmoteString);

    if (emoteInfos && emoteInfos.length > 0) {
      this.emoteObjects = emoteInfos;
      this.numberOfEmotes = this.emoteObjects.length;
      this.refreshSerializedAndExpandedEmotes();
    }
    this.existingEmoteString = null;
  };
}
