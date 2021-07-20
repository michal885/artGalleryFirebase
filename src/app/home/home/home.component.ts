import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectAllPaintings(category: string){
    if(category == 'all'){
      this.router.navigate(['/paintings/allPaintings'],{queryParams: {category: 'all'}})
    }
    if(category == 'portrait'){
      this.router.navigate(['/paintings/allPaintings'],{queryParams: {category: 'portrait'}})
    }
    if(category == 'landscape'){
      this.router.navigate(['/paintings/allPaintings'],{queryParams: {category: 'landscape'}})
    }
    if(category == 'abstraction'){
      this.router.navigate(['/paintings/allPaintings'],{queryParams: {category: 'abstraction'}})
    }

  }

}
