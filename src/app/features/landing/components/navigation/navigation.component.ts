import { Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ToogleThemeComponent } from '@shared/utils/toogle-theme/toogle-theme.component';
import { NavMenuComponent } from '@shared/ui/nav-menu/nav-menu.component';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-navigation',
  imports: [NgIcon, ToogleThemeComponent, NavMenuComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  protected readonly navigationService = inject(NavigationService);
}
