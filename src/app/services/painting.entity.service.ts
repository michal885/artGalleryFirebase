import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { PaintingInterface } from "../interfaces/painting-interface";


@Injectable()
export class PaintingEntityService extends EntityCollectionServiceBase<PaintingInterface>{
  constructor(elementsFactory: EntityCollectionServiceElementsFactory){
    super('Painting', elementsFactory)
  }
}
