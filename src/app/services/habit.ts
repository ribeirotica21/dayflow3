import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Habit {
  id: string;
  title: string;
  streak: number;
  lastCompletedDate: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private storage: Storage | null = null;
  private readonly HABITS_KEY = 'habits';

  constructor(private storageService: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storageService.create();
    this.storage = storage;
  }

  async getHabits(): Promise<Habit[]> {
    if (!this.storage) {
      await this.init();
    }
    const habits = await this.storage?.get(this.HABITS_KEY);
    return habits || [];
  }

  async addHabit(title: string): Promise<void> {
    const habits = await this.getHabits();
    const newHabit: Habit = {
      id: Date.now().toString(),
      title,
      streak: 0,
      lastCompletedDate: null
    };
    habits.push(newHabit);
    await this.storage?.set(this.HABITS_KEY, habits);
  }

  async completeToday(id: string): Promise<void> {
    const habits = await this.getHabits();
    const habit = habits.find(h => h.id === id);
    if (habit) {
      const today = new Date().toDateString();
      if (habit.lastCompletedDate !== today) {
        habit.streak += 1;
        habit.lastCompletedDate = today;
        await this.storage?.set(this.HABITS_KEY, habits);
      }
    }
  }

  async deleteHabit(id: string): Promise<void> {
    const habits = await this.getHabits();
    const filtered = habits.filter(h => h.id !== id);
    await this.storage?.set(this.HABITS_KEY, filtered);
  }
}