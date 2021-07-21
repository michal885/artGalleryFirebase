import { PaintingsDetailsComponent } from './paintings-details/paintings-details.component';
import { AllPaintingsComponent } from './all-paintings/all-paintings.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaintingsComponent } from './paintings.component';
import { PaintingResolverService } from '../services/resolver.service';



const routes: Routes = [
  {
    path: 'paintings',
    redirectTo: '/paintings/allPaintings',
    pathMatch: 'full'
  },
  {
    path: 'paintings',
    children:[
      {
        path: 'allPaintings',
        component: AllPaintingsComponent,
        resolve:{
          paintings: PaintingResolverService
        }
      },
      {
        path: 'allPaintings/:id',
        component: PaintingsDetailsComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaintingsRoutingModule { }
