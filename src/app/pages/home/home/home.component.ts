import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, SubscriptionLike } from "rxjs";
import { Product } from "src/app/models/product.modal";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";
const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = "desc";
  count = "12";
  productSubscription: Subscription | undefined;
  rowHeight = ROW_HEIGHT[this.cols];

  constructor(
    private _cartService: CartService,
    private _storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
  
    this.productSubscription = this._storeService
      .getAllProduct(this.count, this.sort,this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
  }
  onShowCategory(newCategory: string): void {
    console.log("Category",newCategory)
    this.category = newCategory;
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this._cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChange(newCount: number) {
    this.count = newCount.toString();
    this.getProducts();
  }
  onSortChange(newSort:string){
    this.sort = newSort
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
