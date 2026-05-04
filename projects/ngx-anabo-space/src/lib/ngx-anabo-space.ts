import { Component, Input } from '@angular/core';
import { SpaceParticlesComponent } from './theme/space-particles/space-particles.component';
import { SpaceColor, SpaceTheme } from './model/space-particles.model';





@Component({
  standalone: true, 
  selector: 'ngx-anabo-space',
  imports: [SpaceParticlesComponent],
  template: `
  <app-space-particles [centerText]="centerText" [color]="color" [speed]="speed" [particleCount]="particleCount" [particaleType]="particaleType" [theme]="theme" [height]="height" [width]="width"></app-space-particles>
  `,
  styles: ``,
})
export class NgxAnaboSpace {
  @Input() particleCount: number = 150;
  @Input() particaleType: string = "star";
  @Input() speed: number = 4;
  @Input() theme: SpaceTheme = 'all';
  @Input() color: SpaceColor = 'classic'; 
  @Input() height: number = 650;
  @Input() width: number = 1235;
  @Input() centerText: string = "";
}
