import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaintingEntityService } from 'src/app/services/painting.entity.service';
import { PaintingInterface } from 'src/app/interfaces/painting-interface';
import { noop, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsPaintings } from 'src/app/models/params-paintings';

@Component({
  selector: 'app-paintings-details',
  templateUrl: './paintings-details.component.html',
  styleUrls: ['./paintings-details.component.scss']
})
export class PaintingsDetailsComponent implements OnInit, OnDestroy {

  subArr: Subscription[] = [];
  painting$: Observable<PaintingInterface>;
  params = new ParamsPaintings(null, null, null, null, null, null);
  paintingId: string = null;
  constructor(private paintingEntSer: PaintingEntityService, private activateRoute: ActivatedRoute) { }


  ngOnInit(): void {
  this.subArr.push(this.activateRoute.queryParamMap.pipe(
      map(
        params => {
          let paramArr = new ParamsPaintings( null, null, null, null, null, null);
          paramArr.category = params.get('category');
          paramArr.author = params.get('author');
          paramArr.supportOrSurface = params.get('supportOrSurface');
          paramArr.technique = params.get('technique');
          paramArr.mainColor = params.get('mainColor');
          paramArr.title = params.get('title');
          return paramArr;
        }
      )
    )
    .subscribe(params => this.params = params));

  this.subArr.push(this.activateRoute.paramMap
    .subscribe(
      params => this.paintingId = params.get('id')
    ));

  this.painting$ = this.paintingEntSer.entities$.pipe(
    map(
      paintings => paintings.find(painting => painting.id == this.paintingId)
    )
  )
  }

  ngOnDestroy(): void {
      this.subArr.forEach(s => s.unsubscribe());
    }
}
