import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cfs-content-loading',
  templateUrl: './content-loading.component.html',
  styleUrls: ['./content-loading.component.scss']
})
export class ContentLoadingComponent implements OnInit {

  @Input() repeats = 1;
  @Input() iterates: Array<number> = [];
  constructor() { }

  ngOnInit() {
    this.iterates = Array(this.repeats).fill(0);
  }

}
