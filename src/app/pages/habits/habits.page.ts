import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonIcon,
  IonList, IonLabel, IonBadge, IonItemSliding,
  IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline, flameOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { HabitService, Habit } from '../../services/habit';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonIcon,
    IonList, IonLabel, IonBadge, IonItemSliding,
    IonItemOptions, IonItemOption
  ]
})
export class HabitsPage implements OnInit {
  habits: Habit[] = [];
  newHabitTitle: string = '';

  constructor(private habitService: HabitService) {
    addIcons({ addOutline, trashOutline, flameOutline, checkmarkCircleOutline });
  }

  async ngOnInit() {
    await this.loadHabits();
  }

  async loadHabits() {
    this.habits = await this.habitService.getHabits();
  }

  async addHabit() {
    if (this.newHabitTitle.trim().length === 0) {
      return;
    }
    await this.habitService.addHabit(this.newHabitTitle);
    this.newHabitTitle = '';
    await this.loadHabits();
  }

  async completeToday(id: string) {
    await this.habitService.completeToday(id);
    await this.loadHabits();
  }

  async deleteHabit(id: string) {
    await this.habitService.deleteHabit(id);
    await this.loadHabits();
  }
}