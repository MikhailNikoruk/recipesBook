import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cookingTime',
})
export class CookingTimePipe implements PipeTransform {
  transform(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} мин`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} ч`;
    }

    return `${hours} ч ${remainingMinutes} мин`;
  }
}
