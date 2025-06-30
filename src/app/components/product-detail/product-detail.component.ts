import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // CurrencyPipe para el precio
import { ActivatedRoute, RouterLink } from '@angular/router'; // ActivatedRoute para leer parámetros de ruta
import { Observable, switchMap } from 'rxjs';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink], // Añadir CurrencyPipe y RouterLink
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productApiService = inject(ProductApiService);

  product$!: Observable<Product | null>; // Puede ser null si no se encuentra
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.productApiService.getProductById(id);
        }
        return new Observable<null>(observer => observer.next(null)); // Devolver un observable de null si no hay ID
      })
    );
  }
}