import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  constructor(private alertController: AlertController) {}

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}