import {Component, Input, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cfs-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.scss']
})
export class CorouselComponent implements OnInit {

  @Input() slides: Array<{
    header: string,
    desc: string,
    url: string,
    alt: string
  }> = [];
  constructor(ngbCarouselConfig: NgbCarouselConfig) {
    ngbCarouselConfig.interval = 3000;
    ngbCarouselConfig.wrap = true;
  }

  ngOnInit() {
  }

}
