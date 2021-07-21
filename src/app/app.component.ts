import { PaintingEntityService } from './services/painting.entity.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loading$: Observable<boolean>;

  constructor(private store: PaintingEntityService){

  }
  ngOnInit(): void {
    this.loading$ = this.store.loading$.pipe(
      map(loading => !!loading)
    )

  }
}
