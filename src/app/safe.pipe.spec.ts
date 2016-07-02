/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SafePipe } from './safe.pipe';

describe('Pipe: Safe', () => {
  it('create an instance', () => {
    let pipe = new SafePipe();
    expect(pipe).toBeTruthy();
  });
});
