// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationData } from '../components/notification/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<NotificationData | null>(null);
  public notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string, duration: number = 3000): void {
    this.show({ message, type: 'success', duration });
  }

  showError(message: string, duration: number = 5000): void {
    this.show({ message, type: 'error', duration });
  }

  showWarning(message: string, duration: number = 4000): void {
    this.show({ message, type: 'warning', duration });
  }

  showInfo(message: string, duration: number = 3000): void {
    this.show({ message, type: 'info', duration });
  }

  private show(notification: NotificationData): void {
    this.notificationSubject.next(notification);
  }

  hide(): void {
    this.notificationSubject.next(null);
  }
}
