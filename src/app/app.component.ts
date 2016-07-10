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
import { ROUTER_DIRECTIVES } from '@angular/router';
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
  // styleUrls: ['app.component.css'],
  directives: [EmoteFormComponent, ROUTER_DIRECTIVES],
  pipes: [SafePipe],
})
export class AppComponent implements OnInit {
  constructor () {}

  ngOnInit() {
  }
}
