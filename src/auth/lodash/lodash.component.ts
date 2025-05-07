import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeOut } from 'src/core/enum/timeout.enum';

@Component({
  selector: 'app-lodash',
  templateUrl: './lodash.component.html',
  styleUrls: ['./lodash.component.scss'],
})
export class LodashComponent implements OnInit {

  constructor(private navigate: Router) { } // Inyecta el Router

  ngOnInit() {
    this.startLodash();
  }


  startLodash() {
    const lodashUser = localStorage.getItem('lodashUser');

    if (lodashUser) {
      const user = JSON.parse(lodashUser);
      this.navigate.navigate(['/auth/login']);

      console.log('Lodash User:', user);
    } else {
      localStorage.setItem('lodashUser', 'true');
      setInterval(() => {
        this.navigate.navigate(['/auth/login']);
      }, TimeOut.SHORT);
    }
  }
}
