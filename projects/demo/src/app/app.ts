import { Component, signal } from '@angular/core';
import { NgxAnaboSpace } from 'ngx-anabo-space'; // ← package name

@Component({
  selector: 'app-root',
  imports: [NgxAnaboSpace],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demo');
}
