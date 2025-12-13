import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { IconsSVG } from 'src/core/enum/images-svg.enum';
import { AccountComponent } from 'src/modules/account/account.component';
import { ConversationComponent } from '../chat-general/conversation/conversation.component';

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
  constructor() {}

  ngOnInit() {}
}
