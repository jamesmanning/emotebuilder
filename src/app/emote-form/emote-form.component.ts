import { 
  Component, 
  OnInit,
  OnChanges,
  Input,
} from '@angular/core';
import {
  EmoteMap,
  EmoteObject,
  EmoteExpander,
  EmoteExpansionOptions,
  EmoteFlags,
  EmoteObjectSerializer,
  EmoteParser,
  IEmoteDataEntry,
} from '../shared/';

@Component({
  moduleId: module.id,
  selector: 'app-emote-form',
  templateUrl: 'emote-form.component.html',
  styleUrls: ['emote-form.component.css']
})
export class EmoteFormComponent implements OnInit, OnChanges {

  constructor() {}

  ngOnInit() {
    this.currentEmoteDataEntry = this.emoteMap.findEmote(this.emoteObject.emoteIdentifier);
  }

  get diagnostic() { return JSON.stringify(this.emoteObject); }

  ngOnChanges() {
    console.log('running ngOnChanges in EmoteFormComponent');
  }

  refreshCurrentEmoteDataEntry() {
    console.log(`setting currentEmoteDataEntry based on emoteIdentifier of ${this.emoteObject.emoteIdentifier}`);
    this.currentEmoteDataEntry = this.emoteMap.findEmote(this.emoteObject.emoteIdentifier);
  }

  @Input() public emoteMap: EmoteMap;

  @Input() public emoteObject: EmoteObject;

  spinOptions = EmoteFlags.spinOptions;
  speedOptions = EmoteFlags.speedOptions;
  coloringOptions = EmoteFlags.coloringOptions;
}
