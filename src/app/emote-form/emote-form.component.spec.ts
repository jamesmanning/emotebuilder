/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { EmoteFormComponent } from './emote-form.component';

describe('Component: EmoteForm', () => {
  it('should create an instance', () => {
    let component = new EmoteFormComponent();
    expect(component).toBeTruthy();
  });
});
