import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import {provideIcons} from "@ng-icons/core";
import { filter } from 'rxjs/operators';
import {cssMenu} from "@ng-icons/css.gg";
import { UmamiService } from '@core/services/umami.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  viewProviders: [provideIcons({cssMenu})]
})
export class App implements OnInit {
  protected readonly title = signal('hurler-webdesign-saas');

  constructor(
    private router: Router,
    private umami: UmamiService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.umami.trackPageview();
    });
  }
}
