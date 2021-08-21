import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  formGroup?:FormGroup;
  constructor(private activatedroute: ActivatedRoute,private productService: ProductsService,
    private fb: FormBuilder) {

    this.productId=activatedroute.snapshot.params.id;

   }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe(
      product=>{
        this.formGroup= this.fb.group(
          {
            id:[product.id, Validators.required],
            name:[product.name, Validators.required],
            price:[product.price, Validators.required],
            quantity:[product.quantity, Validators.required],
            selected:[product.selected, Validators.required],
            available:[product.available, Validators.required]
          }
        )
      }
    )


  }
  onUpdate(){

    this.productService.Update(this.formGroup?.value).subscribe(data=>{
      alert("zedna zabor omo")
    })


  }

}
