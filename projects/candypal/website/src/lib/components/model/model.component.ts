import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cfs-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  @Input() title: string | undefined;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
