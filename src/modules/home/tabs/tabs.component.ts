import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(AccountComponent) accountComponent?: AccountComponent;
  @ViewChild(ConversationComponent)
  conversationComponent?: ConversationComponent;
  @ViewChild('tabs', { static: false }) tabs?: IonTabs;
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      const currentTab = this.tabs?.getSelected();
      console.log('Tab actual:', currentTab);
      this.tabs?.select('home');
    }, 0);
  }

  ionTabsDidChange($event: any) {
    if ($event.tab === 'account' && this.accountComponent) {
      this.accountComponent.presenter.getUserInfo();
    }
    if ($event.tab === 'message' && this.conversationComponent) {
      this.conversationComponent.userId = Number(
        localStorage.getItem('userId')
      );
      this.conversationComponent.getConversation();
    }
  }

  ionViewWillEnter() {
    setTimeout(() => {
      console.log('tabs', this.tabs);
      this.tabs?.select('home');
    }, 0);
    if (this.accountComponent) {
      this.accountComponent.presenter.getUserInfo();
    }
    if (this.conversationComponent) {
      this.conversationComponent.userId = Number(
        localStorage.getItem('userId')
      );
      this.conversationComponent?.getConversation();
    }
  }
}
