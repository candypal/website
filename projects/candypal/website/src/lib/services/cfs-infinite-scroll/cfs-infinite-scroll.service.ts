import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class CfsInfiniteScrollService {

  public scrolledBehaviorSubject = new Subject<any>();
  constructor() { }
}
