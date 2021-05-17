import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export function appInitFactory(init: AppInitService): () => Promise<any> {
  return () => init.load().toPromise();
}

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor() {
  }

  public load(): Observable<any> {
    return Observable.create()
      .pipe(
        map((res) => {
          // can run other app initializations here that must be run after the config has been loaded
          // can also run then in other APP_INITIALIZERS

          return res;
        })
      );
  }
}
