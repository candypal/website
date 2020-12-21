import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {ReadMoreComponent} from './read-more.component';
import {SafeHtmlPipe} from '../../pipes/safe-html/safe-html.pipe';

describe('ReadMoreComponent', () => {
  let component: ReadMoreComponent;
  let fixture: ComponentFixture<ReadMoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        SafeHtmlPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreComponent);
    component = fixture.componentInstance;
    component.text = 'this is test';
    fixture.detectChanges();
  });

  it('should be created', () => {
     expect(component).toBeTruthy();
  });

  it('should toggle view', () => {
    fixture.detectChanges();
    component.toggleView();
    expect(component.isCollapsed).toEqual(false);
  });

  it('should set current text when isCollapsed is true', () => {
    component.isCollapsed = false;
    component.maxLength = 4;
    fixture.detectChanges();
    component.toggleView();
    expect(component.isCollapsed).toEqual(true);
    expect(component.currentText).toEqual(component.text.slice(0, component.maxLength));
  });

    it('should set current text when isCollapsed is false', () => {
    component.isCollapsed = false;
    component.maxLength = 4;
    fixture.detectChanges();
    component.ngOnChanges();
    expect(component.isCollapsed).toEqual(false);
    expect(component.currentText).toEqual(component.text);
  });
});
