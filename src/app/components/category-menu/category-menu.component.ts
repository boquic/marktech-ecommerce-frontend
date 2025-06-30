// src/app/components/category-menu/category-menu.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Para los enlaces
import { CategoryApiService } from '../../services/category-api.service';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  private categoryApiService = inject(CategoryApiService);
  rootCategories$!: Observable<Category[]>;
  // Podrías tener lógica para cargar y mostrar subcategorías también

  ngOnInit(): void {
    this.rootCategories$ = this.categoryApiService.getRootCategories();
  }
}