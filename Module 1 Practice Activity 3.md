# Front End Frameworks: Module 1: Practice Activity 3

## Services, Routing, and Data Iteration

### Learning Objectives
- Centralise shared data in an injectable service using signals
- Configure routes and navigate between pages
- Render a dynamic list from a service using `@for`

### Prerequisites
- Complete Practice Activity 2

---

## Concepts

### Why Services?

Components should not own data that multiple parts of the app need. A service is a single shared instance — any component can inject it and always see the same data:

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
	products = signal<Product[]>([...]);
}
```

Inject and use it anywhere:

```typescript
productService = inject(ProductService);
// productService.products() is always current
```

`inject()` is the modern way to declare dependencies — no constructor parameters needed.

### Routing

Routes map URL paths to components. The `<router-outlet>` in `app.html` is where the matched component renders.

---

## Demonstration: ProductService and ProductsPage

### Step 1: Generate the Service

```bash
ng generate service market/services/product-service
```

`src/app/market/services/product-service.ts`:

```typescript
import { Injectable, signal } from '@angular/core';
import { Product } from '../product';

@Injectable({ providedIn: 'root' })
export class ProductService {
	products = signal<Product[]>([
		{ id: 1, name: 'Laptop', image: 'laptop.svg' },
		{ id: 2, name: 'Tablet', image: 'tablet.svg' },
		{ id: 3, name: 'Monitor', image: 'monitor.svg' }
	]);
}
```

### Step 2: Generate Page Components

```bash
ng generate component market/home-page
ng generate component market/products-page
```

### Step 3: Configure Routes

`app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { HomePage } from './market/home-page/home-page';
import { ProductsPage } from './market/products-page/products-page';

export const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomePage },
	{ path: 'products', component: ProductsPage }
];
```

Update `app.html` to show only the header and router outlet:

```html
<app-header></app-header>
<router-outlet></router-outlet>
```

Add navigation links to `header.html`:

```html
<a routerLink="/home" routerLinkActive="activebutton">Home</a>
<a routerLink="/products" routerLinkActive="activebutton">Products</a>
```

Import `RouterLink` and `RouterLinkActive` in `header.ts`:

```typescript
imports: [RouterLink, RouterLinkActive]
```

> **Test note:** Once `RouterLink` is imported in `header.ts`, specs that render `Header` or `App` will throw `NG0201: No provider found for ActivatedRoute`. Fix those specs by adding `provideRouter([])` to their `TestBed` providers.

### Step 4: Inject the Service into ProductList

Update `product-list.ts` to pull from `ProductService` instead of a hardcoded array:

```typescript
import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product-service';
import { ProductCard } from '../product-card/product-card';

@Component({
	selector: 'app-product-list',
	imports: [ProductCard],
	templateUrl: './product-list.html',
	styleUrl: './product-list.css'
})
export class ProductList {
	productService = inject(ProductService);
}
```

`product-list.html`:

```html
<div class="products-grid">
	@for (product of productService.products(); track product.id) {
		<app-product-card [product]="product"></app-product-card>
	}
</div>
```

### Step 5: Display ProductList on the Products Page

`products-page.ts`:

```typescript
import { Component } from '@angular/core';
import { ProductList } from '../product-list/product-list';

@Component({
	selector: 'app-products-page',
	imports: [ProductList],
	templateUrl: './products-page.html',
	styleUrl: './products-page.css'
})
export class ProductsPage {}
```

`products-page.html`:

```html
<div class="products-page">
	<h1>Products</h1>
	<app-product-list></app-product-list>
</div>
```

Remove `ProductList` from `app.ts` imports and `<app-product-list>` from `app.html` — it now lives on the products page.

---

## Your Turn

You have seen how a service centralises data, how routes map paths to pages, and how `@for` renders a list from a signal. Apply these patterns to the features your assignment requires.

Think about:
- What data in your assignment should live in a service?
- What routes does your assignment need?
- What lists will you render with `@for`?

---

**Next Steps:** Module 3 Practice Activities build on this foundation, adding route parameters and form validation.
