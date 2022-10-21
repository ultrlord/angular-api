import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';



import { CreteProductDTO, Product, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl='/api/products';
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
    .pipe(retry(3));
  }
  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }
  getProductsByPage(limit:number,offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {params: {limit,offset}});

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
