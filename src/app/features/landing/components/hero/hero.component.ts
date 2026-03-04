import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/ui/button/button.component';
import { UmamiService } from '@core/services/umami.service';

@Component({
  selector: 'app-hero',
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  constructor(private umami: UmamiService) {}

  onFeaturesClick(): void {
    this.umami.trackEvent('features-anchor-click')
  }
}
