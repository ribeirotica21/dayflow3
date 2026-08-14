import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonIcon,
  IonList, IonLabel, IonCheckbox, IonItemSliding,
  IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline, checkboxOutline } from 'ionicons/icons';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-today',
  templateUrl: './today.page.html',
  styleUrls: ['./today.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonIcon,
    IonList, IonLabel, IonCheckbox, IonItemSliding,
    IonItemOptions, IonItemOption
  ]
})
export class TodayPage implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {
    addIcons({ addOutline, trashOutline, checkboxOutline });
  }

  async ngOnInit() {
    await this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await this.taskService.getTasks();
  }

  async addTask() {
    if (this.newTaskTitle.trim().length === 0) {
      return;
    }
    await this.taskService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
    await this.loadTasks();
  }

  async toggleTask(id: string) {
    await this.taskService.toggleTask(id);
    await this.loadTasks();
  }

  async deleteTask(id: string) {
    await this.taskService.deleteTask(id);
    await this.loadTasks();
  }
}