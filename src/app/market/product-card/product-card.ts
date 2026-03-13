import { Component, input, output } from '@angular/core';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  // required input from ProdcutList (parent)
  product = input.required<Product>();

  added = output<number>();
  
  addToCart(){
    this.added.emit(this.product().id);
  }
}
