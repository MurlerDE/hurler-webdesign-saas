import { Component } from '@angular/core';

interface Project {
  id: number,
  image: string,
  company: string,
  shortDescription: string,
  features: string[]
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      company: "Backerei Müller",
      image: "/images/bakery.jpg",
      shortDescription: "Landingpage mit wechselnden Angeboten",
      features: ["SEO", "Angebote", "Dark/Light"],
    },
    {
      id: 2,
      company: "Backerei Müller",
      image: "/images/bakery.jpg",
      shortDescription: "Landingpage mit wechselnden Angeboten",
      features: ["SEO", "Angebote", "Dark/Light"],
    },
    {
      id: 3,
      company: "Backerei Müller",
      image: "/images/bakery.jpg",
      shortDescription: "Landingpage mit wechselnden Angeboten",
      features: ["SEO", "Angebote", "Dark/Light"],
    }
  ]
}
