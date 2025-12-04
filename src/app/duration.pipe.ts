import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(durationInSeconds: number): any {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${minutes}:${formattedSeconds}`;
  }
}
