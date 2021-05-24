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
  constructor() { }

  ngOnInit() {
  }

}
