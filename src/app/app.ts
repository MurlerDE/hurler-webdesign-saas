import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {provideIcons} from "@ng-icons/core";
import {cssMenu} from "@ng-icons/css.gg"

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  viewProviders: [provideIcons({cssMenu})]
})
export class App {
  protected readonly title = signal('hurler-webdesign-saas');
}
