import { PaintingsRoutingModule } from './paintings.routing.module';
import { PaintingDataService } from './../services/painting.data.service';
import { PaintingEntityService } from './../services/painting.entity.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPaintingsComponent } from './all-paintings/all-paintings.component';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { ReactiveFormsModule } from '@angular/forms';
import { PaintingsComponent } from './paintings.component';
import { PaintingsDetailsComponent } from './paintings-details/paintings-details.component';


export const paintingsEntityMetadata: EntityMetadataMap = {
  Painting: {

  }
}

@NgModule({
  declarations: [
    AllPaintingsComponent,
    PaintingsComponent,
    PaintingsDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaintingsRoutingModule

  ],
  providers:[
    PaintingEntityService,
    PaintingDataService
  ]
})
export class PaintingsModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private paintingDataService: PaintingDataService
    ){
    eds.registerMetadataMap(paintingsEntityMetadata);
    entityDataService.registerService('Painting', paintingDataService)
  }
}
