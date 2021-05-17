import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { inject } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {
  it('create an instance', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
    const pipe = new SafeHtmlPipe(sanitizer);
    expect(sanitizer).toBeTruthy();
    expect(pipe).toBeTruthy();
  }));
});
