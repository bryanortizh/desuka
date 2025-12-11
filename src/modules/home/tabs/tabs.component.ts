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
  @ViewChild(AccountComponent) accountComponent?: AccountComponent;
  @ViewChild(ConversationComponent)
  conversationComponent?: ConversationComponent;
  @ViewChild('tabs', { static: false }) tabs?: IonTabs;
  constructor(private router: Router) {}

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

  /**
   * Recibe el nombre del tab y redirige al home, luego intenta seleccionar el tab indicado.
   * Esto permite que componentes hijos (como `search-box`) soliciten abrir el home y seleccionar un tab.
   */
  goToHomeWithTab(tab: string) {
    // Primero navegar al route 'home' para asegurar que el componente Tabs esté activo
    this.router.navigate(['home']).then(() => {
      // Dar tiempo a que la vista cargue y luego seleccionar el tab en IonTabs
      setTimeout(() => {
        try {
          // Intentamos seleccionar el tab recibido; si no existe, seleccionamos 'home'
          const tabToSelect = tab || 'home';
          this.tabs?.select(tabToSelect);
        } catch (e) {
          console.warn('No se pudo seleccionar el tab:', e);
          this.tabs?.select('home');
        }
      }, 50);
    });
  }
}
