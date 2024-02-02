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
  responsiveOptions: any;

  constructor(public ngbCarousel: NgbCarousel) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
  }

}
