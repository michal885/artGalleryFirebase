import { PaintingInterface } from './../interfaces/painting-interface';
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_FIREBASE_REALTIME_DB } from '../constant/constant';

@Injectable()
export class PaintingDataService extends DefaultDataService<PaintingInterface>{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator){
    super('Painting', http, httpUrlGenerator)
  }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(URL_FIREBASE_REALTIME_DB)
    .pipe(
      map(
        resData => {
          const paintingsArr = [];
          for(const key in resData){
            if(resData.hasOwnProperty(key)){
              paintingsArr.push({...resData[key], id: key})
            }
          }
          return paintingsArr;
        }
      )
    )
  }
}
