import { Component, OnInit, ViewChild } from '@angular/core';
import { IconsSVG } from 'src/core/enum/images-svg.enum';
import { AccountComponent } from 'src/modules/account/account.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: false,
})
export class TabsComponent implements OnInit {
  searchv2SVG = IconsSVG.searchV2SVG;
  homeSVG = IconsSVG.homeSVG;
  accountSVG = IconsSVG.accountSVG;
  @ViewChild(AccountComponent) accountComponent?: AccountComponent;

  constructor() {}

  ngOnInit() {}
  
  ionTabsDidChange($event: any) {
    console.log('ionTabsDidChange', this.accountComponent);
    console.log('Tabs changed', $event);
    if($event.tab === 'account' && this.accountComponent) {
      this.accountComponent.presenter.getUserInfo();
    }
  }
}
