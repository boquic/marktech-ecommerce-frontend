// src/app/components/notification/notification.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NotificationData {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() notification: NotificationData | null = null;
  
  private timeoutId: number | null = null;
  show = false;

  ngOnInit(): void {
    if (this.notification) {
      this.show = true;
      const duration = this.notification.duration || 3000;
      this.timeoutId = window.setTimeout(() => {
        this.hide();
      }, duration);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  hide(): void {
    this.show = false;
  }

  getIconClass(): string {
    if (!this.notification) return '';
    
    switch (this.notification.type) {
      case 'success': return 'bi bi-check-circle';
      case 'error': return 'bi bi-x-circle';
      case 'warning': return 'bi bi-exclamation-triangle';
      case 'info': return 'bi bi-info-circle';
      default: return 'bi bi-info-circle';
    }
  }

  getAlertClass(): string {
    if (!this.notification) return '';
    
    switch (this.notification.type) {
      case 'success': return 'alert-success';
      case 'error': return 'alert-danger';
      case 'warning': return 'alert-warning';
      case 'info': return 'alert-info';
      default: return 'alert-info';
    }
  }
}
