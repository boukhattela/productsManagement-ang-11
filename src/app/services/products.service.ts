import { Product } from './../model/product.model';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn:"root"})

export class ProductsService{

constructor(private http:HttpClient){

}
getAllProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products");
}
getAvailableProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?available=true");
}
getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?selected=true");
}
searchProducts(keyword:string):Observable<Product[]>{
  let host=environment.host;
  return this.http.get<Product[]>(host+"/products?name_like="+keyword);
}
select(product: Product):Observable<Product>{
  let host=environment.host;
  product.selected=!product.selected;
  return this.http.put<Product>(host+"/products/"+product.id,product);
}

delete(product: Product):Observable<void>{
  let host=environment.host;

  //return this.http.delete<number>(host+"/products/"+product.id);
   return this.http.delete<void>(host+"/products/"+product.id);
}

saveProduct(product: Product):Observable<Product>{
  let host=environment.host;

  //return this.http.delete<number>(host+"/products/"+product.id);
   return this.http.post<Product>(host+"/products",product);
}
getProductById(id: number):Observable<Product>{
  let host=environment.host;
  return this.http.get<Product>(host+"/products/"+id);
}
Update(product: Product):Observable<Product>{
  let host=environment.host;

  return this.http.put<Product>(host+"/products/"+product.id,product);
}



}
