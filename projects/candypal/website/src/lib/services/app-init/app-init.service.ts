import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

export function appInitFactory(init: AppInitService): () => Observable<any> {
  return () => init.load();
}

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor() {
  }

  public load(): Observable<any> {
    return new Observable<any>()
      .pipe(
        map((res) => {
          // can run other app initializations here that must be run after the config has been loaded
          // can also run then in other APP_INITIALIZERS

          return res;
        })
      );
  }
}
