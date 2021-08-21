
import { Product } from './../../model/product.model';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //products?: Product[];
 products$:Observable<AppDataState<Product[]>>|null=null;
 readonly  DataStateEnum=DataStateEnum;
  constructor(private productService:ProductsService ,private router: Router) { }

  ngOnInit(): void {
  }
  /*ongetAllProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products=data;
    })

  }*/
  ongetAllProducts(){

      this.products$=this.productService.getAllProducts().pipe(
        map(data=>({dataState: DataStateEnum.LOADED, data:data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))

      )
    }
  /*ongetAvailableProducts(){
    this.productService.getAvailableProducts().subscribe(data=>{
      this.products=data;
    })

  }*/
  ongetAvailableProducts(){

    this.products$=this.productService.getAvailableProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))

    )
  }
  /*ongetSelectedProducts(){
    this.productService.getSelectedProducts().subscribe(data=>{
      this.products=data;
    })

  }*/
  ongetSelectedProducts(){

    this.products$=this.productService.getSelectedProducts().pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))

    )
  }

  OnSearch(dataForm: any){

this.products$=this.productService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR,errorMessage:err.message}))

    )
  }
  onSelect(p: Product){

    this.productService.select(p).subscribe(data=>{
      p.selected=data.selected;})
    }
    onDelete(p: Product){
     let a=confirm("do you confirm delete");
     if(a==true){
      this.productService.delete(p).subscribe(
        data=>{this.ongetAllProducts()
        }
      )
    }
      ;


    }
    onNewProducts(){
      this.router.navigateByUrl("New")

    }
    onEditProducts(p: Product){
      this.router.navigateByUrl("Edit/"+p.id)

  }
}

