import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';

export interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  isDay: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  async getCurrentCoordinates(): Promise<{ lat: number; lon: number }> {
    const position = await Geolocation.getCurrentPosition();
    return {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
  }

  getWeather(lat: number, lon: number): Observable<any> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    return this.http.get(url);
  }

  getWeatherDescription(code: number): string {
    if (code === 0) return 'Clear sky';
    if (code <= 3) return 'Partly cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 67) return 'Rainy';
    if (code <= 77) return 'Snowy';
    if (code <= 82) return 'Rain showers';
    if (code <= 99) return 'Thunderstorm';
    return 'Unknown';
  }

  isOutdoorFriendly(code: number): boolean {
    return code <= 3;
  }
}