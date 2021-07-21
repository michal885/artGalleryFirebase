import { HomeComponent } from './home/home/home.component';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { AllPaintingsComponent } from './paintings/all-paintings/all-paintings.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PaintingResolverService } from './services/resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import { PaintingsComponent } from './paintings/paintings.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve:{
      paintings: PaintingResolverService
    }
  },
  {
    path: 'paintings',
    component: PaintingsComponent
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo:'/page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
