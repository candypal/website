import { AutoScrollDirective } from './auto-scroll.directive';
import {ElementRef} from '@angular/core';

describe('AutoScrollDirective', () => {
  it('should create an instance', () => {
    const directive = new AutoScrollDirective(new ElementRef(null));
    expect(directive).toBeTruthy();
  });
});
