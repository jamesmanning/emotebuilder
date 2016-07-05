import {
  NgForm,
  FormGroup,
} from '@angular/forms';
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
export class EmoteFormComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit() {
  }

  // TODO: there is likely a better/simpler way of subscribing to all model changes
  @ViewChild(NgForm) form: NgForm;

  ngAfterViewInit() {
    this.form.control.valueChanges.subscribe(values => {
      console.log('emitting event on output emoteObjectChanged');
      this.emoteObjectChanged.emit(values);
    });
  }

  // get currentEmoteDataEntry(): IEmoteDataEntry {
  //   console.log(`looking up emoteIdentifier of ${this.emoteObject.emoteIdentifier}`);
  //   return this.emoteMap.findEmote(this.emoteObject.emoteIdentifier);
  // }

  // ngOnChanges() {
  //   console.log(`running ngOnChanges in EmoteFormComponent with emoteObject=${JSON.stringify(this.emoteObject)}`);
  // }

  @Input() public emoteMap: EmoteMap;

  @Input() public emoteObject: EmoteObject;

  @Output() public emoteObjectChanged = new EventEmitter();

  private currentEmoteDataEntry: IEmoteDataEntry;

  updateCurrentEmoteDataEntry() {
    this.currentEmoteDataEntry = this.emoteMap.findEmote(this.emoteObject.emoteIdentifier);
  }

  spinOptions = EmoteFlags.spinOptions;
  speedOptions = EmoteFlags.speedOptions;
  coloringOptions = EmoteFlags.coloringOptions;
}
