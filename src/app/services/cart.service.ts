import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackbar: MatSnackBar) {}
  addToCart(item: CartItem) {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackbar.open("1 Item added in the cart", "Ok", {
      duration: 3000,
    });
  }
  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
  onClearCart() {
    this.cart.next({ items: [] });
    this._snackbar.open("Cart is Cleared", "Ok", {
      duration: 3000,
    });
  }
  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItem = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (update) {
      this.cart.next({ items: filteredItem });
      this._snackbar.open("1 Item Removed from the cart", "Ok", {
        duration: 3000,
      });
    }
    return filteredItem;
  }

  removeQuantity(item: CartItem) {
    let itemForRemoval: CartItem | undefined;
    let filterdItem = this.cart.value.items.map((_item) => {
      if (_item.id == item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if (itemForRemoval) {
      filterdItem = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({ items: filterdItem });
    this._snackbar.open("1 Item Removed from the cart", "Ok", {
      duration: 3000,
    });
  }
}
