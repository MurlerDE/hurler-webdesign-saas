import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { NavigationService } from '@core/services/navigation.service';
import {NavigationItem, isAnchor, isRoute} from '@core/models/navigation.model';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterLink, NgIcon],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent {
  protected readonly navigationService = inject(NavigationService);
  items = input<NavigationItem[]>([]);

  protected readonly isAnchor = isAnchor;
  protected readonly isRoute = isRoute;

  onAnchorClick(event: Event, item: NavigationItem): void {
    event.preventDefault();
    this.navigationService.navigate(item); 
  }
}