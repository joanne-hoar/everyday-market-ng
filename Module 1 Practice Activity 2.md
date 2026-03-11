
# Front End Frameworks: Module 1: Practice Activity 2

## Reusable Components and Component Communication

### Learning Objectives
- Create reusable Angular components
- Pass data into a component with `input()`
- Emit events from a component with `output()`

### Prerequisites
- Complete Practice Activity 1

---

## Concepts

### Component Communication

Angular components form a tree. A parent passes data *down* to a child, and a child sends events *up* to the parent.

Angular uses **signal-based** inputs and outputs for this:

```typescript
// Child — receive data from parent
product = input.required<Product>();

// Child — emit an event to parent
selected = output<number>();
```

Bind them in the parent's template:

```html
<!-- [] passes data in, () listens for events out -->
<app-product-card [product]="p" (selected)="onSelect($event)"></app-product-card>
```

`input.required<T>()` means the parent *must* supply a value — Angular will error if it is missing.

Signal inputs are invoked as functions: `product()` not `product`.

---

## Demonstration: ProductCard

Follow along in your `practice-session` project.

### Step 1: Define the Product Model

```bash
ng generate interface market/product
```

`src/app/market/product.ts`:

```typescript
export interface Product {
	id: number;
	name: string;
	image: string;
}
```

### Step 2: Generate Components

```bash
ng generate component market/product-card
ng generate component market/product-list
```

### Step 3: Implement ProductCard

`product-card.ts`:

```typescript
import { Component, input, output } from '@angular/core';
import { Product } from '../product';

@Component({
	selector: 'app-product-card',
	imports: [],
	templateUrl: './product-card.html',
	styleUrl: './product-card.css'
})
export class ProductCard {
	product = input.required<Product>();
	selected = output<number>();

	onSelect() {
		this.selected.emit(this.product().id);
	}
}
```

`product-card.html`:

```html
<div class="product-card" (click)="onSelect()">
	<img [src]="'products/' + product().image" [alt]="product().name" />
	<h3>{{ product().name }}</h3>
</div>
```

### Step 4: Implement ProductList

`product-list.ts`:

```typescript
import { Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../product';

@Component({
	selector: 'app-product-list',
	imports: [ProductCard],
	templateUrl: './product-list.html',
	styleUrl: './product-list.css'
})
export class ProductList {
	products: Product[] = [
		{ id: 1, name: 'Laptop', image: 'laptop.svg' },
		{ id: 2, name: 'Tablet', image: 'tablet.svg' }
	];

	selectedId: number | null = null;

	onProductSelected(id: number) {
		this.selectedId = id;
	}
}
```

`product-list.html`:

```html
<div class="product-list">
	@if (selectedId) {
		<p>Selected: product #{{ selectedId }}</p>
	}
	<div class="products-grid">
		@for (product of products; track product.id) {
			<app-product-card
				[product]="product"
				(selected)="onProductSelected($event)"
			></app-product-card>
		}
	</div>
</div>
```

Add `ProductList` to `app.ts` imports and `<app-product-list>` to `app.html` to test it.

> **Test note:** The auto-generated `product-card.spec.ts` will fail because no value is provided for the required input. Use `fixture.componentRef.setInput()` to supply one before `whenStable()`:
> ```typescript
> fixture.componentRef.setInput('product', { id: 1, name: 'Test', image: 'test.svg' });
> await fixture.whenStable();
> ```

---

## Your Turn

You have seen how `input()`, `output()`, and `@for` fit together. Apply this pattern to build a new component that your assignment requires.

Think about:
- What data does the component need to receive from its parent?
- What events does it need to send back?

---

**Next Steps:** Practice Activity 3 covers centralising data in a service, configuring routes, and rendering a dynamic list.

