import { PaintingEntityService } from './../../services/painting.entity.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaintingInterface } from 'src/app/interfaces/painting-interface';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParamsPaintings } from 'src/app/models/params-paintings';

@Component({
  selector: 'app-all-paintings',
  templateUrl: './all-paintings.component.html',
  styleUrls: ['./all-paintings.component.scss']
})
export class AllPaintingsComponent implements OnInit, OnDestroy {

  params = new ParamsPaintings(null, null, null, null, null, null);
  paintings$: Observable<PaintingInterface[]>;
  loading$: Observable<boolean>;
  filterForm: FormGroup;
  searchForm: FormGroup;
  toggler: boolean = true;
  filterSmallScreen: string = 'filterSmallScreen';
  showCount: number = 15;
  displaShowMoreButton: string = '';
  sub = new Subscription();
  mainColors = ['yellow','white','red','orange','grey','green','blue','black']

  constructor(
    private paintingEntSer: PaintingEntityService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute){

    }


  ngOnInit(): void {
  this.sub = this.activatedRoute.queryParamMap
    .pipe(
      map(
        params => {
          let paramsLocal = new ParamsPaintings(null, null, null, null, null, null);
          paramsLocal.category = params.get('category');
          paramsLocal.author = params.get('author');
          paramsLocal.supportOrSurface = params.get('supportOrSurface');
          paramsLocal.technique = params.get('technique');
          paramsLocal.mainColor = params.get('mainColor');
          paramsLocal.title = params.get('title');
          return paramsLocal;
        }
      )
    )
    .subscribe(
      params => {
        this.params.category = params.category;
        if(params.category == 'all'){
          params.category = '';
        }
        this.filterForm = this.fb.group({
          category: [params.category],
          author: [params.author],
          supportOrSurface:[params.supportOrSurface],
          technique: [params.technique],
          mainColor:[params.mainColor]
        })

        this.searchForm = this.fb.group({
          searchTitle:[params.title]
        })
        if(params.title == null || params.title == 'null'){
          this.filter();
          this.params = {
            category: null,
            author: null,
            supportOrSurface: null,
            technique: null,
            mainColor: null,
            title: null
          }
        }else{
          this.searchTitle();
        }


      }
    )
  }

  filter(){
    const formVal = this.filterForm.value;
    this.searchForm.reset({
      searchTitle:(null)
    })
    this.params.title = null;
    this.paintings$ = this.paintingEntSer.entities$.pipe(
      map(paintings => {
        let paintingsArr = paintings;
        if(formVal.category && formVal.category != 'null'){
          paintingsArr = paintingsArr.filter(painting => painting.category == formVal.category);
          this.params.category = formVal.category;
        }
        if(formVal.author && formVal.author != 'null'){
          paintingsArr = paintingsArr.filter(painting => painting.author == formVal.author);
          this.params.author = formVal.author;
        }
        if(formVal.supportOrSurface && formVal.supportOrSurface != 'null'){
          paintingsArr = paintingsArr.filter(painting => painting.supportOrSurface == formVal.supportOrSurface);
          this.params.supportOrSurface = formVal.supportOrSurface;
        }
        if(formVal.technique && formVal.technique != 'null'){
          paintingsArr = paintingsArr.filter(painting => painting.technique == formVal.technique);
          this.params.technique = formVal.technique;
        }
        if(formVal.mainColor && formVal.mainColor != 'null'){
          paintingsArr = paintingsArr.filter(painting => painting.mainColor == formVal.mainColor);
          this.params.mainColor = formVal.mainColor;
        }
        if(paintingsArr.length > this.showCount){
          let paintingsArr2 = [];
          for(let i=0;i<this.showCount;i++){
            paintingsArr2.push(paintingsArr[i])
          }
          paintingsArr = paintingsArr2;
          this.displaShowMoreButton = '';
        }else{
          this.displaShowMoreButton = 'none';
        }
        return paintingsArr;
      })
    )
  }

  resetFilter(){
    this.searchForm.reset({
      searchTitle:(null)
    })
    this.filterForm.reset({
      category: (null),
      author: (null),
      supportOrSurface:(null),
      technique: (null),
      mainColor:(null)
    });
    this.params = {
      category: null,
      author: null,
      supportOrSurface: null,
      technique: null,
      mainColor: null,
      title: null
    };
    this.filter();
    this.showCount = 0;
    this.showMore();
  }

  showMore(){
    const searchFormVal = this.searchForm.value.searchTitle;
    this.showCount = this.showCount + 15;
    if(!searchFormVal){
      this.filter();
    }
  }

  filterChange(){
    this.toggler =! this.toggler;
    if(this.toggler){
      this.filterSmallScreen = 'filterSmallScreen';
    }
    if(!this.toggler){
      this.filterSmallScreen = '';
    }
  }

  searchTitle(){
    const formVal = this.searchForm.value.searchTitle + '' ;
    this.params.title = formVal;
    this.paintings$ = this.paintingEntSer.entities$.pipe(
      map(
        paintings => {
          let paintingsArr = [];
          paintingsArr = paintings.filter(painting => painting.title.toLowerCase().includes(formVal.toLowerCase()));
          if(paintingsArr.length > this.showCount){
            let paintingsArr2 = [];
            for(let i=0;i<this.showCount;i++){
              paintingsArr2.push(paintingsArr[i])
            }
            paintingsArr = paintingsArr2;
          }else{
            this.displaShowMoreButton = 'none';
          }
          return paintingsArr;
        }
      )
    )
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
