import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { PaintingEntityService } from './painting.entity.service';

@Injectable({
  providedIn: 'root'
})
export class PaintingResolverService implements Resolve<boolean>{

  constructor(private paintingEntSer: PaintingEntityService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.paintingEntSer.loaded$
    .pipe(
      tap(
        loaded => {
          if(!loaded){
            this.paintingEntSer.getAll()
          }
        }
      ),
      filter(loaded => !!loaded),
      first()
    );
  }


}
