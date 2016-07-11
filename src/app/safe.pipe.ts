import {
  Pipe,
  PipeTransform,
} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';

// from http://plnkr.co/edit/WdrRVyHr6WUCwMCwhH9F?p=preview
@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizationService){
    this.sanitizer = sanitizer;
  }

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}
