import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MapService} from '../../services/map/map.service';
import {faStreetView, faUtensilSpoon} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cfs-change-location-model',
  templateUrl: './change-location-model.component.html',
  styleUrls: ['./change-location-model.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeLocationModelComponent implements OnInit {

  public searchForm: UntypedFormGroup = new UntypedFormGroup({
    location: new UntypedFormControl()
  });

  @ViewChild('search', {static: true}) public search: ElementRef | undefined;

  @Input() input: any;
  @Output() output = new EventEmitter<string>();

  faStreetView = faStreetView;
  faUtensilSpoon = faUtensilSpoon;

  constructor(
    public activeModal: NgbActiveModal,
    private mapService: MapService,
  ) {

  }

  ngOnInit() {
    // create search FormControl
    this.mapService.autoComplete(this.search, this.output);
  }

  onSubmit() {
    if (this.searchForm.valid) {
    }
  }
}
