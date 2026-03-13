import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductList } from '../product-list/product-list';

@Component({
  selector: 'app-products-page',
  imports: [ProductList],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  products: Product[] = [
{ id: 1, title: 'Laptop' },
{ id: 2, title: 'Tablet' }
];

// catching propogated event
addToCart(id: number){
  alert(id);
}
}
