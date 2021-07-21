
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
    component: PaintingsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaintingsRoutingModule { }
