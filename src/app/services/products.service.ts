import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';


import {environment} from '../../environments/environment'
import { CreteProductDTO, Product, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl=`${environment.API_URL}/api/products`;
  constructor(
    private http: HttpClient
    ) { }

  getAllProducts(limit?:number,offset?:number) {
    let params= new HttpParams();
    if (limit && offset){
      params=params.set('limit',limit);
      params=params.set('offset',limit);

    }
    return this.http.get<Product[]>(this.apiUrl,{params})

  }
  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }
  getProductsByPage(limit:number,offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {params: {limit,offset}}).pipe(retry(3),map(products=> products.map(item=>{
      return {
        ...item,
        taxes: .19 * item.price
      }
    }))
    );

  }
  create(data: CreteProductDTO){
    return this.http.post<Product>(this.apiUrl,data);
  }

  update(id:string, dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`,dto);
  }
  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);

  }
}
