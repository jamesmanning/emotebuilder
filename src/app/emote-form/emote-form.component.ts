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
  }

  get currentEmoteDataEntry(): IEmoteDataEntry { 
    return this.emoteMap.findEmote(this.emoteObject.emoteIdentifier);
  }

  ngOnChanges() {
    console.log('running ngOnChanges in EmoteFormComponent');
  }

  @Input() public emoteMap: EmoteMap;

  @Input() public emoteObject: EmoteObject;

  spinOptions = EmoteFlags.spinOptions;
  speedOptions = EmoteFlags.speedOptions;
  coloringOptions = EmoteFlags.coloringOptions;
}
