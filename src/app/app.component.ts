import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    StatusBar.setOverlaysWebView({ overlay: false });
    this.getDeviceInfo();
  }
  async getDeviceInfo() {
    const info = await Device.getInfo();
    const DeviceId = await Device.getId();
    localStorage.setItem('deviceInfo', JSON.stringify(DeviceId));
  }

}
