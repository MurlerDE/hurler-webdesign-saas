import { Component } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { HeroComponent } from '../components/hero/hero.component';
import { FeaturesSectionComponent } from '../components/features-section/features-section.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-landingpage',
  imports: [
    NavigationComponent,
    HeroComponent,
    FeaturesSectionComponent,
    FooterComponent
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent {

}
