import { Injectable } from '@angular/core';

export interface UmamiEventData {
  [key: string]: string | number | boolean;
}

// Typdefinition für das globale umami-Objekt
declare global {
  interface Window {
    umami?: {
      track: (eventName?: string, data?: UmamiEventData) => void;
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class UmamiService {
  private get isAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.umami !== 'undefined';
  }

  /**
   * Trackt einen Pageview manuell – nötig bei SPAs wie Angular,
   * da kein echter Seitenaufruf stattfindet.
   */
  trackPageview(): void {
    if (!this.isAvailable) return;
    window.umami!.track();
  }

  /**
   * Trackt ein benutzerdefiniertes Event.
   * @param eventName  Name des Events, z.B. 'button-click'
   * @param data       Optionale Zusatzdaten, z.B. { label: 'Hero CTA' }
   */
  trackEvent(eventName: string, data?: UmamiEventData): void {
    if (!this.isAvailable) return;
    window.umami!.track(eventName, data);
  }
}