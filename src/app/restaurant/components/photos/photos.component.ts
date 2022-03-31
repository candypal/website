import {Component, Input, OnInit} from '@angular/core';
import {NgbCarousel} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cfs-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  providers: [NgbCarousel]
})
export class PhotosComponent implements OnInit {
  @Input() photos: Array<any> = [];
  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(public ngbCarousel: NgbCarousel) {
  }

  ngOnInit() {
  }

}
