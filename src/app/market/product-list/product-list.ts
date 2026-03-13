import { Component, input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductCard} from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  // list of products passed in from parent ProductsPage
  products = input.required<Product[]>();
}
