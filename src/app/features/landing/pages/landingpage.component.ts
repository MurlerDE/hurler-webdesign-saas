import { Component, OnInit, inject } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { HeroComponent } from '../components/hero/hero.component';
import { FeaturesSectionComponent } from '../components/features-section/features-section.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-landingpage',
  imports: [
    NavigationComponent,
    HeroComponent,
    FeaturesSectionComponent,
    ProjectsComponent,
    FooterComponent,
],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateMetadata({
      title: 'Schnelle Webseiten für Handwerk & Vereine',
      description: 'Spezialist für schnelle Webseiten ohne WordPress für Handwerk & Vereine. Wir bieten maßgeschneidertes Webdesign für eine schnelle und sichere Online-Präsenz.',
      socialsDescription: 'Webdesign ohne WordPress | Hurler Webdesign – Nördlingen',
      type: 'website'
    });
  }
}
