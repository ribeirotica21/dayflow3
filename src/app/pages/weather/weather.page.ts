import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonSpinner, IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, refreshOutline } from 'ionicons/icons';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonSpinner, IonCard,
    IonCardContent
  ]
})
export class WeatherPage {
  loading: boolean = false;
  errorMessage: string = '';
  temperature: number | null = null;
  description: string = '';
  outdoorFriendly: boolean = false;

  constructor(private weatherService: WeatherService) {
    addIcons({ locationOutline, refreshOutline });
  }

  async fetchWeather() {
    this.loading = true;
    this.errorMessage = '';

    try {
      const coords = await this.weatherService.getCurrentCoordinates();

      this.weatherService.getWeather(coords.lat, coords.lon).subscribe({
        next: (data) => {
          this.temperature = data.current_weather.temperature;
          const code = data.current_weather.weathercode;
          this.description = this.weatherService.getWeatherDescription(code);
          this.outdoorFriendly = this.weatherService.isOutdoorFriendly(code);
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Could not fetch weather data. Please try again.';
          this.loading = false;
        }
      });
    } catch (err) {
      this.errorMessage = 'Could not get your location. Please allow location access.';
      this.loading = false;
    }
  }
}