import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../_model/Product';
import { MaterialModule } from '../../../_module/Material.Module';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  deleteProduct,
  loadProduct,
} from '../../_store/Product/Product.Actions';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { getProductList } from '../../_store/Product/Product.Selector';
import { MatListModule } from '@angular/material/list';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink, MatListModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  displayColumns: string[] = [
    'title',
    'category',
    'price',
    'stock',
    'rating',
    'availabilityStatus',
    'purchase',
    'action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  productdata!: Product[];
  datasource!: MatTableDataSource<Product>;
  selectedTitles: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.LoadInitialData();
  }

  LoadInitialData() {
    this.store.dispatch(loadProduct());
    this.store.select(getProductList).subscribe((item) => {
      if (!item) {
        return;
      }
      this.productdata = item;
      this.datasource = new MatTableDataSource(this.productdata);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  deleteProduct(id: string) {
    if (confirm('Do you want to remove?')) {
      this.store.dispatch(deleteProduct({ id }));
    }
  }

  editProduct(id: string) {
    this.router.navigateByUrl('/product/edit/' + id);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
  addTitleToList(title: string): void {
    if (!this.selectedTitles.includes(title)) {
      this.selectedTitles.push(title);
    }
  }

  openDialog(product: Product): void {
    this.dialog.open(ProductDialogComponent, {
      data: {
        title: product.title,
        description: product.description, 
        availabilityStatus: product.availabilityStatus,
      },
    });
  }
}