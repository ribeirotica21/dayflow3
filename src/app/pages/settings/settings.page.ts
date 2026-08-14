import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonToggle, IonButton,
  IonIcon, IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, moonOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonToggle, IonButton,
    IonIcon, IonList
  ]
})
export class SettingsPage implements OnInit {
  darkMode: boolean = false;

  constructor(private storage: Storage) {
    addIcons({ trashOutline, moonOutline });
  }

  async ngOnInit() {
    await this.storage.create();
    const saved = await this.storage.get('darkMode');
    this.darkMode = saved || false;
    this.applyTheme();
  }

  async toggleDarkMode() {
    await this.storage.set('darkMode', this.darkMode);
    this.applyTheme();
  }

  applyTheme() {
    document.body.classList.toggle('dark', this.darkMode);
  }

  async clearAllData() {
    const confirmed = confirm('This will delete all your tasks and habits. Are you sure?');
    if (confirmed) {
      await this.storage.remove('tasks');
      await this.storage.remove('habits');
      alert('All data cleared. Restart the app to see the change.');
    }
  }
}