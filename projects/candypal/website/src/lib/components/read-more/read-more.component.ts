import {Component, Input, OnChanges, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'cfs-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})

export class ReadMoreComponent implements OnChanges {
  @Input() text: string = '';
  @Input() maxLength = 100;
  @Input() hideLink: boolean = false;
  @Input() linkLabel: string | undefined;
  public currentText: string = '';
  public hideToggle = true;

  public isCollapsed = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
    this.changeDetectorRef.detectChanges();
  }

  determineView() {
    if (this.text && (this.text.length <= this.maxLength)) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed === true) {
      this.currentText = this.text.substring(0, this.maxLength);
      this.currentText = this.currentText.split('</br>')[0];
      this.currentText += (this.hideLink) ? '...' : '';
    } else if (this.isCollapsed === false) {
      this.currentText = this.text;
    }

  }

  ngOnChanges() {
    this.determineView();
  }
}
