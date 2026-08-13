import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { listOutline, flameOutline, partlySunnyOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterOutlet]
})
export class TabsPage {
  constructor() {
    addIcons({ listOutline, flameOutline, partlySunnyOutline, settingsOutline });
  }
}