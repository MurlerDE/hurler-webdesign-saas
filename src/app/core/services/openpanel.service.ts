import { Injectable } from '@angular/core';
import { OpenPanel } from '@openpanel/web';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() {
    OpenPanel.init({
      clientId: 'DEINE_CLIENT_ID', // Aus dem OpenPanel Dashboard
      trackScreenViews: true,      // Automatisches Tracking von Routenwechseln
      trackOutgoingLinks: true,
      url: 'https://api.deine-coolify-domain.de' // WICHTIG: Deine eigene API URL!
    });
  }

  // Methode für benutzerdefinierte Events (das "Brett")
  trackEvent(name: string, properties?: object) {
    openpanel.track(name, properties);
  }

  // Für deinen Kunden-Login: User identifizieren
  identifyUser(userId: string, traits?: object) {
    openpanel.identify(userId, traits);
  }
}
