import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(private fb: FormBuilder,private productService: ProductsService ) { }

  ngOnInit(): void {
    this.formGroup=this.fb.group({
      name:["", Validators.required],
      price:[0, Validators.required],
      quantity:[0, Validators.required],
      selected:[true, Validators.required],
      available:[true, Validators.required]


    })

  }
  onSave(){
    this.productService.saveProduct(this.formGroup?.value).subscribe(
      (data)=>{
        alert("product added successefuly")
      }

    )


  }

}
