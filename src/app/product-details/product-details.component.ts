import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  @Input() product!: IProduct;
  @Output() buy = new EventEmitter();

   getImageUrl(product: IProduct) {
      if (!product) return '';
      return '/assets/images/robot-parts/' + product.imageName;
    }
  
   
  
    getdiscountedclasses(product: IProduct){
      return {striketh:product.discount > 0};
    }

    buybuttonclick(product: IProduct) {
      //this.buy.emit(product);
      this.buy.emit();
    }
  }

