import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storage: Storage | null = null;
  private readonly TASKS_KEY = 'tasks';

  constructor(private storageService: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  async getTasks(): Promise<Task[]> {
    if (!this.storage) {
      await this.init();
    }
    const tasks = await this.storage?.get(this.TASKS_KEY);
    return tasks || [];
  }

  async addTask(title: string): Promise<void> {
    const tasks = await this.getTasks();
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false
    };
    tasks.push(newTask);
    await this.storage?.set(this.TASKS_KEY, tasks);
  }

  async toggleTask(id: string): Promise<void> {
    const tasks = await this.getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      await this.storage?.set(this.TASKS_KEY, tasks);
    }
  }

  async deleteTask(id: string): Promise<void> {
    const tasks = await this.getTasks();
    const filtered = tasks.filter(t => t.id !== id);
    await this.storage?.set(this.TASKS_KEY, filtered);
  }
}