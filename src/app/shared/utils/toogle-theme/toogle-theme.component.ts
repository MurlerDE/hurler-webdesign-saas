import { Component, inject } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { cssMoon, cssSun } from '@ng-icons/css.gg';

@Component({
  selector: 'app-toogle-theme',
  imports: [NgIcon],
  templateUrl: './toogle-theme.component.html',
  styleUrl: './toogle-theme.component.scss',
  viewProviders: [provideIcons({cssMoon, cssSun})]  
})
export class ToogleThemeComponent {
  themeService = inject(ThemeService);
  toggleTheme() {
    const current = this.themeService.theme();
    const next = current === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(next);
  }
}
