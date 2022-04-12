import {Component, Input, OnInit} from '@angular/core';

export interface Review {
  profile_photo_url: string;
  author_name: string;
  relative_time_description: string;
  rating: number;
  text: string;
}

@Component({
  selector: 'cfs-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() reviews: Array<Review> = [];
  responsiveOptions: any

  constructor() {
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
