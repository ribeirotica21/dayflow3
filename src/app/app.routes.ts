import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/today',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'today',
        loadComponent: () => import('./pages/today/today.page').then(m => m.TodayPage)
      },
      {
        path: 'habits',
        loadComponent: () => import('./pages/habits/habits.page').then(m => m.HabitsPage)
      },
      {
        path: 'weather',
        loadComponent: () => import('./pages/weather/weather.page').then(m => m.WeatherPage)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
      },
      {
        path: '',
        redirectTo: 'today',
        pathMatch: 'full'
      }
    ]
  }
];