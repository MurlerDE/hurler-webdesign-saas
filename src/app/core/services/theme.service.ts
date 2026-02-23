// core/services/theme.service.ts
import { Injectable, signal, effect, computed, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    // Privater Signal-State
    private readonly _theme = signal<Theme>('system');
    
    // Öffentlicher Readonly-Signal
    readonly theme = this._theme.asReadonly();
    
    // Abgeleiteter Wert: Tatsächlich aktives Theme (aufgelöst)
    readonly effectiveTheme = computed(() => {
        const current = this._theme();
        if (current !== 'system') return current;
        
        if (isPlatformBrowser(this.platformId)) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' 
                : 'light';
        }
        return 'light';
    });

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        // Effekt: Reagiert auf Änderungen (nur im Browser)
        effect(() => {
            if (isPlatformBrowser(this.platformId)) {
                const theme = this.effectiveTheme();
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', this._theme());
            }
        });
        
        // Initialisierung
        this.initializeTheme();
    }

    setTheme(theme: Theme): void {
        this._theme.set(theme);
    }

    private initializeTheme(): void {
        if (isPlatformBrowser(this.platformId)) {
            const saved = localStorage.getItem('theme') as Theme | null;
            if (saved) {
                this._theme.set(saved);
            }
        }
    }
}