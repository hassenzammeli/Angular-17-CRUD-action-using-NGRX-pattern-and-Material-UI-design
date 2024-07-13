import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../_model/Product';
import { Store } from '@ngrx/store';
import { addProduct, getProduct, updateProduct } from '../../_store/Product/Product.Actions';
import { getEditdata } from '../../_store/Product/Product.Selector';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit {
  editcode = '';
  pagetitle = 'Add Product';
  constructor(private builder: FormBuilder, private store: Store, private actroute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.editcode = this.actroute.snapshot.paramMap.get('id') as string;
    if (this.editcode != null && this.editcode != '') {
      this.pagetitle = 'Edit product';
      this.myform.controls.id.disable();
      this.store.dispatch(getProduct({id:this.editcode}))
      this.store.select(getEditdata).subscribe(item => {
        this.myform.setValue({ id: item.id, title: item.title, category: item.category, price: item.price, rating: item.rating, availabilityStatus: item.availabilityStatus });
      });
    }
  }
  myform = this.builder.group({
    id: this.builder.control('', Validators.required),
    title: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    rating: this.builder.control('', Validators.required),
    availabilityStatus: this.builder.control('', Validators.required)
  })

  Saveproduct() {
    if (this.myform.valid) {
      const _obj: Product = {
        id: this.myform.value.id as string,
        title: this.myform.value.title as string,
        category: this.myform.value.category as string,
        price: this.myform.value.price as string,
        rating: this.myform.value.rating as string,
        availabilityStatus: this.myform.value.availabilityStatus as string,
        description: ''
      }
      console.log(_obj);
      if(this.editcode!=null && this.editcode!=''){
        _obj.id=this.editcode;
        this.store.dispatch(updateProduct({ inputdata: _obj }));
      }else{
        this.store.dispatch(addProduct({ inputdata: _obj }));
      }
     
    }

  }
}
