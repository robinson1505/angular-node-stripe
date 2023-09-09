import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "src/app/models/product.modal";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box-component.html",
})
export class ProductBoxComponent {
  @Input() fullwidthMode = false;
  @Output() addToCart = new EventEmitter();
  @Input() product: Product | undefined;
  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
