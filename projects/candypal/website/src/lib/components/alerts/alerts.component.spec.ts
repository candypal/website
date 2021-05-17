import { inject, ComponentFixture, TestBed, tick, fakeAsync, flushMicrotasks, waitForAsync } from '@angular/core/testing';

import { AlertsComponent } from './alerts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import {AlertService, SuccessAlert} from '../../services/alert/alert.service';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule],
      providers: [
        AlertService
      ],
      declarations: [AlertsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should listen to AlertService for alerts', inject([AlertService], (alerter: AlertService) => {
    const alert = new SuccessAlert('Success Title', 'Success Subtitle', 'success text');
    alerter.alert(alert);
    fixture.detectChanges();
    const alerts = fixture.debugElement.queryAll(By.css('.sd-alerts ngb-alert'));
    expect(alerts.length).toBe(1);
    expect(alerts[0].query(By.css('h4')).nativeElement.textContent).toContain('Success Title');
    expect(alerts[0].query(By.css('h6')).nativeElement.textContent).toContain('Success Subtitle');
    expect(alerts[0].query(By.css('p')).nativeElement.textContent).toContain('success text');
  }));

  it('should closeAlert after delayTime', fakeAsync(inject([AlertService], (alerter: AlertService) => {
    const alert = new SuccessAlert('Success Title', 'Success Subtitle', 'success text');
    spyOn(component, 'closeAlert').and.callThrough();
    alerter.alert(alert);
    tick();
    fixture.detectChanges();

    let alerts = fixture.debugElement.queryAll(By.css('.sd-alerts ngb-alert'));
    expect(alerts.length).toBe(1);
    expect(alerts[0].query(By.css('h4')).nativeElement.textContent).toContain('Success Title');
    expect(alerts[0].query(By.css('h6')).nativeElement.textContent).toContain('Success Subtitle');
    expect(alerts[0].query(By.css('p')).nativeElement.textContent).toContain('success text');

    tick(component.delay / 2);
    // should still be there
    alerts = fixture.debugElement.queryAll(By.css('.sd-alerts ngb-alert'));
    expect(alerts.length).toBe(1);

    tick(component.delay / 2);

    fixture.detectChanges();
    // should no longer be there
    alerts = fixture.debugElement.queryAll(By.css('.sd-alerts ngb-alert'));
    expect(alerts.length).toBe(0);
    expect(component.closeAlert).toHaveBeenCalledWith(alert);
  })));

});
