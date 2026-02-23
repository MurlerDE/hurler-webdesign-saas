import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('@features/landing/').then(m => m.LandingpageComponent)
    }
];
