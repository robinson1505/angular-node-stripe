import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort= "desc"
  itemsShowCount = 12

  onSortUpdate(newSort: string): void {
    this.sort = newSort
    this.sortChange.emit(newSort);
  }

  onItemUpdate(count: number): void {
    this.itemsShowCount =count
    this.itemsCountChange.emit(count);
  }
  onColumnsUpdate(colNumber: number): void {
    this.columnsCountChange.emit(colNumber);
  }
}
