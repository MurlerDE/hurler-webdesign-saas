import { Component } from '@angular/core';

interface Features {
  id: number,
  claim: string,
  description: string,
  icon?: string,
  iconDescription?: string
}

@Component({
  selector: 'app-features-section',
  imports: [],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss',
})
export class FeaturesSectionComponent {
  featuresList: Features[] = [
    {
      id: 1,
      claim: "Code statt Baukasten",
      description: "Handgefertigte Performance, die Google und Ihre Nutzer lieben werden."
    },
    {
      id: 2,
      claim: "Sicher per Design",
      description: "Maximale Rechtskonformität durch eRecht24 und hauseigene Server-Infrastruktur."
    },
    {
      id: 3,
      claim: "Heimat für Ihre Daten",
      description: "Hosting und Services strikt nach europäischem Datenschutzstandard."
    },
    {
      id: 4,
      claim: "Alles im Blick",
      description: "Ein Portal für alles: Kommunikation, Verwaltung und Erfolgskontrolle"
    },
  ]
}
