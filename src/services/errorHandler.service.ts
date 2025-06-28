import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoginComponent } from 'src/auth/login/login.component';
import { ErrorRegister } from 'src/core/enum/errorRegister.enum';
import { TypeRegister } from 'src/core/enum/user_register.enum';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private alertController: AlertController) {}

  async handleError(
    component: LoginComponent,
    registerUser: string,
    error: any
  ): Promise<void> {
    const errorMessage = error?.error?.errorCode;
    if (errorMessage) {
      switch (errorMessage) {
        case ErrorRegister.UNKREG00:
          component.registerUserGuest();
          break;
        case ErrorRegister.UNKREG01:
          const alertTwo = await this.alertController.create({
            header: 'Error en el sistema',
            message:
              'No pudimos realizar el proceso de Acceso. Contactanos: soporte@desuka.com',
            buttons: ['Cerrar'],
          });

          await alertTwo.present();
          break;
        case ErrorRegister.UNKREG02:
          if (registerUser === TypeRegister.INVITED) {
            component.loginUser(registerUser);
          }

          break;

        default:
          const alert = await this.alertController.create({
            header: 'Error en el sistema',
            message:
              'Lamentamos los inconvenientes ocurrio un error en Desuka. Contactanos: soporte@desuka.com',
            buttons: ['Cerrar'],
          });
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error en el sistema',
        message:
          'Lamentamos los inconvenientes ocurrio un error en Desuka. Contactanos: soporte@desuka.com',
        buttons: ['Cerrar'],
      });

      await alert.present();
    }
    console.error('Error:', error);
  }
}
