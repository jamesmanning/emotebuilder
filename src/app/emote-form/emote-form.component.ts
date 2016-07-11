import { 
  Component, 
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
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
export class EmoteFormComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    this.updateCurrentEmoteDataEntry();
  }

  @Input() public emoteMap: EmoteMap;

  @Input() public emoteObject: EmoteObject;

  @Output() public emoteObjectChanged = new EventEmitter();

  private currentEmoteDataEntry: IEmoteDataEntry;

  updateCurrentEmoteDataEntry() {
    const newEmoteDataEntry = this.emoteMap.findEmote(this.emoteObject.emoteIdentifier);
    if (newEmoteDataEntry && newEmoteDataEntry != this.currentEmoteDataEntry) {
      this.currentEmoteDataEntry = newEmoteDataEntry;
      if (this.firstLineSupported === false) this.emoteObject.firstLineText = null;
      if (this.secondLineSupported === false) this.emoteObject.secondLineText = null;
    }
  }

  get firstLineSupported(): boolean {
    return !!this.currentEmoteDataEntry && !!this.currentEmoteDataEntry['em-top'];
  }

  get secondLineSupported(): boolean {
    return !!this.currentEmoteDataEntry && !!this.currentEmoteDataEntry['strong-bottom'];
  }

  spinOptions = EmoteFlags.spinOptions;
  speedOptions = EmoteFlags.speedOptions;
  coloringOptions = EmoteFlags.coloringOptions;

  onEmoteIdentifierChanged() {
    this.updateCurrentEmoteDataEntry();
    this.emitEmoteObjectChanged();
  }

  emitEmoteObjectChanged() {
    this.emoteObjectChanged.emit({}); // could emit the new value, but no real need to
  }
}
