import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { reduce } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/250",
        name: "sneakers",
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/250",
        name: "maquen",
        price: 150,
        quantity: 2,
        id: 2,
      },
    ],
  };
  columns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private _cartService: CartService,private _httpClient:HttpClient) {}

  dataSource: Array<CartItem> = [];
  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }
  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items);
  }
  onClearCart() {
    this._cartService.onClearCart();
  }
  onRemoveFromCart(item: CartItem) {
    this._cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItem) {
    this._cartService.addToCart(item);
  }
  onRemoveQuantity(item: CartItem) {
    this._cartService.removeQuantity(item);
  }
  checkout(){
    this._httpClient.post("http://localhost:4242/checkout",{
      items:this.cart.items
    }).subscribe(async(response:any) =>{
      let stripe = await loadStripe("pk_test_51NgioYHmRmd6b0mirUKRf5B69zhOnWFFng74Zvwk0y0Wvb6y4NcPbFykV197yPaLH5bVWl6R8rKIId7wucMlIr9j006HgjXLyF");

      stripe?.redirectToCheckout({
        sessionId:response.id
      })

    })

  }
}
