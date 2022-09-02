import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';

import { CreteProductDTO, UpdateProductDTO} from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen:Product={
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name:'',
  },
  description: ''
};
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id:string){
    this.productsService.getProduct(id)
      .subscribe(data =>{
        this.toggleProductDetail();
        this.productChosen=data;
      });

  }
  createNewProduct(){
    const product:CreteProductDTO={
      title: 'nuevo producto',
      description:'sdsdsdsdsdsd',
      images:[''],
      price:122,
      categoryId:2,

    }
    this.productsService.create(product).subscribe(data=>{
      console.log('create',data);
      this.products.unshift(data);
    });
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title:'nuevo title',

    }
    const id = this.productChosen.id;
    this,this.productsService.update(id,changes).subscribe(data => {
      const ProductIndex= this.products.findIndex(item=> item.id===this.productChosen.id);
      this.products[ProductIndex]=data;
    })
  }
}
