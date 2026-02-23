import { Component, OnInit, inject } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { HeroComponent } from '../components/hero/hero.component';
import { FeaturesSectionComponent } from '../components/features-section/features-section.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SeoService } from '@core/services/seo.service';

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
export class LandingpageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateMetadata({
      title: 'Performante Webseiten & Webdesign für KMU',
      description: 'Spezialist für performante Webseiten ohne CMS für KMU. Wir bieten maßgeschneidertes Webdesign für eine schnelle und sichere Online-Präsenz.',
      socialsDescription: 'Webseiten ohne CMS für KMU – der Performance-Vorteil für Ihr Unternehmen.',
      type: 'website'
    });
  }
}
