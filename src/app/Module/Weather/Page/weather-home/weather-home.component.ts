import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../Service/weather.service';
import { IWeather } from 'src/app/Model/Interfaces/IWeather';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent implements OnInit,OnDestroy {
[x: string]: any;

  cityinitial = "Japon";
  private readonly destroy$ = new Subject<void>();
  Weather!: IWeather;
  constructor(private WeatherService: WeatherService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
   //this.getWeather(this.cityinitial);
  }


  OnSubmit(): void {
    this.getWeather(this.cityinitial);
  }



  getWeather(city: string): void {
    this.WeatherService.getWeather(city)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: any) => {
        response && (this.Weather = response);
        console.log(this.Weather);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

