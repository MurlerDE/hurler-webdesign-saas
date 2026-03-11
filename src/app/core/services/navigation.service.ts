// core/services/navigation.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem, isAnchor, isRoute } from '../models/navigation.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
    private readonly router = inject(Router);
    
    // === STATE ===
    private readonly _navigationItems = signal<NavigationItem[]>([
        // Anchor-Links (Landingpage intern)
        { label: 'Home', type: 'anchor', target: 'hero' },
        { label: 'Features', type: 'anchor', target: 'features-section'},
        { label: 'Projekte', type: 'anchor', target: 'projects' },
        { label: 'Pricing', type: 'anchor', target: 'pricing' },
        
        // Route-Links ( andere Pages)
        { label: 'Login', type: 'route', target: '/login' },
        { 
            label: 'Dashboard', 
            type: 'route', 
            target: '/dashboard', 
            icon: 'layout',
            // Geschützte Route - wird später gefiltert
        }
    ]);

    // === PUBLIC SIGNALS ===
    readonly navigationItems = this._navigationItems.asReadonly();

    // Gefiltert nach Kontext (Landingpage vs. App)
    readonly landingNavigation = computed(() => 
        this._navigationItems().filter(item => 
            isAnchor(item) || item.target === '/login'
        )
    );

    readonly appNavigation = computed(() => 
        this._navigationItems().filter(item => isRoute(item))
    );

    // === METHODS ===
    navigate(item: NavigationItem): void {
        switch (item.type) {
            case 'anchor':
                this.scrollToAnchor(item.target);
                break;
            case 'route':
                this.router.navigate([item.target]);
                break;
            case 'external':
                window.open(item.target, '_blank');
                break;
        }
    }

    private scrollToAnchor(anchorId: string): void {
        const element = document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Dynamische Updates (z.B. nach Login)
    addItem(item: NavigationItem): void {
        this._navigationItems.update(items => [...items, item]);
    }

    removeItem(target: string): void {
        this._navigationItems.update(items => 
            items.filter(i => i.target !== target)
        );
    }
}