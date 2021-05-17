import {AfterContentInit, Directive, ElementRef, HostListener, Input, OnDestroy} from '@angular/core';

@Directive({
  selector: '[cfsAutoScroll]'
})

export class AutoScrollDirective implements AfterContentInit, OnDestroy {
  @Input('lock-y-offset') public lockYOffset = 10;
  @Input('observe-attributes') public observeAttributes = 'false';

  private nativeElement: HTMLElement;
  private _isLocked = false;
  private mutationObserver: MutationObserver | undefined;

  constructor(element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  public getObserveAttributes(): boolean {
    return this.observeAttributes !== '' && this.observeAttributes.toLowerCase() !== 'false';
  }

  public ngAfterContentInit(): void {
    this.mutationObserver = new MutationObserver(() => {
      if (!this._isLocked) {
        this.scrollDown();
      }
    });
    this.mutationObserver.observe(this.nativeElement, {
      childList: true,
      subtree: true,
      attributes: this.getObserveAttributes(),
    });
  }

  public ngOnDestroy(): void {
    this.mutationObserver && this.mutationObserver.disconnect();
  }

  public forceScrollDown(): void {
    this.scrollDown();
  }

  public isLocked(): boolean {
    return this._isLocked;
  }

  private scrollDown(): void {
    this.nativeElement.scrollTop = this.nativeElement.scrollHeight;
  }

  @HostListener('scroll')
  private scrollHandler(): void {
    const scrollFromBottom = this.nativeElement.scrollHeight - this.nativeElement.scrollTop - this.nativeElement.clientHeight;
    this._isLocked = scrollFromBottom > this.lockYOffset;
  }
}
