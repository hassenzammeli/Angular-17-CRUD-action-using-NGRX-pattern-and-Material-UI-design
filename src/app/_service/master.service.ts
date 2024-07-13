import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from '../../_model/posts';
import { Product } from '../../_model/Product';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {
  }

  getall() {
    return this.http.get<Posts[]>('http://localhost:3000/posts');
  }

  GetAllProduct() {
    return this.http.get<any>('https://dummyjson.com/products');
  }
  

  GetProductbycode(id:string) {
    return this.http.get<Product>('https://dummyjson.com/products/Getbyid?id='+id);
  }

  CreateProduct(product: Product) {
    return this.http.post('https://dummyjson.com/products/add', product);
  }
  UpdateProduct(product: Product) {
    return this.http.put('https://dummyjson.com/products/Update?id='+product.id, product);
  }
  DeleteProduct(id:string) {
    return this.http.delete('https://dummyjson.com/products/Remove?id='+id);
  }
  haveaccess() {
    return true;
  }
}
